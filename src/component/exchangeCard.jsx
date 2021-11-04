import { useState, React, useEffect } from "react";
import "../styles/exchangeCard.css";
import { Button } from "react-bootstrap";

const CURRENCY_SYMBOLS = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};
const CURRENCIES = ["EUR", "USD", "GBP"];

const ExchangeCard = () => {
  const [state, setState] = useState({
    currencyFrom: "EUR",
    currencyTo: "USD",
  });
  const [input, setInput] = useState({
    currencyFrom: 0,
    currencyTo: 0,
  });
  const [balance, setBalance] = useState({
    EUR: 3,
    USD: 100,
    GBP: 100,
  });

  const [exchangeRate, setExchangeRate] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInput({
      currencyFrom: 0,
      currencyTo: 0,
    });
    fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=1abed3b7eb947d7509e3fa740dc7a42e&base=EUR`
    ).then((res) =>
      res.json().then((response) => {
        if (state.currencyFrom === "EUR") {
          setExchangeRate(response.rates[state.currencyTo]);
        } else if (state.currencyFrom === "USD") {
          if (state.currencyTo === "EUR") {
            setExchangeRate(1 / response.rates["USD"]);
          } else if (state.currencyTo === "GBP") {
            setExchangeRate(
              (1 / response.rates["USD"]) * response.rates["GBP"]
            );
          }
        } else if (state.currencyFrom === "GBP") {
          if (state.currencyTo === "EUR") {
            setExchangeRate(1 / response.rates["GBP"]);
          } else if (state.currencyTo === "USD") {
            setExchangeRate(
              (1 / response.rates["GBP"]) * response.rates["USD"]
            );
          }
        }
      })
    );
  }, [state]);

  const hasError = (value) => {
    if (value > balance[state.currencyFrom]) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setIsError(false);
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    hasError(
      event.target.name === "currencyFrom"
        ? event.target.value
        : input.currencyFrom
    );
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "currencyFrom") {
      setInput((input) => ({
        ...input,
        currencyTo: parseFloat(event.target.value * exchangeRate).toFixed(2),
      }));
    } else {
      setInput((input) => ({
        ...input,
        currencyFrom: parseFloat(event.target.value / exchangeRate).toFixed(2),
      }));
    }
  };

  const onExchange = () => {
    setBalance({
      ...balance,
      [state.currencyFrom]: balance[state.currencyFrom] - input.currencyFrom,
      [state.currencyTo]:
        balance[state.currencyTo] + parseFloat(input.currencyTo),
    });
    setInput({
      currencyFrom: 0,
      currencyTo: 0,
    });
  };

  const flipCurrency = () => {
    setIsError(false);
    setState({
      currencyFrom: state.currencyTo,
      currencyTo: state.currencyFrom,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-1">
            <div>
              <select
                name="currencyFrom"
                value={state.currencyFrom}
                onChange={handleChange}
              >
                {CURRENCIES.filter((cc) => cc !== state.currencyTo).map(
                  (currency) => (
                    <option value={currency}>{currency}</option>
                  )
                )}
              </select>
              <br />

              <div className="balance-label">
                Balance: {CURRENCY_SYMBOLS[state.currencyFrom]}{" "}
                {balance[state.currencyFrom]}
              </div>
            </div>
            <div>
              <div className="input-box">
                <span class="prefix">-</span>
                <input
                  type="number"
                  name="currencyFrom"
                  onChange={handleInputChange}
                  value={input.currencyFrom}
                />
              </div>
              {isError && <div className="error">Exceeds balance</div>}
            </div>
            <div onClick={flipCurrency} className="flip">
              ↕
            </div>
            <div className="c-amount">
              <span>
                {CURRENCY_SYMBOLS[state.currencyFrom]}1={" "}
                {CURRENCY_SYMBOLS[state.currencyTo]}
                {exchangeRate.toFixed(3)}
              </span>
            </div>
          </div>

          <div className="card-2">
            <div>
              <select
                name="currencyTo"
                value={state.currencyTo}
                onChange={handleChange}
              >
                {CURRENCIES.filter((cc) => cc !== state.currencyFrom).map(
                  (currency) => (
                    <option value={currency}>{currency}</option>
                  )
                )}
              </select>
              <br />
              <div className="balance-label">
                Balance: {CURRENCY_SYMBOLS[state.currencyTo]}
                {balance[state.currencyTo]}
              </div>
            </div>
            <div className="input-box">
              <span class="prefix">+</span>
              <input
                type="number"
                onChange={handleInputChange}
                name="currencyTo"
                value={input.currencyTo}
              />
            </div>
          </div>
        </div>
        <Button
          disabled={isError}
          onClick={onExchange}
          className="btn-exchange"
          type="submit"
          value="Submit"
        >
          Exchange
        </Button>
      </form>
    </div>
  );
};

export default ExchangeCard;
