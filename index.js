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

const Currency = require("./models/currencyModel");

app.post("/post", async (req, res) => {
  try {
    const currency = await Currency.create(req.body);
    res.status(200).json({
      message: "Currency created successfully",
      currency: Currency,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const authRouter = require("./routes/authRoute");
// const Router = require("./routes/Route");
// const Router = require("./routes/Route");
// const Router = require("./routes/Route");
app.use("/auth", authRouter);
// app.use("/api", Router);
// app.use("/api", Router);
// app.use("/api", Router);

// module.exports = app;
