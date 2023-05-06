const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    departmentCode: {
      type: String,
      required: [true],
    },
    departmentName: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
