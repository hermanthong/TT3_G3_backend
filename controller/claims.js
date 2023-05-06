const express = require("express");
const mongoose = require("mongoose");
const ProjectExpenseClaims = require("../models/projectExpenseClaimModel");
const { access } = require("fs");
const auth = require("../auth/auth");

// Delete project expense claims

const deleteProjectExpenseClaims = async (req, res) => {
  try {
    const filter = req.query.claimId;
    const appears = await ProjectExpenseClaims.findOne({ claimId: filter });
    const accessToken = req.body.accessToken;
    if (!appears) {
      return res.status(404).json({ message: "There is no such claim Id." });
    }
    if (!auth.verify_credentials(accessToken, appears.employeeId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const projectExpenseClaims = await ProjectExpenseClaims.findOneAndDelete({
      claimId: filter,
    });
    if (!projectExpenseClaims) {
      return res
        .status(404)
        .json({ message: "cannot find Expense Claim with ID ${claimId}" });
    }
    res.status(200).json({
      message: "Expense Claim deleted successfully",
      projectExpenseClaims: projectExpenseClaims,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update project expense claims

const updateProjectExpenseClaims = async (req, res) => {
  try {
    const filter = req.body.claimId;
    const employeeId = req.body.employeeId;
    const accessToken = req.body.accessToken;
    if (!auth.verify_credentials(accessToken, employeeId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const expense = await ProjectExpenseClaims.findOneAndUpdate(
      { claimId: filter },
      req.body,
      {
        returnDocument: "after",
      }
    );
    // we cannot find user in db
    if (!expense) {
      return res
        .status(404)
        .json({ message: `cannot find expense with ID ${claimId}` });
    }
    res.status(200).json({
      message: "Project Expense Claims successfully updated!",
      expense: expense,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateProjectExpenseClaims,
  deleteProjectExpenseClaims,
};
