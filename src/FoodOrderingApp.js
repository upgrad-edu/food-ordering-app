import React, {Component} from 'react'

//Router import for redirection.
import {Route, Switch, Redirect} from "react-router-dom";

//Imports of different pages in the application
import Checkout from './checkout/Checkout';

/**
 * Food Ordering Application controller
 */
class FoodOrderingApp extends Component {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/'
    }

    render() {
        return (
            //Routing functionality
            <Switch>
                <Route path='/checkout' render={(props) => (
                             sessionStorage.getItem('access-token') === null ? (
                                 <Redirect to='/checkout'></Redirect>
                             ) : (
                                 <Checkout {...props} baseUrl={this.baseUrl} />
                            ))} />
                      
            </Switch>
        )
    }
}

export default FoodOrderingApp;