/* 
This file contains the code for the buttons of the virtual keyboard functionality of the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React from "react";
import "../styles/button.styles.css";
const Button = ({ item, onClick }) => {
  return (
    <button
      id={item.data}
      type="button"
      className={`btn3d btn btn-white btn-lg  btn-outline-dark  `}
      onClick={() => onClick(item)}
      style={item.spl_style}
    >
      {item.data ? item.data : <i className={item.icon} />}
    </button>
  );
};

export default Button;
