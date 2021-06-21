import React, {Component, Fragment} from 'react';

//Import of stylesheet
import './Details.css';

//Other components import
import CustomizedSnackbar from '../../common/customizedsnackbar/CustomizedSnackBar'
import Header from '../../common/header/Header'

//Material UI component imports
import IconButton from '@material-ui/core/IconButton';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";


class Details extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            restaurant_name: null,
            photo_URL: null,
            customer_rating: null,
            average_price: null,
            number_customers_rated: null,
            locality: null,
            categories: [],
            open: false,
            totalAmount: 0,
            totalItems: 0,
            cartEmpty: false,
            orderItems: {id: null, items: [], total: 0},
            cartItems: [],
            cartItem: {},
            itemQuantityDecreased: false,
            nonloggedIn: false,
            itemRemovedFromCart: false,
            itemQuantityIncreased: false,
            itemAddedFromCart: false,
        }

    }

    componentDidMount() {
        // Get profile 
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    id: JSON.parse(this.responseText).id,
                    restaurant_name: JSON.parse(this.responseText).restaurant_name,
                    photo_URL: JSON.parse(this.responseText).photo_URL,
                    customer_rating: JSON.parse(this.responseText).customer_rating,
                    average_price: JSON.parse(this.responseText).average_price,
                    number_customers_rated: JSON.parse(this.responseText).number_customers_rated,
                    locality: JSON.parse(this.responseText).address.locality,
                    categories: JSON.parse(this.responseText).categories,
                    orderItems: {id: JSON.parse(this.responseText).id},


                });
            }
        });

        let url = this.props.baseUrl + 'restaurant/';

        xhr.open("GET", url + this.props.match.params.restaurantId);
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
		xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    //Function to get the index of the item
    getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    /**
     * This function is called when you add an item to the cart.
     * @param e - event
     * @param id - item id
     * @param type - type (VEG or NON_VEG)
     * @param name - item name
     * @param price - price
     */
    addToCartHandler = (e, id, type, name, price) => {
        var totalAmount = this.state.totalAmount;
        var totalItems = this.state.totalItems;
        totalItems += 1;

        const newItem = this.state.cartItem;
        newItem.id = id;
        newItem.type = type;
        newItem.name = name;
        newItem.pricePerItem = price;
        newItem.quantity = 1;
        newItem.priceForAll = price;

        this.setState({cartItem: newItem});

        totalAmount += price;

        if (this.state.orderItems.items !== undefined && this.state.orderItems.items.some(item => (item.name === name))) {
            var index = this.getIndex(name, this.state.orderItems.items, "name");
            var quantity = this.state.orderItems.items[index].quantity + 1;
            var priceForAll = this.state.orderItems.items[index].priceForAll + this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.priceForAll = priceForAll;
            this.setState(item);

        } else {

            this.state.cartItems.push(this.state.cartItem);
            this.setState({cartItem: {}});


            const orderItems = this.state.orderItems;
            orderItems.items = this.state.cartItems;
            this.setState({orderItems: orderItems});
        }

        this.setState({open: true});
        this.setState({totalItems: totalItems});
        this.setState({totalAmount: totalAmount});


    }

    /**
     * This function is called when an item is removed from the cart.
     * @param e - event
     * @param id - item id
     * @param type - type (VEG or NON_VEG)
     * @param name - item name
     * @param price - price
     */
    removeFromCartHandler = (e, id, type, name, price) => {

        var index = this.getIndex(name, this.state.orderItems.items, "name");

        if (this.state.orderItems.items[index].quantity > 1) {
            var quantity = this.state.orderItems.items[index].quantity - 1;
            var priceForAll = this.state.orderItems.items[index].priceForAll - this.state.orderItems.items[index].pricePerItem;
            var item = this.state.orderItems.items[index];
            item.quantity = quantity;
            item.priceForAll = priceForAll;
            this.setState(item);
            this.setState({itemQuantityDecreased: true});

        } else {

            this.state.orderItems.items.splice(index, 1);
            this.setState({itemRemovedFromCart: true});

        }


        var totalAmount = this.state.totalAmount;
        totalAmount -= price;
        var totalItems = this.state.totalItems;
        totalItems -= 1;

        this.setState({totalItems: totalItems});
        this.setState({totalAmount: totalAmount});

    }


    addAnItemFromCartHandler = (item, index) => {
        const itemIndex = this.getIndex(item.name, this.state.orderItems.items, "name");

        var quantity = this.state.orderItems.items[itemIndex].quantity + 1;
        var priceForAll = this.state.orderItems.items[itemIndex].priceForAll + this.state.orderItems.items[itemIndex].pricePerItem;
        var itemAdded = this.state.orderItems.items[itemIndex];
        itemAdded.quantity = quantity;
        itemAdded.priceForAll = priceForAll;
        this.setState(item);
        this.setState({ itemQuantityIncreased: true });
        var totalAmount = this.state.totalAmount;
        totalAmount += item.pricePerItem;
        var totalItems = this.state.totalItems;
        totalItems += 1;

        this.setState({ totalItems: totalItems });
        this.setState({ totalAmount: totalAmount });
    }


    closeHandler = () => {
        this.setState({ open: false })
        this.setState({ cartEmpty: false })
        this.setState({ nonloggedIn: false })
        this.setState({ itemQuantityDecreased: false })
        this.setState({ itemRemovedFromCart: false })
        this.setState({ itemAddedFromCart: false })
        this.setState({ itemQuantityIncreased: false })
    }

    /**
     * This funciton is called when checkout button is clicked.
     */
    checkoutHandler = () => {
        if (this.state.totalItems === 0) {
            this.setState({cartEmpty: true});
        } else if (this.state.totalItems > 0 && sessionStorage.getItem('access-token') === null) {
            this.setState({nonloggedIn: true});
        } else {
            this.props.history.push({
                pathname: '/checkout/',
                state: {
                    orderItems: this.state.orderItems,
                    total: this.state.totalAmount, restaurantName: this.state.restaurant_name
                }
            })
        }
    }

    //Function used to capitalize the string
    Capitalize(str) {
        var arr = str.split(" ")
        var pascalCasedString = ""
        arr.map(a => (
                pascalCasedString += a.charAt(0).toUpperCase() + a.slice(1) + " "
            )
        )
        return pascalCasedString
    }


    render() {
        return (

            <div><Header baseUrl={this.props.baseUrl}/>
                {this.state.text}
                <div className="main-container-body">
                    <div className="restaurant-details-container">
                        <div className="restaurant-left-container">
                            <img src={this.state.photo_URL} alt="none" className="restaurant-image"/>
                        </div>
                        <div className="restaurant-right-container">
                            <div style={{
                                fontWeight: "medium",
                                fontSize: "30px",
                                paddingTop: "10px",
                                paddingBottom: "10px"
                            }}>{this.state.restaurant_name}</div>
                            <div style={{
                                fontWeight: "medium",
                                fontSize: "16px",
                                paddingBottom: "10px"
                            }}>{this.state.locality}</div>
                            <div style={{fontSize: "14px", paddingBottom: "20px"}}>
                                {
                                    this.state.categories.map((category, index) => (

                                        <span
                                            key={category.id + "category"}>{category.category_name}{index < this.state.categories.length - 1 ? ", " : " "} </span>
                                    ))
                                }
                            </div>
                            <div className="rating-section">
                                <div className="rating-section-left">
                                    <i className="fa fa-star" aria-hidden="true" style={{
                                        paddingRight: "3px",
                                        paddingBottom: "3px",
                                        paddingLeft: "2px"
                                    }}></i>{this.state.customer_rating}
                                    <div style={{color: "gray", fontSize: "12px"}}>AVERAGE RATING BY</div>
                                    <div style={{
                                        color: "gray",
                                        fontSize: "12px"
                                    }}>{this.state.number_customers_rated} CUSTOMERS
                                    </div>
                                </div>
                                <div className="rating-section-right">
                                    <i className="fa fa-inr" aria-hidden="true" style={{
                                        paddingRight: "4px", paddingBottom: "3px",
                                        paddingLeft: "2px"
                                    }}></i>{this.state.average_price}
                                    <div style={{color: "gray", fontSize: "12px"}}>AVERAGE COST FOR</div>
                                    <div style={{color: "gray", fontSize: "12px"}}>TWO PEOPLE</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="category-items-cart-container">
                        <div className="category-items-container">
                            {this.state.categories.map(category => (
                                <div className="category" key={"category" + category.id}><span style={{
                                    color: "grey",
                                    fontWeight: "bolder"
                                }}>{category.category_name.toUpperCase()}</span> <Divider
                                    style={{marginTop: "10px", marginBottom: "10px", width: '90%'}}/>
                                    {category.item_list.map(item => (
                                        <Grid container key={item.id} style={{marginBottom: 5}}>
                                            <Grid item xs={1} lg={1}>
                                                {
                                                    item.item_type === "VEG" ?
                                                        <span className="fa fa-circle" aria-hidden="true"
                                                              style={{fontSize: "12px", color: "green"}}/>
                                                        :
                                                        <span className="fa fa-circle" aria-hidden="true"
                                                              style={{fontSize: "12px", color: "red"}}/>
                                                }
                                            </Grid>
                                            <Grid item xs={5} lg={6}>
                                                <Typography>
                                                    <span
                                                        className="item-name">  {this.Capitalize(item.item_name)} </span>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} lg={2}>
                                                <div className='pricePerItem'>
                                                    <span>
                                                        <i className="fa fa-inr" aria-hidden="true"></i>
                                                        <span
                                                            style={{paddingLeft: "2px"}}>{item.price.toFixed(2)}</span>
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} lg={1}>
                                            </Grid>
                                            <Grid item xs={2} lg={2}>
                                                <IconButton style={{padding: 0, float: 'left'}}
                                                            onClick={(e) => this.addToCartHandler(e, item.id, item.item_type, item.item_name, item.price)}>
                                                    <AddIcon style={{padding: 0}} fontSize='small'/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="cart-container">
                            <Card>
                                <CardContent>
                                    <div style={{fontWeight: "bold"}}>
                                        <i style={{paddingRight: "20px"}}>
                                            <Badge className="badge" badgeContent={this.state.totalItems}
                                                   color="primary" showZero>
                                                <ShoppingCartIcon/>
                                            </Badge>
                                        </i>My Cart
                                    </div>
                                    <div className="cart-item-list">
                                        <Grid container>
                                            {
                                                this.state.orderItems.items !== undefined ?
                                                    this.state.orderItems.items.map((item, index) => (
                                                        <Fragment key={item.id}>
                                                            <Grid item xs={2} lg={2}>
                                                                {item.type === "VEG" ?
                                                                    <span className="fa fa-stop-circle-o"
                                                                          aria-hidden="true"
                                                                          style={{
                                                                              fontSize: "12px",
                                                                              color: "green",
                                                                              paddingRight: "12px"
                                                                          }}/> :
                                                                    <span className="fa fa-stop-circle-o"
                                                                          aria-hidden="true"
                                                                          style={{
                                                                              fontSize: "12px",
                                                                              color: "red",
                                                                              paddingRight: "12px"
                                                                          }}/>}
                                                            </Grid>
                                                            <Grid item xs={3} lg={4}>
                                                                <Typography>
                                                                    {this.Capitalize(item.name)}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={3} lg={3} style={{flexWrap: "wrap"}}>
                                                                <div className='add-remove-icon'>
                                                                    <IconButton className='add-remove-button-hover'
                                                                                style={{display: "flex", padding: 0}}
                                                                                onClick={(e) => this.removeFromCartHandler(e, item.id, item.type, item.name, item.pricePerItem)}><RemoveIcon
                                                                        fontSize='default'
                                                                        style={{color: 'black', fontWeight: "bolder"}}/></IconButton>
                                                                    <Typography
                                                                        style={{fontWeight: 'bold'}}>{item.quantity}</Typography>
                                                                    <IconButton className='add-remove-button-hover'
                                                                        style={{ display: "flex", padding: 0 }}
                                                                        onClick={this.addAnItemFromCartHandler.bind(this, item, index)}>
                                                                        <AddIcon fontSize='default' style={{
                                                                            color: 'black',
                                                                            fontWeight: "bolder"
                                                                        }}/></IconButton>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={4} lg={3}>
                                                                <span style={{float: 'right'}}>
                                                                    <i className="fa fa-inr" aria-hidden="true"></i>
                                                                    <span
                                                                        style={{paddingLeft: "2px"}}>{item.priceForAll.toFixed(2)}</span>
                                                                </span>
                                                            </Grid>
                                                        </Fragment>
                                                    )) : null}
                                            <Grid item xs={8} lg={9}>
                                                <div style={{marginTop: 15, marginBottom: 15}}>
                                                    <span style={{fontWeight: 'bold'}}>TOTAL AMOUNT</span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} lg={3}>
                                                <div style={{marginTop: 15, marginBottom: 15}}>
                                                    <span style={{fontWeight: 'bold', float: 'right'}}>
                                                        <i className="fa fa-inr" aria-hidden="true"
                                                           style={{paddingRight: "2px"}}></i>{this.state.totalAmount.toFixed(2)}
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button className="checkout" variant="contained" color="primary" onClick={this.checkoutHandler}>
                                                    <Typography>CHECKOUT</Typography>
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <CustomizedSnackbar open={this.state.open} closeHandler={this.closeHandler}
                                        message="Item added to cart!"/>
                    <CustomizedSnackbar open={this.state.cartEmpty} closeHandler={this.closeHandler}
                                        message="Please add an item to your cart!"/>
                    <CustomizedSnackbar open={this.state.itemQuantityDecreased} closeHandler={this.closeHandler}
                                        message="Item quantity decreased by 1!"/>
                    <CustomizedSnackbar open={this.state.nonloggedIn} closeHandler={this.closeHandler}
                                        message="Please login first!"/>
                    <CustomizedSnackbar open={this.state.itemRemovedFromCart} closeHandler={this.closeHandler}
                        message="Item removed from cart!" />
                    <CustomizedSnackbar open={this.state.itemQuantityIncreased} closeHandler={this.closeHandler}
                        message="Item quantity increased by 1!" />

                </div>
            </div>
        )
    }
}

export default Details;