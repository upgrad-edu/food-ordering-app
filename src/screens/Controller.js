import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home/Home';
import Details from './details/Details.js';
import Checkout from './checkout/Checkout.js';
import Profile from './profile/Profile.js';



//Creating controller class for easy routing the pages
class Controller extends Component {
    constructor() {
        super()
        this.baseUrl = "http://localhost:8080/api/" //setting the baseUrl of the api
    }

    render() {
        return (<
                    Router >
            <
                    div className='main-container' >
                <
                    Route exact path='/'
                    render={
                        (props) => < Home {...props}
                            baseUrl={this.baseUrl}
                        />} /> { /* Route to home Page */} <
                    Route path='/restaurant/:id'
                    render={
                        (props) => < Details {...props}
                            baseUrl={this.baseUrl}
                        />} /> { /* Route to restaurant details Page */} <
                    Route path='/profile'
                    render={
                        (props) => < Profile {...props}
                            baseUrl={this.baseUrl}
                        />} /> { /* Route to Profile Page */} <
                    Route path='/checkout'
                    render={
                        (props) => < Checkout {...props}
                            baseUrl={this.baseUrl}
                        />} /> { /* Route to Checkout Page */} <
                                    /div> <
                                    /Router>

                )
                            }

                        }

                export default Controller;