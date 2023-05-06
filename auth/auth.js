const Employees = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { emp_id, password } = req.body;

  // check if required fields are present
  if (!emp_id) {
    return res.status(400).json({ message: 'Request body is missing the "emp_id" field.' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Request body is missing the "password" field.'});
  }

  // query mongodb
  const employee = await Employees.findOne({ employeeId: emp_id });
  if (employee == null) {
    return res.status(401).json({ message: `No employee with id ${emp_id}.` });
  }

  // check if emp_id + password combination is valid
  const match = password === employee.password;
  if (!match) return res.status(401).json({ message: 'Password is incorrect.' });

  // all checks ok; sign a jwt access token and return
  const accessToken = jwt.sign(
    {
      employeeId: employee.employeeId,
      supervisorId: employee.supervisorId,
      departmentCode: employee.departmentCode,
      password: employee.password,
      firstName: employee.firstName,
      lastName: employee.lastName,
      bankAccountNumber: employee.bankAccountNumber,
    },
    "super_secret_access_key",
    { expiresIn: "15m" }
  );

  // Send accessToken containing username and information
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await Users.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser.userId,
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
            address: foundUser.address,
            optIntoPhyStatements: foundUser.optIntoPhyStatements,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(200).json({ Message: "No cookies found" });
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
