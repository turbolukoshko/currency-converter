import React from 'react';

const CurrencySelect = ({ 
  selectOptions, 
  selectedCurrency,
  onChange,
 }) => {
  return(
    <select
      className="currency-select"
      value={selectedCurrency}
      onChange={onChange}
    >
      {/* <option
        className="currency-select__option"
        value="Please select"
      >
        Please select
      </option> */}
      {selectOptions.map(option => {
        return(
          <option
            key={option}
            className="currency-select__option"
            value={option}
          >
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default CurrencySelect;
