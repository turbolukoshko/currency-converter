import React, { Fragment, useEffect, useState } from 'react';
import { BASE_URL } from '../../config/apiConfig';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import CurrencySelect from '../CurrencySelect/CurrencySelect';

const Main = () => {

  const [currencyNames, setCurrencyNames] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromSelectValue, setFromSelectValue] = useState('');
  const [toSelectValue, setToSelectValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  
  useEffect(() => {
    const getExchangeRates = async() => {
      try {
        const response = await fetch(BASE_URL);
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

    getExchangeRates();
  }, []);

  const convert = () => amount * rates[0][toSelectValue];

  if(error) {
    return <h2>{error}</h2>
  }

  return(
    <main className="main">
      {loading ?
      <h1>Loading</h1> :
      <Fragment>
        <h1 className="main__title">Currency Converter</h1>
        <h3>Amount</h3>
        <CurrencyInput
          onChange={e => setAmount(e.target.value)}
          value={amount}
        />
        <h3>From:</h3>
        <CurrencySelect
          selectOptions={currencyNames}
          selectedCurrency={fromSelectValue}
          onChange={e => setFromSelectValue(e.target.value)}
        />
        <h3>To:</h3>
        <CurrencySelect
          selectOptions={currencyNames}
          selectedCurrency={toSelectValue}
          onChange={e => setToSelectValue(e.target.value)}
        />
        { amount !== '' && <h2>{amount} {fromSelectValue} / {convert()} {toSelectValue}</h2> }
        <button>Reset</button>
      </Fragment>
      }
    </main>
  );
}

export default Main;
