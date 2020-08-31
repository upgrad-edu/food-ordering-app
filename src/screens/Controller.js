import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Error404 from './error404/Error404'
import Home from './home/Home'

export default class extends Component {

  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api/";
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    )
  }
}