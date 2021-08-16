/* 
This file contains the code for the home page of the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React, { Component } from "react";
import "../styles/homepage.styles.css";
import Typist from "react-typist";

import Logo1 from "N:/Virtual Keyboard/veyboard/src/r12.png";
class Homepage extends Component {
  render() {
    return (
      <>
        <img src={Logo1} width="1400px" height="540px" />

        <div className="container">
          <div className="row">
            <Typist>
              <div className="bottomleft">
                <div>
                  <font>
                    <b>Hello!</b>
                  </font>
                  <br />
                  <font>
                    <b>I'm Veyboard</b>
                  </font>
                </div>
              </div>
            </Typist>
          </div>
        </div>
      </>
    );
  }
}

export default Homepage;
