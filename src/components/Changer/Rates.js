import React from "react";

export const Rates = ({ baseCurrency, quoteCurrency, currencies }) => (
  <div>
    Курсы обмена:
    <p>
      {`1 ${baseCurrency} = ${currencies[baseCurrency][quoteCurrency].toFixed(
        2
      )} ${quoteCurrency}`}
    </p>
    <p>
      {`1 ${quoteCurrency} = ${currencies[quoteCurrency][baseCurrency].toFixed(
        2
      )} ${baseCurrency}`}
    </p>
  </div>
);
