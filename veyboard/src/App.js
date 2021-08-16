/* 
This file contains javascript code for the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import "./App.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "./components/About";
import LanguageConvertor from "./components/LanguageConvertor";
import SpeechToText from "./components/SpeechToText";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />

          <Route path="/keyboard" component={Keyboard} />

          <Route path="/team" component={AboutUs} />

          <Route path="/lang-convertor" component={LanguageConvertor} />

          <Route path="/stt" component={SpeechToText} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
