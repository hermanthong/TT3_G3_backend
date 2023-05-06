const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true],
    },
    supervisorId: {
      type: String,
      required: [true],
    },
    departmentCode: {
      type: String,
      required: [true],
    },
    password: {
      type: String,
      required: [true],
    },
    firstName: {
      type: String,
      required: [true],
    },
    lastName: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Employees = mongoose.model("Employees", employeeSchema);

module.exports = Employees;
