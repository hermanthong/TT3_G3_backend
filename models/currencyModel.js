const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    currencyId: {
      type: String,
      required: [true],
    },
    exchangeRate: {
      type: Number,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
