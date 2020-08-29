import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';


import './Home.css';

// Creating Home class component to render the home page as per the design
class Home extends Component {
  constructor() {
    super()
    this.state = {
      restaurant: [],
      isSearchOn: false,
    }
  }

  //This Method is called when the components are mounted.
  //This method inturn calls the api to get all the restaurants in the data base and then sets the state of the restaurant
  //Re-renders the page with the updated restaurant details.
  componentDidMount() {
    let data = null;
    let xhrRestaurant = new XMLHttpRequest();
    let that = this;
    xhrRestaurant.addEventListener("readystatechange", function () {
      if (xhrRestaurant.readyState === 4 && xhrRestaurant.status === 200) {
        let restaurant = JSON.parse(xhrRestaurant.responseText)
        that.setState({
          restaurant: restaurant.restaurants
        });
      }
    })
    xhrRestaurant.open("GET", this.props.baseUrl + "restaurant") // Getting all data from the restaurant endpoint.
    xhrRestaurant.send(data)
  }
}

export default withStyles(styles)(Home);