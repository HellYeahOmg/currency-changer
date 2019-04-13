import React from "react";

export const DesiredCurrencyInput = ({
  handleDesiredCurrency,
  choosedCurrency,
  handleInputDesiredCurrency,
  value
}) => (
  <div className="currency-input">
    <div>Хочу приобрести</div>
    <div className="currency-input__buttons-group">
      <button
        onClick={handleDesiredCurrency}
        id="RUB"
        className={choosedCurrency === "RUB" ? "active" : ""}
      >
        RUB
      </button>
      <button
        onClick={handleDesiredCurrency}
        id="USD"
        className={choosedCurrency === "USD" ? "active" : ""}
      >
        USD
      </button>
      <button
        onClick={handleDesiredCurrency}
        id="EUR"
        className={choosedCurrency === "EUR" ? "active" : ""}
      >
        EUR
      </button>
    </div>
    <input onChange={handleInputDesiredCurrency} value={value} type="number" />
  </div>
);
