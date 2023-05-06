const express = require("express");
const mongoose = require("mongoose");
const Employees = require("../models/employeeModel");
const ProjectExpenseClaims = require("../models/projectExpenseClaimModel");

const getAllClaims = async (req, res) => {
    try {
        const {employeeId} = req.params;
        const employees = await Employees.find({
            employeeId
        });
        if (!employees) {
            return res
            .status(404)
            .json({ message: employeeId+" does not exist" });
        }
        const projectExpenseClaims = await ProjectExpenseClaims.find({
            employeeId
        });
        if (!projectExpenseClaims) {
            return res
            .status(404)
            .json({ message: employeeId+" has no claims" });
        }
        res.status(200).json({
            message: employeeId+"'s claims returned",
            projectExpenseClaims: projectExpenseClaims,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
  
module.exports = {
    getAllClaims,
};
