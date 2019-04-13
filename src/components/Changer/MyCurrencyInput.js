import React from "react";

export const MyCurrencyInput = ({
  handleMyCurrency,
  handleInputMyCurrency,
  choosedCurrency,
  value
}) => (
  <div className="currency-input">
    <div>У меня есть</div>
    <div className="currency-input__buttons-group">
      <button
        onClick={handleMyCurrency}
        id="RUB"
        className={choosedCurrency === "RUB" ? "active" : ""}
      >
        RUB
      </button>
      <button
        onClick={handleMyCurrency}
        id="USD"
        className={choosedCurrency === "USD" ? "active" : ""}
      >
        USD
      </button>
      <button
        onClick={handleMyCurrency}
        id="EUR"
        className={choosedCurrency === "EUR" ? "active" : ""}
      >
        EUR
      </button>
    </div>
    <input onChange={handleInputMyCurrency} value={value} type="number" />
  </div>
);
