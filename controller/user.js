const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
require("dotenv").config();

// List of users
const getUser = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(500).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add user to database with hashed password

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users = await Users.create({
      userId: req.body.userId,
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      email: req.body.email,
      optIntoPhyStatements: req.body.optIntoPhyStatements,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const username = req.body.username;
  const user = await Users.findOne({ username: username });
  if (user === null) {
    res.status(401).send("Invalid Credentials");
    return;
  }
  const payload = {
    userId: user.userId,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    optIntoPhyStatements: user.optIntoPhyStatements,
  };
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(payload, "process.env.ACCESS_TOKEN_SECRET");
      res.status(200).json({
        userId: user.userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        optIntoPhyStatements: user.optIntoPhyStatements,
        message: "Login successful",
        accessToken: accessToken,
      });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmailAndAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await Users.findOneAndUpdate({ userId: userId }, req.body, {
      returnDocument: "after",
    });
    // we cannot find user in db
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find user with ID ${userId}` });
    }
    res.status(200).json({
      message: "Email and address successfully updated!",
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const removeEmailAndAddress = async (req, res) => {
  try {
    const userId = req.body.userId;
    const email = req.body.email; // boolean
    const address = req.body.address; // boolean
    const removeField = {};
    if (email) {
      removeField["email"] = 1;
    }
    if (address) {
      removeField["address"] = 1;
    }
    console.log(removeField);
    const user = await Users.findOneAndUpdate(
      { userId: userId },
      { $unset: removeField },
      {
        returnDocument: "after",
      }
    );
    res.status(200).json({
      message: "email and address updated!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  createUser,
  updateEmailAndAddress,
  removeEmailAndAddress,
};
