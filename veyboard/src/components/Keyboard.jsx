/* 
This file contains the code for rendering the keyboard of the application onscreen.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React, { Component } from "react";
import Button from "./Button";
import { ROW1_2, ROW3, ROW4, ROW5, ROW6 } from "../keys";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const textareaStyle = {
  marginTop: "10px",
  paddingTop: "2em",
  paddingBottom: "1em",
  marginBottom: "15px",
  marginLeft: "65px",
};

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sen: "",
      isCaps: true,
    };

    this.writeToTxtArea = this.writeToTxtArea.bind(this);
    this.launchApplication = this.launchApplication.bind(this);
  }

  launchApplication = () => {
    fetch("http://localhost:5000/virtual-keyboard", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.msg === "ERR") {
          alert("Not working");
        }
      });
  };
  writeToTxtArea = (item) => {
    if (item.id === 44) {
      let uptedSen = this.state.sen + "\n";
      this.setState({ sen: uptedSen });
    } else if (item.id === 36) {
      let len = this.state.sen.length;
      let uptedSen = this.state.sen.substr(0, len - 1);
      this.setState({ sen: uptedSen });
    } else if (item.id === 37) {
      console.log(this.state.isCaps);
      this.setState({ isCaps: !this.state.isCaps });
      setTimeout(() => {
        toast.info(`${this.state.isCaps ? "Capslock On!" : "Capslock Off!"}`, {
          position: "top-right",
          autoClose: 2500,
          style: { backgroundColor: "#08daff", color: "black" },
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 700);
    } else {
      if (this.state.isCaps) {
        let uptedSen = this.state.sen + item.data;
        this.setState({ sen: uptedSen });
      } else {
        let uptedSen = this.state.sen + item.data.toString().toLowerCase();
        this.setState({ sen: uptedSen });
      }
    }
  };
  render() {
    return (
      <>
        <textarea
          rows="3"
          cols="150"
          style={textareaStyle}
          value={this.state.sen}
        />
        <div
          className="container"
          style={{
            marginLeft: "78px",
            alignItems: "center",
            marginBottom: "10em",
            flexDirection: "column",
          }}
        >
          <div
            className="row"
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
            }}
          >
            <div className="col-12">
              {ROW1_2.map((item) => (
                <Button
                  key={item.id}
                  item={item}
                  onClick={this.writeToTxtArea}
                />
              ))}
            </div>
          </div>
          <div
            className="row"
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
            }}
          >
            <div className="col-12">
              <div
                style={{
                  marginLeft: "43px",
                }}
              >
                {ROW3.map((item) => (
                  <Button
                    key={item.id}
                    item={item}
                    onClick={this.writeToTxtArea}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
            }}
          >
            <div className="col-12">
              <div
                style={{
                  marginLeft: "78px",
                }}
              >
                {ROW4.map((item) => (
                  <Button
                    key={item.id}
                    item={item}
                    onClick={this.writeToTxtArea}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
            }}
          >
            <div className="col-12">
              <div
                style={{
                  marginLeft: "82px",
                }}
              >
                {ROW5.map((item) => (
                  <Button
                    key={item.id}
                    item={item}
                    onClick={this.writeToTxtArea}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              paddingLeft: "0px",
              paddingRight: "5px",
            }}
          >
            <div className="col-12">
              <div
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  marginLeft: "365px",
                }}
              >
                {ROW6.map((item) => (
                  <Button
                    key={item.id}
                    item={item}
                    onClick={this.writeToTxtArea}
                  />
                ))}

                <Button
                  key="46"
                  item={{
                    data: "",
                    icon: "fa fa-power-off",
                    id: 46,
                    spl_style: { marginLeft: "9em" },
                  }}
                  onClick={this.launchApplication}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          progress={undefined}
        />
      </>
    );
  }
}

export default Keyboard;
