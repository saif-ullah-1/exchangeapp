import { useState, React } from "react";
import "../styles/exchangeCard.css";
import { Button } from "react-bootstrap";

const ExchangeCard = () => {
  const [state, setState] = useState({
    currencyFrom: "USD",
    currencyTo: "EUR",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    alert(
      "Please confirm you want to Convert from " +
        state.currencyFrom +
        " To " +
        state.currencyTo
    );
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-1">
            <div>
              <select
                name="currencyFrom"
                value={state.currencyFrom}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <br />

              <div className="balance-label">Balance: $100.00</div>
            </div>
            <div>
              <input type="number" placeholder="-" />
            </div>
            <div className="c-amount">
              <span>€1= $1.18.77</span>
            </div>
          </div>

          <div className="card-2">
            <div>
              <select
                name="currencyTo"
                value={state.currencyTo}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <br />
              <div className="balance-label">Balance: $100.00</div>
            </div>
            <div>
              <input type="number" placeholder="+" />
            </div>
          </div>
        </div>
        <Button className="btn-exchange" type="submit" value="Submit">
          Exchange
        </Button>
      </form>
    </>
  );
};

export default ExchangeCard;
