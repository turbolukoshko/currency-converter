import React from 'react';
import './CurrencySelect.scss';

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
      {selectOptions.map((option, index) => {
        return(
          <option
            key={option + index}
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
