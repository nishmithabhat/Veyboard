/* 
This file contains the code for the Speech to Text functionality of the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React, { Component } from "react";
import "../styles/button.styles.css";

const textareaStyle = {
  marginTop: "15px",
  paddingTop: "2em",
  paddingBottom: "1em",
  marginBottom: "15px",
  marginRight: "10em",
};

class SpeechToText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ans: "",
    };
  }

  handleMic = () => {
    fetch("http://localhost:5000/speech-to-txt", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ ans: result.text });
      });
  };

  render() {
    return (
      <>
        <div className="container" id="text_return">
          <textarea
            value={this.state.ans}
            rows="7"
            cols="155"
            className="textarea"
            style={textareaStyle}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="center">
                <button
                  type="button"
                  onClick={() => this.handleMic()}
                  className="btn3d btn btn-white btn-lg btn-outline-dark"
                >
                  <i className="fa fa-microphone"></i>
                </button>

                <button
                  type="button"
                  onClick={() => this.setState({ ans: "" })}
                  className="btn3d btn btn-white btn-lg btn-outline-dark"
                >
                  <i className="fa fa-eraser"></i>
                </button>

                <button
                  type="button"
                  onClick={() => console.log(this.props.history.push("/"))}
                  className="btn3d btn btn-white btn-lg btn-outline-dark"
                >
                  <i className="fa fa-sign-out"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SpeechToText;
