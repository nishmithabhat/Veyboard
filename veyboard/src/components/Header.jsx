/* 
This file is for the header of the application i.e. it contains the code for the navigation bar.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React from "react";
import "../styles/header.styles.css";
import { NavLink } from "react-router-dom";
const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <NavLink className="navbar-brand" to="/">
      <i className="fa fa-keyboard"></i> Veyboard
    </NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-link">
          <NavLink activeClassName="active" className="nav-link" to="/keyboard">
            <i className="fa fa-keyboard-o"></i> Keyboard{" "}
            <span className="sr-only">(current)</span>
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink activeClassName="active" className="nav-link" to="/stt">
            <i className="fa fa-microphone fa-lg"></i> Speech-To-Text
          </NavLink>
        </li>
        <li className="nav-link ">
          <NavLink
            activeClassName="active"
            className="nav-link"
            to="/lang-convertor"
          >
            <i className="fa fa-language fa-lg"></i> Language convertor
          </NavLink>
        </li>
        <div
          className=" d-flex nav-link"
          id="navcol-1"
          style={{ float: "right", paddingRight: 10 }}
        >
          <NavLink activeClassName="active" className="nav-link" to="/team">
            About
          </NavLink>
        </div>
      </ul>
    </div>
  </nav>
);

export default Header;
