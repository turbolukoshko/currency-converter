import React, { Fragment, useEffect, useState } from 'react';
import { BASE_URL } from '../../config/apiConfig';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import './Main.scss';

const Main = () => {

  const [currencyNames, setCurrencyNames] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromSelectValue, setFromSelectValue] = useState('');
  const [toSelectValue, setToSelectValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [firstSelect, setFirstSelect] = useState(null);
  
  const getExchangeRates = async(param) => {
    try {
      let response;
      if(!firstSelect) {
        response = await fetch(BASE_URL);
      }else {
        response = await fetch(`https://api.exchangeratesapi.io/latest?base=${param}`);
      }
        const data = await response.json();
        setCurrencyNames([data.base, ...Object.keys(data.rates)]);
        setRates([data.rates]);
        setFromSelectValue(data.base);
        setToSelectValue(Object.keys(data.rates)[0]);
        setLoading(false);
    }catch(e) {
      setLoading(false);
      setError(e.message);
    }
  }

  useEffect(() => {
    getExchangeRates();
  }, []);

  useEffect(() => {
    getExchangeRates(firstSelect);
  }, [firstSelect]);

  const convert = () => (amount * rates[0][toSelectValue]).toFixed(2);

  if(error) {
    return <h2>{error}</h2>
  }


  const changeFirstSelect = e => {
    setFromSelectValue(e.target.value);
    setFirstSelect(e.target.value);
  }

  return(
    loading ?
    <h1 className="loading">Loading</h1> :
    <main className="main">
      <div className="main__content">
        <h1 className="main__content-title">Currency Converter</h1>
        <h3>Amount</h3>
        <CurrencyInput
          onChange={e => setAmount(e.target.value)}
          value={amount}
        />
        <button 
          onClick={() => setAmount('')}
          className="main__content-btn"
          >
            Reset
          </button>
        <h3>From:</h3>
        <CurrencySelect
          selectOptions={currencyNames}
          selectedCurrency={fromSelectValue}
          onChange={e => changeFirstSelect(e)}
        />
        <h3>To:</h3>
        <CurrencySelect
          selectOptions={currencyNames}
          selectedCurrency={toSelectValue}
          onChange={e => setToSelectValue(e.target.value)}
        />
        { amount !== '' && <h2 className="main__content-amount">{amount} {fromSelectValue} / {convert()} {toSelectValue}</h2> }
      </div>
    </main>
  );
}

export default Main;
