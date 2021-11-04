import { useState, React, useEffect } from "react";
import "../styles/exchangeCard.css";
import { Button } from "react-bootstrap";

const ExchangeCard = () => {
  const [state, setState] = useState({
    currencyFrom: "EUR",
    currencyTo: "USD",
  });
  const [input, setInput] = useState({
    currencyFrom:0,
    currencyTo:0
  })

  const [balance, setBalance] = useState({
    EUR:3,
    USD:100,
    GBP:100
  })

  const [rate, setRate] = useState(0)
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setInput({
      currencyFrom:0,
      currencyTo:0
    })
    fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=1abed3b7eb947d7509e3fa740dc7a42e&base=${state.currencyFrom}&symbols=${state.currencyTo}`
    ).then((res) => res.json().then((res1) => {
      if(res1?.error)
      setRate(1.01)
      else
      setRate(res1.rates[state.currencyTo])
    }));
  },[state]);

  const hasError = (value) => {
    if(value > balance[state.currencyFrom])
    {
      console.log('if')
      setIsError(true)
    }
    else {
      setIsError(false)
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    // alert(
    //   "Please confirm you want to Convert from " +
    //     state.currencyFrom +
    //     " To " +
    //     state.currencyTo
    // );
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    hasError(event.target.name === 'currencyFrom' ? event.target.value : input.currencyFrom);
    console.log(event.target.value)
    console.log(event.target.name)
    setInput({
      ...input,
      [event.target.name]: parseInt(event.target.value).toFixed(2),
    });
    if(event.target.name === 'currencyFrom'){
      setInput(input => ({
        ...input,
        currencyTo: parseInt(event.target.value).toFixed(2) * rate
      }))
    }
    else{
      setInput(input => ({
        ...input,
        currencyFrom: parseInt(event.target.value).toFixed(2) / rate
      }))
    }
  }

  const onExchange = () => {
    setBalance({
      ...balance,
      [state.currencyFrom]: balance[state.currencyFrom] - input.currencyFrom,
      [state.currencyTo]: balance[state.currencyTo] + parseFloat(input.currencyTo),
    })
    setInput({
      currencyFrom:0,
      currencyTo:0
    })
  }

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

              <div className="balance-label">Balance: $ {balance[state.currencyFrom]}</div>
            </div>
            <div>
                
              <input type="number" name="currencyFrom" onChange={handleInputChange} value={input.currencyFrom} placeholder="-" />
            </div>
            <div className="c-amount">
              <span>€1= ${rate}</span>
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
              <div className="balance-label">Balance: ${balance[state.currencyTo]}</div>
            </div>
            <div>
              <input type="number" onChange={handleInputChange} name="currencyTo" value={input.currencyTo} placeholder="+" />
            </div>
          </div>
        </div>
        <Button disabled={isError} onClick={onExchange} className="btn-exchange" type="submit" value="Submit">
          Exchange
        </Button>
      </form>
    </>
  );
};

export default ExchangeCard;
