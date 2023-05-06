const mongoose = require("mongoose");

const employeeprojectSchema = mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true],
    },
    employeeId: {
      type: String,
      required: [true],
    },
    projectName: {
      type: String,
      required: [true],
    },
    projectStatus: {
      type: String,
      required: [true],
    },
    projectBudget: {
      type: Number,
      required: [true],
    },
    projectLeadId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeProjects = mongoose.model(
  "EmployeeProjects",
  employeeprojectSchema
);

module.exports = EmployeeProjects;
