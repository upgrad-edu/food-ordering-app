import React, { Component } from 'react';
import { MenuList } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import './Header.css';



const appStyles = (theme => ({
    loginButton: {
        "font-weight": 400,
        "margin": "8px 8px 8px 8px"

    },
    formButton: {
        "font-weight": 400,
    },

    tab: {
        "font-weight": 400,
    },
    profileButton: {
        color: "#c2c2c2",
        "text-transform": "none",
        "font-weight": 400,
        "padding": "8px 8px 8px 8px",
    },
    searchText: {
        'color': 'white',
        '&:after': {
            borderBottom: '2px solid white',
        }
    },
    formControl: {
        "width": "80%",
    },

    menuList: {
        padding: "0px"
    },
    menuItems: {
        "text-decoration": "none",
        "color": "black",
        "text-decoration-underline": "none",
        "padding-top": "0px",
        "padding-bottom": "0px",
    }


}))
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: '0px', textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}



class Header extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            menuIsOpen: false,
            value: 0,
            inValidLoginContact: "dispNone",
            invalidPassword: "dispNone",
            notRegisteredContact: "dispNone",
            validPasswordHelpText: "dispNone",
            contactNoRegistered: "dispNone",
            loginContactNo: "",
            email: "",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            firstName: "",
            signUpPasswordRequired: "dispNone",
            signUpContactNo: "",
            signUpContactNoRequired: "dispNone",
            loginContactNoRequired: "dispNone",
            firstNameRequired: "dispNone",
            lastName: "",
            contactHelpText: "dispNone",
            snackBarOpen: false,
            snackBarMessage: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            signUpPassword: "",
            transition: Fade,
            loggedIn: sessionStorage.getItem('access-token') === null ? false : true,
            loggedInName: sessionStorage.getItem('customer-name'),

        }

    }


    validateLoginDetails = () => {
        let loginContactNoRequired = "dispNone";
        let loginPasswordRequired = "dispNone";
        let inValidLoginContact = "dispNone";
        let isFormValid = true;
        if (this.state.loginContactNo !== "") {
            var contactNo = "[7-9][0-9]{9}";
            if (!this.state.loginContactNo.match(contactNo)) {
                inValidLoginContact = "dispBlock"
                isFormValid = false;
            }
        }
        if (this.state.loginPassword === "") {
            loginPasswordRequired = "dispBlock"
            isFormValid = false;
        }
        if (this.state.loginContactNo === "") {
            loginContactNoRequired = "dispBlock";
            isFormValid = false;
        }

        this.setState({
            loginPasswordRequired: loginPasswordRequired,
            inValidLoginContact: inValidLoginContact,
            loginContactNoRequired: loginContactNoRequired
        })
        return (isFormValid);
    }


    toggleSignUpEventHandler = () => {

        if (this.validateSignUpDetails()) {
            let dataSignUp = JSON.stringify({
                "first_name": this.state.firstName,
                "password": this.state.signUpPassword,
                "contact_number": this.state.signUpContactNo,
                "last_name": this.state.lastName,
                "email_address": this.state.email
            });

            let xhrSignUp = new XMLHttpRequest();
            let that = this;
            xhrSignUp.addEventListener("readystatechange", function () {

                if (this.readyState === 4) {
                    if (xhrSignUp.status === 400) {
                        let responseData = JSON.parse(this.responseText)
                        if (responseData.code === 'SGR-001') {
                            that.setState({
                                ...that.state,
                                contactNoRegistered: "dispBlock"
                            })
                        }
                    }
                    if (xhrSignUp.status === 201) {
                        that.setState({
                            ...that.state,
                            value: 0,
                            snackBarMessage: "Registered successfully! Please login now!",
                            snackBarOpen: true,
                        })
                    }

                }
            });
            xhrSignUp.open("POST", this.props.baseUrl + "customer/signup");
            xhrSignUp.setRequestHeader("Content-Type", "application/json");
            xhrSignUp.setRequestHeader("Cache-Control", "no-cache");
            xhrSignUp.send(dataSignUp);
        }
    }


    logOutEventHandler = () => {
        let logoutData = null;
        let that = this
        let xhrLogout = new XMLHttpRequest();
        xhrLogout.addEventListener("readystatechange", function () {
            if (xhrLogout.readyState === 4 && xhrLogout.status === 200) {
                sessionStorage.removeItem("uuid");
                sessionStorage.removeItem("access-token");
                sessionStorage.removeItem("customer-name");
                that.setState({
                    ...that.state,
                    loggedIn: false,
                    menuIsOpen: !that.state.menuIsOpen,
                });

                if (that.props.logoutRedirect) {
                    that.props.logoutRedirect();
                }
            }

        })

        xhrLogout.open('POST', this.props.baseUrl + 'customer/logout');
        xhrLogout.setRequestHeader('authorization', 'Bearer ' + sessionStorage.getItem('access-token'));
        xhrLogout.send(logoutData);


    }


    validatePassword = (password) => {
        let lowerCase = false;
        let upperCase = false;
        let number = false;
        let specialCharacter = false;


        if (password.length < 8) {
            return false;
        }



        if (password.match("(?=.*[#@$%&*!^]).*")) {
            specialCharacter = true;
        }
        if (password.match("(?=.*[a-z]).*")) {
            lowerCase = true;
        }
        if (password.match("(?=.*[A-Z]).*")) {
            upperCase = true;
        }
        if (password.match("(?=.*[0-9]).*")) {
            number = true;
        }

        if (lowerCase && upperCase) {
            if (specialCharacter && number) {
                return true;
            }
        } else {
            return false;
        }
        return false;
    }


    exitSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            snackBarMessage: "",
            snackBarOpen: false,
        })
    }


    contactChangeEventHandler = (event) => {
        this.setState({
            ...this.state,
            loginContactNo: event.target.value,
        })
    }


    passwordEventChangeHandler = (event) => {
        this.setState({
            ...this.state,
            loginPassword: event.target.value,
        })
    }


    firstNameEventHandler = (event) => {
        this.setState({
            ...this.state,
            firstName: event.target.value,
        })
    }


    lastNameEventHandler = (event) => {
        this.setState({
            ...this.state,
            lastName: event.target.value,
        })
    }


    emailEventHandler = (event) => {
        this.setState({
            ...this.state,
            email: event.target.value,
        })
    }


    newPasswordEventHandler = (event) => {
        this.setState({
            ...this.state,
            signUpPassword: event.target.value,
        })
    }


    newContactNoEventHandler = (event) => {
        this.setState({
            ...this.state,
            signUpContactNo: event.target.value,
        })
    }



    closeEventHandler = () => {
        this.setState({
            ...this.state,
            isModalOpen: false
        })
        if (this.props.changeBadgeVisibility) {
            this.props.changeBadgeVisibility();
        }
    }


    loginButtonEventHandler = () => {
        this.setState({
            ...this.state,
            isModalOpen: true,
            loginContactNo: "",
            loginContactNoRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            firstName: "",
            firstNameRequired: "dispNone",
            lastName: "",
            email: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            signUpPassword: "",
            signUpPasswordRequired: "dispNone",
            signUpContactNo: "",
            signUpContactNoRequired: "dispNone",
            inValidLoginContact: "dispNone",
            invalidPassword: "dispNone",
            notRegisteredContact: "dispNone",
            validPasswordHelpText: "dispNone",
            contactNoRegistered: "dispNone",
            contactHelpText: "dispNone",
        })

        if (this.props.changeBadgeVisibility) {
            this.props.changeBadgeVisibility();
        }
    }


    MenuToggleEventHandler = () => this.setState({
        ...this.state,
        menuIsOpen: !this.state.menuIsOpen
    })


    profileClickEventHandler = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.MenuToggleEventHandler();
    };



    searchEventHandler = (event) => {
        let searchOn = true
        if (!(event.target.value === "")) {
            let dataRestaurant = null;
            let that = this
            let xhrSearchRestaurant = new XMLHttpRequest();

            xhrSearchRestaurant.addEventListener("readystatechange", function () {
                if (xhrSearchRestaurant.readyState === 4 && xhrSearchRestaurant.status === 200) {
                    var restaurant = JSON.parse(this.responseText).restaurants;
                    that.props.searchRestaurantEventHandle(restaurant, searchOn);
                }
            })

            xhrSearchRestaurant.open('GET', this.props.baseUrl + 'restaurant/name/' + event.target.value)
            xhrSearchRestaurant.setRequestHeader("Content-Type", "application/json");
            xhrSearchRestaurant.setRequestHeader("Cache-Control", "no-cache");
            xhrSearchRestaurant.send(dataRestaurant);

        } else {
            let restaurant = [];
            searchOn = false
            this.props.searchRestaurantEventHandle(restaurant, searchOn);

        }
    }


    validateSignUpDetails = () => {
        let signUpPasswordRequired = "dispNone";
        let signUpContactNoRequired = "dispNone";
        let validPasswordHelpText = "dispNone";
        let contactHelpText = "dispNone";
        let firstNameRequired = "dispNone";
        let emailRequired = "dispNone";
        let invalidEmail = "dispNone";
        let signUpFormValid = true;


        if (this.state.email === "") {
            emailRequired = "dispBlock";
            signUpFormValid = false;
        }
        if (this.state.email !== "") {

            if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w+)+$/.test(this.state.email))) {
                invalidEmail = "dispBlock"
                signUpFormValid = false;
            }
        }
        if (this.state.firstName === "") {
            firstNameRequired = "dispBlock";
            signUpFormValid = false;
        }

        if (this.state.signUpContactNo === "") { // Checking for the contact not empty 
            signUpContactNoRequired = "dispBlock";
            signUpFormValid = false;
        }
        if (this.state.signUpContactNo !== "") { //Checking for contact format
            var contactNo = "[7-9][0-9]{9}";
            if (!this.state.signUpContactNo.match(contactNo)) {
                contactHelpText = "dispBlock"
                signUpFormValid = false;
            }
        }
        if (this.state.signUpPassword === "") { //Checking for password not empty
            signUpPasswordRequired = "dispBlock";
            signUpFormValid = false;
        }
        if (this.state.signUpPassword !== "") {
            if (!this.validatePassword(this.state.signUpPassword)) { //Checking for password strength
                validPasswordHelpText = "dispBlock"
                signUpFormValid = false;

            }
        }
        this.setState({
            firstNameRequired: firstNameRequired,
            emailRequired: emailRequired,
            signUpContactNoRequired: signUpContactNoRequired,
            invalidEmail: invalidEmail,
            validPasswordHelpText: validPasswordHelpText,
            contactHelpText: contactHelpText,
            signUpPasswordRequired: signUpPasswordRequired,
        })
        return (signUpFormValid);

    }


    toggleTabEventHandler = (event, value) => {
        this.setState({
            value
        });
    }

    loginEventHandler = () => {


        if (this.validateLoginDetails()) {
            let that = this;
            let dataLogin = null;
            let xhrLogin = new XMLHttpRequest();

            xhrLogin.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (xhrLogin.status === 401) {
                        let loginResponse = JSON.parse(this.responseText);
                        let notRegisteredContact = "dispNone"
                        let invalidPassword = "dispNone"
                        if (loginResponse.code === 'ATH-001') {
                            notRegisteredContact = "dispBlock"
                        }
                        if (loginResponse.code === 'ATH-002') {
                            invalidPassword = "dispBlock"
                        }
                        that.setState({
                            ...that.state,
                            notRegisteredContact: notRegisteredContact,
                            invalidPassword: invalidPassword,
                        })
                    } else if (xhrLogin.status === 200) {
                        let loginResponse = JSON.parse(this.responseText);
                        sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                        sessionStorage.setItem("customer-name", loginResponse.first_name);
                        sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                        that.setState({
                            ...that.state,
                            snackBarMessage: "Logged in successfully!",
                            snackBarOpen: true,
                            loggedInName: loginResponse.first_name,
                            loggedIn: true,
                        })
                        that.closeEventHandler();
                    }
                }
            })
            xhrLogin.open("POST", this.props.baseUrl + "customer/login");
            xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContactNo + ":" + this.state.loginPassword));
            xhrLogin.setRequestHeader("Cache-Control", "no-cache");
            xhrLogin.setRequestHeader("Content-Type", "application/json");

            xhrLogin.send(dataLogin);
        }

    }



    render() {

        const { classes } = this.props;
        return (
            <div>
                <header className="product-head">
                    <FastfoodIcon className="icon-product" fontSize="large" htmlColor="white" />
                    {this.props.showHeaderSearchBox === true &&
                        <span className="search-header">
                            <Input className={classes.searchText}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon id="logo-search" htmlColor="white"></SearchIcon>
                                    </InputAdornment>
                                }
                                fullWidth={true} placeholder="Search by Restaurant Name" onChange={this.searchEventHandler} />
                        </span>
                    }



                    {this.state.loggedIn !== true ?
                        <Button className={classes.loginButton} size="large" variant="contained" onClick={this.loginButtonEventHandler}>
                            <AccountCircle className="head-login" />
                            LOGIN
                        </Button>
                        : <Button className={classes.profileButton} size="large" variant="text" onClick={this.profileClickEventHandler}>
                            <AccountCircle className="profile-button-icon" htmlColor="#c2c2c2" />
                            {this.state.loggedInName}
                        </Button>
                    }
                    <Menu id="list-profile" anchorEl={this.state.anchorEl} open={this.state.menuIsOpen} onClose={this.profileClickEventHandler}>
                        <MenuList className={classes.menuList}>
                            <Link to={"/profile"} className={classes.menuItems} underline="none" color={"default"}>
                                <MenuItem className={classes.menuItems} onClick={this.onMyProfileClicked} disableGutters={false}>My profile</MenuItem>
                            </Link>
                            <MenuItem className="menu-items" onClick={this.logOutEventHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.isModalOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeEventHandler}
                    style={customStyles}
                >
                    <Tabs className="login-panel" value={this.state.value} onChange={this.toggleTabEventHandler}>
                        <Tab label="LOGIN" className={classes.tab} />
                        <Tab label="SIGNUP" className={classes.tab} />
                    </Tabs>


                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="login-contact-no">Contact No.</InputLabel>
                                <Input id="login-contact-no" className="input-fields" fullWidth={true} type="text" logincontactno={this.state.loginContactNo} onChange={this.contactChangeEventHandler} value={this.state.loginContactNo} />
                                <FormHelperText className={this.state.loginContactNoRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.inValidLoginContact}>
                                    <span className="red">Invalid Contact</span>
                                </FormHelperText>

                            </FormControl>
                            <br />
                            <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="login-password">Password</InputLabel>
                                <Input id="login-password" className="input-fields" type="password" loginpassword={this.state.loginPassword} fullWidth={true} onChange={this.passwordEventChangeHandler} value={this.state.loginPassword} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className='red'>required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.invalidPassword}>
                                    <span className="red">Invalid Credentials</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.notRegisteredContact}>
                                    <span className="red">This contact number has not been registered!</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <br />
                            <Button variant="contained" className={classes.formButton} color="primary" onClick={this.loginEventHandler}>LOGIN</Button>
                        </TabContainer>
                    }
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="first-name">First Name</InputLabel>
                                <Input id="first-name" className="input-fields" firstname={this.state.firstName} fullWidth={true} onChange={this.firstNameEventHandler} value={this.state.firstName} />
                                <FormHelperText className={this.state.firstNameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                                <Input id="last-name" className="input-fields" lastname={this.state.lastName} fullWidth={true} onChange={this.lastNameEventHandler} value={this.state.lastName} />
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" className="input-fields" type="email" email={this.state.email} fullWidth={true} onChange={this.emailEventHandler} value={this.state.email} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.invalidEmail}>
                                    <span className="red">Invalid Email</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="sign-up-password">Password</InputLabel>
                                <Input id="sign-up-password" className="input-fields" type="password" signuppassword={this.state.signUpPassword} fullWidth={true} onChange={this.newPasswordEventHandler} value={this.state.signUpPassword} />
                                <FormHelperText className={this.state.signUpPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.validPasswordHelpText}>
                                    <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="sign-up-contactNo">Contact No.</InputLabel>
                                <Input id="sign-up-contactNo" className="input-fields" signupcontactno={this.state.signUpContactNo} fullWidth={true} onChange={this.newContactNoEventHandler} value={this.state.signUpContactNo} />
                                <FormHelperText className={this.state.signUpContactNoRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.contactHelpText}>
                                    <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                                </FormHelperText>
                                <FormHelperText className={this.state.contactNoRegistered}>
                                    <span className="red">This contact number is already registered! Try other contact number.</span>
                                </FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <br />
                            <Button variant="contained" className={classes.formButton} color="primary" onClick={this.toggleSignUpEventHandler}>SIGNUP</Button>
                        </TabContainer>
                    }
                </Modal>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackBarOpen}
                        autoHideDuration={4000}
                        onClose={this.exitSnackBar}
                        TransitionComponent={this.state.transition}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    />
                </div>

            </div>

        )
    }



}

export default withStyles(appStyles)(Header);