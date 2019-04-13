import React from "react";

export const BaseCurrencyInput = ({
  handlebaseCurrency,
  handleInputbaseCurrency,
  choosedCurrency,
  value
}) => (
  <div className="currency-input">
    <div>У меня есть</div>
    <div className="currency-input__buttons-group">
      <button
        onClick={handlebaseCurrency}
        id="RUB"
        className={choosedCurrency === "RUB" ? "active" : ""}
      >
        RUB
      </button>
      <button
        onClick={handlebaseCurrency}
        id="USD"
        className={choosedCurrency === "USD" ? "active" : ""}
      >
        USD
      </button>
      <button
        onClick={handlebaseCurrency}
        id="EUR"
        className={choosedCurrency === "EUR" ? "active" : ""}
      >
        EUR
      </button>
    </div>
    <input onChange={handleInputbaseCurrency} value={value} type="number" />
  </div>
);
