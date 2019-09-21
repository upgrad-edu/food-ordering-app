import React, { Component } from "react";
import "./Details.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import details from "../../__mocks__/details";
import "font-awesome/css/font-awesome.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    backgroundColor: "lightgrey",
    boxShadow: "none",
    borderRadius: 0
    //   maxWidth: 500,
  },
  image: {
    width: "100%",
    height: "100%"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  close: {
    padding: theme.spacing(0.5)
  },
  margin: {
    margin: theme.spacing(2)
  },
  padding: {
    padding: theme.spacing(0, 2)
  }
});

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      snackBarMessage: "",
      restaurant: null,
      cartItems: {
        restaurant: null,
        itemList: [],
        totalPrice: 0,
        totalItemCount: 0
      },
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    };
  }

  /**
   * @description - on component mount calling api to get restaurant details based on restaurant id
   */
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.getRestaurantDetails("params.id");
  }

  /**
   * @description - Method calling Api to get restaurant details based on restaurant id
   */
  getRestaurantDetails = restaurant_id => {
    // Get restaurant details based on id
    let dataRestaurantDetails = null;
    let xhrUserProfile = new XMLHttpRequest();
    let that = this;
    let tempCartItems = this.state.cartItems;
    xhrUserProfile.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const data = JSON.parse(this.responseText);
          that.setState({
            restaurant: data
          });
          tempCartItems.restaurant = data;
          that.setState({
            cartItems: tempCartItems
          });
        } else {
          const data = details;
          that.setState({
            restaurant: data
          });
          tempCartItems.restaurant = data;
          that.setState({
            cartItems: tempCartItems
          });
        }
      }
    });
    xhrUserProfile.open(
      "GET",
      this.props.baseUrl + "restaurant/" + restaurant_id
    );
    xhrUserProfile.setRequestHeader("Cache-Control", "no-cache");
    xhrUserProfile.send(dataRestaurantDetails);
  };

  /**
   * @description - render method of component
   */
  render() {
    let restaurant = this.state.restaurant;
    const { classes } = this.props;
    return (
      <div className="details">
        {restaurant !== null && (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={3} container>
                  <ButtonBase className={classes.image} disableRipple={true}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={restaurant.photo_URL}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    spacing={2}
                    className="responsiveHeader"
                  >
                    <Grid item xs>
                      <Typography gutterBottom variant="h6">
                        {restaurant.restaurant_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        className="uppercase"
                      >
                        {restaurant.address.locality}
                      </Typography>
                      {(restaurant.categories || []).map((category, index) => (
                        <Typography
                          variant="caption"
                          key={category.id}
                          display="inline"
                        >
                          {category.category_name}
                          {index < restaurant.categories.length - 1 ? ", " : ""}
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item container spacing={4}>
                      <Grid item xs={6} sm={2}>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer", fontWeight: "500" }}
                        >
                          <i className="fa fa-star"></i>
                          <span style={{ marginLeft: 4 }}>
                            {restaurant.customer_rating}
                          </span>
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ cursor: "pointer" }}
                          className="uppercase smallFont"
                        >
                          Average Rating by {restaurant.number_customers_rated}{" "}
                          Customers
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer", fontWeight: "500" }}
                        >
                          <i className="fa fa-inr"></i>
                          <span style={{ marginLeft: 4 }}>
                            {restaurant.average_price}
                          </span>
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ cursor: "pointer" }}
                          className="uppercase smallFont"
                        >
                          Average cost for two people
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Details);
