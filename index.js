const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://weihongyeo:admin11@cluster0.s48hozq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

const claimRouter = require("./routes/claimRoutes");
const employeeRouter = require("./routes/employeeRoutes")
const authRouter = require("./routes/authRoute");

app.use("/", claimRouter);
app.use("/", employeeRouter);
app.use("/auth", authRouter);

// module.exports = app;
