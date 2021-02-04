import React from 'react';

const CurrencyInput = ({ onChange, value }) => {
  return(
    <input 
      type="number"
      className="currency-input"
      placeholder="Enter amount to be converted"
      onChange={onChange}
      value={value}
    />
  );
}

export default CurrencyInput;
