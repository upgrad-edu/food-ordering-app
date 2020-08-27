import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import Error404 from './error404/Error404'

export default class extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
    )
  }
}