// configs
const db_url = 'mongodb+srv://weihongyeo:admin11@cluster0.s48hozq.mongodb.net/?retryWrites=true&w=majority'

// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
const auth = require('../auth/auth');

// main
connect_to_db().catch(err => console.log(err));
app.use(express.json());
app.use(cors(corsOptions));

// connect to mongodb
async function connect_to_db() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(db_url)
    .then(() => console.log("Connected to MongoDB"));
}

// test login
console.log('calling login()...');
const obj = auth.login({body: {emp_id: 10001, password: 'Singa@123'}});
