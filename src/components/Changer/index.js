import React, { Component } from "react";
import Modal from "react-modal";
import "./style.sass";
import { MyCurrencyInput } from "./MyCurrencyInput";
import { DesiredCurrencyInput } from "./DesiredCurrencyInput";

class Changer extends Component {
  state = {
    loading: true,
    modalIsOpen: false,
    currencies: {},
    myCurrency: "RUB", // by default 'У меня есть'
    desiredCurrency: "EUR", // by default 'Хочу приобрести'
    myCurrencyValue: "",
    desiredCurrencyValue: "",
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

  handleMyCurrency = e => {
    const { id } = e.target;
    if (id === this.state.desiredCurrency) {
      this.reverseCurrencies();
    }
    this.setState({
      myCurrency: id,
      myCurrencyValue: "",
      desiredCurrencyValue: ""
    });
  };

  handleDesiredCurrency = e => {
    const { id } = e.target;
    if (id === this.state.myCurrency) {
      this.reverseCurrencies();
    }
    this.setState({
      desiredCurrency: id,
      myCurrencyValue: "",
      desiredCurrencyValue: ""
    });
  };

  handleInputMyCurrency = e => {
    const { myCurrency, desiredCurrency, currencies } = this.state;
    const { value } = e.target;
    const rate = currencies[myCurrency][desiredCurrency];
    const result = (value * rate).toFixed(2);
    this.setState({ myCurrencyValue: value, desiredCurrencyValue: result });
  };

  handleInputDesiredCurrency = e => {
    const { myCurrency, desiredCurrency, currencies } = this.state;
    const { value } = e.target;
    const rate = currencies[desiredCurrency][myCurrency];
    const result = (value * rate).toFixed(2);
    this.setState({
      desiredCurrencyValue: value,
      myCurrencyValue: result
    });
  };

  reverseCurrencies = () => {
    const { myCurrency, desiredCurrency } = this.state;
    const a = desiredCurrency;
    const b = myCurrency;
    this.setState({
      myCurrency: a,
      desiredCurrency: b,
      myCurrencyValue: "",
      desiredCurrencyValue: ""
    });
  };

  render() {
    const {
      myCurrencyValue,
      desiredCurrencyValue,
      myCurrency,
      desiredCurrency,
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
              <MyCurrencyInput
                choosedCurrency={myCurrency}
                value={myCurrencyValue}
                handleMyCurrency={this.handleMyCurrency}
                handleInputMyCurrency={this.handleInputMyCurrency}
              />

              <span
                onClick={this.reverseCurrencies}
                className="Modal__reverse-btn"
              >
                &#8644;
              </span>
              <DesiredCurrencyInput
                value={desiredCurrencyValue}
                choosedCurrency={desiredCurrency}
                handleDesiredCurrency={this.handleDesiredCurrency}
                handleInputDesiredCurrency={this.handleInputDesiredCurrency}
              />
              <div>
                Курсы обмена:
                <p>
                  {`1 ${myCurrency} = ${currencies[myCurrency][
                    desiredCurrency
                  ].toFixed(2)} ${desiredCurrency}`}
                </p>
                <p>
                  {`1 ${desiredCurrency} = ${currencies[desiredCurrency][
                    myCurrency
                  ].toFixed(2)} ${myCurrency}`}
                </p>
              </div>
            </>
          )}
        </Modal>
      </>
    );
  }
}

export default Changer;
