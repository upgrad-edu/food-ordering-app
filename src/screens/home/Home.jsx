import React, { Component } from 'react';
import Header from '../../common/header/Header';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-svg-core';


import './Home.css';

// Custom Styles to over ride material ui default styles
const styles = (theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },

  grid: { //style for the grid component
    "padding": "20px",
    "margin-left": "0.5%",
    "margin-right": "0.5%",
    transform: 'translateZ(0)',
    cursor: 'pointer',
  },
  gridCard: { //Style for the Grid card
    '@media (min-width: 1200px)': { //Making the code responsive to different screens

      'flex-grow': '0',
      'max-width': '25%',
      'flex-basis': '25%',
    },

    '@media (min-width: 960px) and (max-width:1200px)': { //Making the code responsive to different screens
      'flex-grow': '0',
      'max-width': '33%',
      'flex-basis': '33%',
    },
  },

  card: { //Style for the card and responsive code for different screen size
    height: "500px",
    '@media (min-width: 1300px)': { //Making the code responsive to different screens
      height: "500px",
    },
    '@media (min-width: 960px) and (max-width:1300px)': { //Making the code responsive to different screens
      height: "375px",
    }
  },

  media: { // style for the image in the card
    height: "40%",
    width: "100%",
    // paddingTop: '56.25%', // 16:9
  },
  title: { //Style for the Title in the Card
    "font-size": "25px",
    '@media (min-width: 1300px)': {
      "font-size": "40px",
    },
    '@media (min-width: 960px) and (max-width:1300px)': {
      "font-size": "30px",
    },
    '@media (max-width: 960px)': {
      "font-size": "40px",
    }
  },
  categories: { //Style for the categories in the card
    "font-size": "16px",
    '@media (min-width: 1300px)': {
      "font-size": "22px",
    },
    '@media (min-width: 960px) and (max-width:1300px)': {
      "font-size": "20px",
    },
    '@media (max-width: 960px)': {
      "font-size": "22px",
    }
  },


  cardContent: { // Styles for the card content
    "padding": "10px",
    "margin-left": "20px",
    "margin-right": "20px",
    "height": "20%",
    "display": "flex",
    "align-items": "center",
  },
  cardActionArea: { //Style for the Card action area button
    "display": "flex",
    "height": "100%",
    "flex-direction": "column",
    "align-items": "normal",
    "justify-content": "space-between",

  }

}))

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


  //This method is called from the header when the search box is activated and the page is needed to be updated with the new restaurant list.
  updateSearchRestaurant = (searchRestaurant, searchOn) => {
    let allRestaurantData = [];
    if (searchOn) {
      if (!this.state.isSearchOn) {
        allRestaurantData = this.state.restaurant;
        this.setState({
          restaurant: searchRestaurant,
          allRestaurantData: allRestaurantData,
          isSearchOn: true,
        })
      } else {
        this.setState({
          ...this.state,
          restaurant: searchRestaurant,
        })
      }
    } else {
      allRestaurantData = this.state.allRestaurantData;
      this.setState({
        restaurant: allRestaurantData,
        isSearchOn: false,
      });
    }
  }


  //This Method Handles the click on the restaurant card.
  //It takes the restaurant id as the Parameter and then pushes the restaurantDetails page
  restaurantCardClicked = (restaurantId) => {
    this.props.history.push('/restaurant/' + restaurantId);
  }

  render() {
    // Styles are stored in the const classes
    const { classes } = this.props;
    return (
        <div>
          {/* Rendering the Header Component */}
          <Header baseUrl={this.props.baseUrl} showHeaderSearchBox={true} updateSearchRestaurant={this.updateSearchRestaurant}></Header>
          <div className="flex-container">
            <Grid container spacing={3} wrap="wrap" alignContent="center" className={classes.grid}>
              {/* Restaurant array map method is called and for each item in the array a card is rendered with the details. */}
              {this.state.restaurant !== null ? this.state.restaurant.map(restaurant => (
                      //Grid Used to create columns as per the screen size
                      //Card used to show the restaurant details.
                      <Grid key={restaurant.id} item xs={12} sm={6} md={3} className={classes.gridCard}>
                        <Card className={classes.card}>
                          <CardActionArea className={classes.cardActionArea} onClick={() => this.restaurantCardClicked(restaurant.id)}>
                            <CardMedia
                                className={classes.media}
                                image={restaurant.photo_URL}
                                title={restaurant.restaurant_name}
                            />
                            <CardContent className={classes.cardContent}>
                              <Typography className={classes.title} variant="h5" component="h2">
                                {restaurant.restaurant_name}
                              </Typography>
                            </CardContent>
                            <CardContent className={classes.cardContent}>
                              <Typography variant="subtitle1" component="p" className={classes.categories}>
                                {restaurant.categories}
                              </Typography>
                            </CardContent>
                            <CardContent className={classes.cardContent}>
                              <div className="card-bottom-info">
                                                <span className="rest-rating">
                                                    <span>
                                                        <FontAwesomeIcon icon="star" size="lg" color="white" />
                                                    </span>
                                                    <Typography variant="caption" component="p" >{restaurant.customer_rating}</Typography>
                                                    <Typography variant="caption" component="p" >({restaurant.number_customers_rated})</Typography>
                                                </span>
                                <span className="rest-for-two">
                                                    <Typography variant="caption" component="p" style={{fontSize: '14px'}}>
                                                        <i className="fa fa-inr" aria-hidden="true"></i>
                                                      {restaurant.average_price}
                                                    </Typography>
                                                    <Typography variant="caption" component="p" style={{fontSize: '14px'}}>for two</Typography>
                                                </span>
                              </div>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                  ))
                  :<Typography variant='body1' component='p'>
                    No restaurant with given name.
                  </Typography>
              }
            </Grid>
          </div>
        </div>
    )
  }
}

export default withStyles(styles)(Home);