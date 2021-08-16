/* 
This file contains the code for the about page of the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React from "react";
import "../styles/aboutus.styles.css";
const AboutUs = () => (
  <>
    <div className="team-boxed" style={{ color: "white" }}>
      <div className="container">
        <div className="intro">
          <center>
            <div className="col-md-6 item text mt-3">
              <p>
                <center>
                  <h2 className="text-center">Virtual Keyboard</h2>
                </center>
              </p>
              <p>
                <center>
                  The other features of this project includes Language
                  Translation and Speech-to-Text
                </center>
              </p>

              <span className="text">
                <center>
                  <p>
                    The concepts of Python, Computer Vision and ReactJS have
                    been applied to this project.
                  </p>
                </center>
              </span>
            </div>
          </center>
          <p className="text-center text">
            This application was created as a part of the BCA final year
            project, submitted to SICSR, in collaboration with the following
            people:
          </p>
        </div>
        <center>
          <div>
            <h2 className="text-center">Team </h2>
            <div className="row" style={{ color: "black" }}>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Student</h5>
                    <p className="card-text">
                      <hr />
                    </p>
                    <p className="card-text">Name: Nishmitha Bhat</p>
                    <p className="card-text">
                      Email: nishmithabhat03@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Student</h5>
                    <p className="card-text">
                      <hr />
                    </p>
                    <p className="card-text">Name: Rachel Anchan</p>
                    <p className="card-text">Email: rachelanchan11@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Student</h5>
                    <p className="card-text">
                      <hr />
                    </p>
                    <p className="card-text">Name: Wilfred Daniel</p>
                    <p className="card-text">Email: wilfredaniel00@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
    <div style={{ color: "black", backgroundColor: "#84ffff " }}>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-sm-6 col-md-3 item"
              style={{ width: "293px" }}
            ></div>
          </div>
          <p className="copyright mt-3">{"Powered by Veyboard :)"}</p>
        </div>
      </footer>
    </div>
  </>
);

export default AboutUs;
