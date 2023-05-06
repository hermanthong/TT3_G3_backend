const mongoose = require("mongoose");

const currencySchema = mongoose.Schema(
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

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
