const Currency = require("../models/currencyModel");

const getCurrencies = async (req, res) => {
    const currencies = await Currency.find();
    console.log(currencies);
    res.status(200).json({
        currencies: currencies.map(currency => {
          return {
            currencyId: currency.currencyId,
            exchangeRate: currency.exchangeRate
          }
        })
    });
};

module.exports = {
  getCurrencies,
};
