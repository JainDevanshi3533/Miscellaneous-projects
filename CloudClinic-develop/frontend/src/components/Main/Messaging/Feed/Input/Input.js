import React, { useState } from 'react';


import './Input.scss';
import Button from '../../../../Button/Button';
const Input = ({ onAddMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    // Call the callback function with the input value
    onAddMessage(inputValue);
    setInputValue(''); // Clear the input field
  };

  const handleChange = (event) => {
    // Update the input value
    setInputValue(event.target.value);
  };
  return (
    <div className="messaging-input-wrapper">
      <input type="text" placeholder="Type in your message"  value={inputValue}  onChange={handleChange}/>
      <Button action="Submit" color="navy" onClick={handleClick} />
    </div>
  );
};

export default Input;
