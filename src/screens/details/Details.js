import React, { Component } from "react";
import "./Details.css";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
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
   * @description - Method to add items to cart and other calculations
   */
  addToCart = (item, category) => {
    this.snackBarHandler("Item added to cart!");
    const addedCartItem = this.state.cartItems || {
      restaurant: this.state.restaurant,
      itemList: [],
      totalPrice: 0,
      totalItemCount: 0
    };
    let findIndex = null;

    // Finding item from List which already added
    let findItem = addedCartItem.itemList.find((cartItem, index) => {
      if (cartItem.item.id === item.id) {
        findIndex = index;
        return cartItem;
      }
      return undefined;
    });

    // if Already added then adding quantity and price (total)
    if (findItem !== undefined) {
      findItem.quantity = findItem.quantity + 1;
      findItem.totalItemPrice = findItem.totalItemPrice + item.price;
      addedCartItem.itemList[findIndex] = findItem;
      findIndex = null;
      addedCartItem.totalPrice = addedCartItem.totalPrice + item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
    } else {
      // If not already added then creating temp object and doing other calculations
      const cartItem = {
        quantity: 1,
        categoryName: category.category_name,
        categoryId: category.id,
        item: item,
        totalItemPrice: item.price
      };
      addedCartItem.totalPrice = addedCartItem.totalPrice + item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
      // Push items to cart
      addedCartItem.itemList.push(cartItem);
    }

    // Finally updating our addedcartitem state
    this.setState({ cartItems: addedCartItem });
  };

  /**
   * @description - Remove item from cart when user click (-) button
   */
  removeAnItemFromCart = (removeCartItem, index) => {
    const addedCartItem = this.state.cartItems;
    // Finding item based on index
    let findItem = addedCartItem.itemList[index];
    // Updating finded item based on index
    findItem.quantity = findItem.quantity - 1;
    findItem.totalItemPrice = findItem.totalItemPrice - findItem.item.price;
    addedCartItem.totalPrice = addedCartItem.totalPrice - findItem.item.price;
    addedCartItem.totalItemCount = addedCartItem.totalItemCount - 1;

    // if quantity is goes less than or equal to zero - remove that item from cart
    if (findItem.quantity <= 0) {
      addedCartItem.itemList.splice(index, 1);
      this.snackBarHandler("Item removed from cart!");
    } else {
      addedCartItem.itemList[index] = findItem;
      this.snackBarHandler("Item quantity descreased by 1!");
    }
    // Updating cartitem in component state
    this.setState({ cartItems: addedCartItem });
  };

  /**
   * @description - add item from Mycart part - on (+) button click
   */
  addAnItemFromCart = (addCartItem, index) => {
    this.snackBarHandler("Item quantity increased by 1!");
    const addedCartItem = this.state.cartItems;
    // Find item based on selected item index
    let findItem = addedCartItem.itemList[index];
    // Item found update properties
    if (findItem !== undefined) {
      findItem.quantity = findItem.quantity + 1;
      findItem.totalItemPrice = findItem.totalItemPrice + findItem.item.price;
      addedCartItem.totalPrice = addedCartItem.totalPrice + findItem.item.price;
      addedCartItem.totalItemCount = addedCartItem.totalItemCount + 1;
    }
    addedCartItem.itemList[index] = findItem;
    // Update cartItems in component state
    this.setState({ cartItems: addedCartItem });
  };

  /**
   * @description - Checkout cart functionality goes here
   */
  checkOutCart = e => {
    this.checkLoginUpdate();
    const addedCartItem = this.state.cartItems;
    // check if items not added - alert user to add item
    if (addedCartItem.itemList.length <= 0) {
      this.snackBarHandler("Please add an item to your cart!");
      return;
    } else {
      // check if user logged in , if not - alert user to login
      if (sessionStorage.getItem("access-token") === null) {
        this.snackBarHandler("Please login first!");
        return;
      } else {
        // redirect to checkout page and passing cart items to checkout page
        this.props.history.push({
          pathname: "/checkout",
          state: { cartDetail: this.state.cartItems }
        });
      }
    }
  };

  /**
   *
   *@description - Common snackbar method to show messages
   */
  snackBarHandler = message => {
    // if any snackbar open already close that
    this.setState({ snackBarOpen: false });
    // updating component state snackbar message
    this.setState({ snackBarMessage: message });
    // Show snackbar
    this.setState({ snackBarOpen: true });
  };

  /**
   * @description - Update login component state if any update
   */
  checkLoginUpdate = () => {
    this.setState({
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true
    });
  };

  /**
   * @description - render method of component
   */
  render() {
    let restaurant = this.state.restaurant;
    let cartItems = this.state.cartItems;
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
            <Container style={{ marginTop: 20 }}>
              <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={5}>
                  {(restaurant.categories || []).map((category, index) => (
                    <div key={category.id} style={{ marginBottom: 16 }}>
                      <Typography
                        variant="caption"
                        gutterBottom
                        className="uppercase"
                      >
                        {category.category_name}
                      </Typography>
                      <Divider style={{ marginBottom: 8 }} />
                      <Grid container spacing={2} direction="column">
                        {(category.item_list || []).map((item, index) => (
                          <Grid item xs container key={item.id}>
                            <Grid
                              container
                              spacing={2}
                              direction="row"
                              justify="space-between"
                              alignItems="center"
                            >
                              <Grid item>
                                <Typography
                                  variant="caption"
                                  gutterBottom
                                  className="capitalize"
                                >
                                  <i
                                    className={
                                      item.item_type !== "VEG"
                                        ? "fa fa-circle redColor"
                                        : "fa fa-circle greenColor"
                                    }
                                  />
                                  <span style={{ marginLeft: 8 }}>
                                    {item.item_name}
                                  </span>
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="caption" gutterBottom>
                                  <i className="fa fa-inr"></i>
                                  <span>{item.price}</span>
                                  <IconButton
                                    aria-label="Add to cart"
                                    onClick={this.addToCart.bind(
                                      this,
                                      item,
                                      category
                                    )}
                                    className="padding-4 margin-l-30"
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Container>
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
