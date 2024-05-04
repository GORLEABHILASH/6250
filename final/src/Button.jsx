import React from 'react';
import { useState } from 'react';
const Button = ({ type = 'button', visual = 'button', card ='no' ,onClick, children }) => {

    const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked(true);
    onClick && onClick();
  };
 

  return (
    <>
    <button type={type} onClick={handleClick} className={`event-register-button` }>
    {children}
  </button>
  
   </>
  );
};

export default Button;