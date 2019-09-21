import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Details from "./details/Details";

class Controller extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "http://localhost:8080/api/";
    this.state = {
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    };
  }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Details {...props} baseUrl={this.baseUrl} />}
            />
            <Route
              exact
              path="/restaurant/:id"
              render={props => <Details {...props} baseUrl={this.baseUrl} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Controller;
