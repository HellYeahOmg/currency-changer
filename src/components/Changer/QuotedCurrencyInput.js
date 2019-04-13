import React from "react";

export const QuotedCurrencyInput = ({
  handlequoteCurrency,
  choosedCurrency,
  handleInputquoteCurrency,
  value
}) => (
  <div className="currency-input">
    <div>Хочу приобрести</div>
    <div className="currency-input__buttons-group">
      <button
        onClick={handlequoteCurrency}
        id="RUB"
        className={choosedCurrency === "RUB" ? "active" : ""}
      >
        RUB
      </button>
      <button
        onClick={handlequoteCurrency}
        id="USD"
        className={choosedCurrency === "USD" ? "active" : ""}
      >
        USD
      </button>
      <button
        onClick={handlequoteCurrency}
        id="EUR"
        className={choosedCurrency === "EUR" ? "active" : ""}
      >
        EUR
      </button>
    </div>
    <input onChange={handleInputquoteCurrency} value={value} type="number" />
  </div>
);
