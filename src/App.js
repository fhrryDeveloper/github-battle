import React, { Component } from "react";
import "./App.css";
import Popular from "./components/Popular/Popular";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Battle from "./components/Battle/Battle";
import Results from './components/Results/Results';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/#/home" component={Home} />
            <Route exact path="/#/battle" component={Battle} />
            <Route path="/#/battle/results" component={Results} />
            <Route path="/#/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
