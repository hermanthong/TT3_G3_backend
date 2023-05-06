const mongoose = require("mongoose");

const projectexpenseclaimsSchema = mongoose.Schema(
  {
    claimId: {
      type: String,
      required: [true],
    },
    projectId: {
      type: String,
      required: [true],
    },
    employeeId: {
      type: String,
      required: [true],
    },
    currencyId: {
      type: String,
      required: [true],
    },
    expenseDate: {
      type: String,
      required: [true],
    },
    amount: {
      type: Number,
      required: [true],
    },
    purpose: {
      type: String,
      required: [true],
    },
    chargeToDefaultDept: {
      type: Boolean,
      default: false,
    },
    alternativeDeptCode: {
      type: String,
    },
    status: {
      type: String,
      required: [true],
    },
    lastEditedClaimDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectExpenseClaims = mongoose.model(
  "ProjectExpenseClaims",
  projectexpenseclaimsSchema
);

module.exports = ProjectExpenseClaims;
