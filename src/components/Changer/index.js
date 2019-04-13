import React, { Component } from "react";
import Modal from "react-modal";
import "./style.sass";
import { BaseCurrencyInput } from "./BaseCurrencyInput";
import { Rates } from "./Rates";
import { QuotedCurrencyInput } from "./QuotedCurrencyInput";

class Changer extends Component {
  state = {
    loading: true,
    modalIsOpen: false,
    currencies: {},
    baseCurrency: "RUB", // by default 'У меня есть'
    quoteCurrency: "EUR", // by default 'Хочу приобрести'
    baseCurrencyValue: "",
    quoteCurrencyValue: "",
    intervalID: ""
  };

  openModal = () => {
    this.loadData();
    const intervalID = setInterval(this.loadData.bind(this), 15000); // загрузка каждые 15 секунд
    this.setState({ modalIsOpen: true, intervalID });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    clearInterval(this.state.intervalID);
  };

  loadData = async () => {
    const fetchUSD = await fetch(
      "https://api.exchangeratesapi.io/latest?base=USD&symbols=RUB,EUR"
    );
    const fetchEUR = await fetch(
      "https://api.exchangeratesapi.io/latest?base=EUR&symbols=RUB,USD"
    );
    const fetchRUB = await fetch(
      "https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR"
    );
    const USD = await fetchUSD.json();
    const EUR = await fetchEUR.json();
    const RUB = await fetchRUB.json();

    this.setState({
      currencies: { USD: USD.rates, EUR: EUR.rates, RUB: RUB.rates },
      loading: false
    });
  };

  handlebaseCurrency = e => {
    const { id } = e.target;
    if (id === this.state.quoteCurrency) {
      this.reverseCurrencies();
    }
    this.setState({
      baseCurrency: id,
      baseCurrencyValue: "",
      quoteCurrencyValue: ""
    });
  };

  handlequoteCurrency = e => {
    const { id } = e.target;
    if (id === this.state.baseCurrency) {
      this.reverseCurrencies();
    }
    this.setState({
      quoteCurrency: id,
      baseCurrencyValue: "",
      quoteCurrencyValue: ""
    });
  };

  handleInputbaseCurrency = e => {
    const { baseCurrency, quoteCurrency, currencies } = this.state;
    const { value } = e.target;
    const rate = currencies[baseCurrency][quoteCurrency];
    const result = (value * rate).toFixed(2);
    this.setState({ baseCurrencyValue: value, quoteCurrencyValue: result });
  };

  handleInputquoteCurrency = e => {
    const { baseCurrency, quoteCurrency, currencies } = this.state;
    const { value } = e.target;
    const rate = currencies[quoteCurrency][baseCurrency];
    const result = (value * rate).toFixed(2);
    this.setState({
      quoteCurrencyValue: value,
      baseCurrencyValue: result
    });
  };

  reverseCurrencies = () => {
    const { baseCurrency, quoteCurrency } = this.state;
    const a = quoteCurrency;
    const b = baseCurrency;
    this.setState({
      baseCurrency: a,
      quoteCurrency: b,
      baseCurrencyValue: "",
      quoteCurrencyValue: ""
    });
  };

  render() {
    const {
      baseCurrencyValue,
      quoteCurrencyValue,
      baseCurrency,
      quoteCurrency,
      currencies,
      loading
    } = this.state;

    return (
      <>
        <button onClick={this.openModal}>Открыть обменник</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          className="Modal"
          ariaHideApp={false}
          overlayClassName="Overlay"
        >
          <button className="Modal__close-btn" onClick={this.closeModal}>
            X
          </button>
          {!loading && (
            <>
              <BaseCurrencyInput
                choosedCurrency={baseCurrency}
                value={baseCurrencyValue}
                handlebaseCurrency={this.handlebaseCurrency}
                handleInputbaseCurrency={this.handleInputbaseCurrency}
              />

              <span
                onClick={this.reverseCurrencies}
                className="Modal__reverse-btn"
              >
                &#8644;
              </span>
              <QuotedCurrencyInput
                value={quoteCurrencyValue}
                choosedCurrency={quoteCurrency}
                handlequoteCurrency={this.handlequoteCurrency}
                handleInputquoteCurrency={this.handleInputquoteCurrency}
              />
              <Rates
                baseCurrency={baseCurrency}
                quoteCurrency={quoteCurrency}
                currencies={currencies}
              />
            </>
          )}
        </Modal>
      </>
    );
  }
}

export default Changer;
