const express = require("express");
const mongoose = require("mongoose");
const Employees = require("../models/employeeModel");
const ProjectExpenseClaims = require("../models/projectExpenseClaimModel");
const Auth = require("../auth/auth");

const getAllClaims = async (req, res) => {
    try {
        const {employeeId} = req.params;
        accessToken = req.body.accessToken
        if(!Auth.verify_credentials(accessToken, employeeId)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const employees = await Employees.find({
            employeeId
        });
        if (!employees) {
            return res
            .status(404)
            .json({ message:`Employee ${employeeId} does not exist` });
        }
        const projectExpenseClaims = await ProjectExpenseClaims.find({
            employeeId
        });
        if (!projectExpenseClaims) {
            res.status(200).json({
                message: `Employee ${employeeId} has no claims`,
                projectExpenseClaims: projectExpenseClaims,
            });
        } else {
            res.status(200).json({
                message: `Employee ${employeeId}'s claims returned`,
                projectExpenseClaims: projectExpenseClaims,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
  
module.exports = {
    getAllClaims,
};
