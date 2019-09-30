import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgIcon from '@material-ui/core/SvgIcon';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from "@material-ui/core/Menu";
import { Link ,Redirect} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    searchBox: {
        color: "#fff",
        width: "320px",
        fontSize: 15,
        "&::after": {
            borderBottom: "1px solid white"
        }
    },
    formControl: {
        width: "85%",
    },
    loggedUserButton: {
        color: "#fff",
         textTransform: "none"
    },
    menuItems: {
        marginTop: 30
    }
});

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {
    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
        this.state = {
            modalIsOpen: false,
            value: 0,
            logincontactno: "",
            logincontactnoRequired: "dispNone",
            loginpassword: "",
            loginpasswordRequired: "dispNone",
            firstname: "",
            firstnameRequired: "dispNone",
            lastname: "",
            email: "",
            emailRequired: "dispNone",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupcontactno: "",
            signupcontactnoRequired: "dispNone",
            validEmail: false,
            validPassword: false,
            validContactNo: false,
            validLoginContactNo: false,
            signupErrorMsg: "",
            open: false,
            redirectToHome: false,
            loginErrorMsg: "",
            username: "",
            showUserProfileDropDown: false,
            anchorEl: null,
        }
    }

    componentDidMount(){
    }

    //Function used to open modal.. this function initializes modal as per the set values defined within...
    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            logincontactno: "",
            logincontactnoRequired: "dispNone",
            loginpassword: "",
            loginpasswordRequired: "dispNone",
            firstname: "",
            firstnameRequired: "dispNone",
            lastname: "",
            email: "",
            emailRequired: "dispNone",
            signupPassword: "",
            signupPasswordRequired: "dispNone",
            signupcontactno: "",
            signupcontactnoRequired: "dispNone",

        });
    }

    //Handler function to close the modal 
    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
        //Resetting login tab parameters as that to before closing login tab
        this.setState({logincontactnoRequired: "dispNone"});
        this.setState({loginpasswordRequired: "dispNone"});
        this.setState({value: 0});
        //signup
        this.setState({emailRequired: "dispNone"});
        this.setState({firstnameRequired: "dispNone"});
        this.setState({signupErrorMsg: ""});
        this.setState({loginErrorMsg: ""});
    }

    //Handler function to manage tab change events
    tabChangeHandler = (event, value) => {
        this.setState({ value })
    }

    //Handler function defined for submitting login form on login tab it checks for login field validations
    loginClickHandler = () => {
        this.state.loginpassword === "" ? this.setState({ loginpasswordRequired: "dispBlock" }) :
        this.setState({ loginpasswordRequired: "dispNone" });

        let isValidLoginContactNo = this.logincontactnoFieldValidation();
        this.setState({
            loginErrorMsg: ""
        });
        if(isValidLoginContactNo===true && this.state.loginpassword !== ""){
            this.callLoginApi();
        }
      }


    //Handler function handles submission of signup form it performs email, password & contact no. field valiations
    //before allowing user a successful signup otherwise it sends appropriate messages
    signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) :
            this.setState({ firstnameRequired: "dispNone" });
        //Email field validation
        let isValidEmail = this.emailFieldValidation();
        //Password field validation
        let isValidPassword = this.passwordFieldValidation();
        //Contact No. field validation
        let isValidContactNo = this.contactnoFieldValidation();

        this.setState({signupErrorMsg: ""})
        if(isValidEmail===true && isValidPassword===true && isValidContactNo===true){
            this.callSignupApi();
        }
    }

    //Function to check the entered email is valid or not.
    //Eg. of valid email is like something@something.something
    emailFieldValidation = () => {
        let isValidEmail = false;
        if (this.state.email === "") {
            this.setState({
                emailRequired: "dispBlock",
                validEmail: true
            });
        } else {
            // Check for Valid email
            var result = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(this.state.email);
            this.setState({ validEmail: result });
            result === false
                ? this.setState({ emailRequired: "dispBlock" })
                : this.setState({ emailRequired: "dispNone" });
            isValidEmail = result;
        }
        return isValidEmail;
    }

    //Function to check entered password is valid or not
    //A valid password is the one that contains 
    //at least a capital letter, a small letter, a number and a special character
    passwordFieldValidation = () => {
        let isValidPassword = false;
        if (this.state.signupPassword === "") {
            this.setState({
                signupPasswordRequired: "dispBlock",
                validPassword: true
            });
        } else {
            // Check for Valid Password with A valid password is the one that contains 
            //at least a capital letter, a small letter, a number and a special character
            var resultPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/).test(this.state.signupPassword);
            this.setState({ validPassword: resultPassword });
            resultPassword === false
                ? this.setState({ signupPasswordRequired: "dispBlock" })
                : this.setState({ signupPasswordRequired: "dispNone" });
            isValidPassword = resultPassword;
        }
        return isValidPassword;
    }

    //Function to check entered entered contact no. is valid or not
    //A valid contact number is the one that contains a total of 10 digits
    contactnoFieldValidation = () => {
        let isValidContactNo = false;
        if (this.state.signupcontactno === ""){
            this.setState({
                signupcontactnoRequired: "dispBlock",
                validContactNo: true
            });
        } else {
            //Check for valid mobile number
            var resultContactNo = new RegExp(/^\d{10}$/).test(this.state.signupcontactno);
            if(this.state.signupcontactno.length === 10 && resultContactNo === true){
                isValidContactNo = true;
                this.setState({
                    validContactNo: true,
                    signupcontactnoRequired : "dispNone"
                });
            } else {
                this.setState({
                    validContactNo: false,
                    signupcontactnoRequired: "dispBlock"
                });
            }
        }
        return isValidContactNo;
    }

    //Login contact no field validation
    logincontactnoFieldValidation = () => {
        let isValidLoginContactNo = false;
        if (this.state.logincontactno === ""){
            this.setState({
                logincontactnoRequired: "dispBlock",
                validLoginContactNo: true
            });
        } else {
            //Check for valid mobile number
            var resultContactNo = new RegExp(/^\d{10}$/).test(this.state.logincontactno);
            if(this.state.logincontactno.length === 10 && resultContactNo === true){
                isValidLoginContactNo = true;
                this.setState({
                    validLoginContactNo: true,
                    logincontactnoRequired : "dispNone"
                });
            } else {
                this.setState({
                    validLoginContactNo: false,
                    logincontactnoRequired: "dispBlock"
                });
            }
        }
        return isValidLoginContactNo;
    }

    //Function is used to call Signup API
    callSignupApi = () => {
        let signupData = {
            contact_number: this.state.signupcontactno,
            email_address: this.state.email,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            password: this.state.signupPassword
        };
        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function(){
            if(this.readyState === 4){
                //check for user registration status if response status is 201 then user is registered
                if(this.status===201){
                    that.setState({
                        open: true,
                        successMessage: "Registered successfully! Please login now!"
                      });
                    that.tabChangeHandler("", 0);
                } else if(this.status===400){
                    that.setState({
                        signupErrorMsg:
                        "This contact number is already registered! Try other contact number."
                     });
                }
            }
        });
        xhrSignup.open("POST", this.baseUrl+"/customer/signup");
        xhrSignup.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhrSignup.send(JSON.stringify(signupData));
    }

    //Function to all login API end point
    callLoginApi = () => {
        let xhrLogin = new XMLHttpRequest();
        let that1 = this;

        let loginEncoded = window.btoa(this.state.logincontactno+":"+this.state.loginpassword);
        xhrLogin.addEventListener("readystatechange", function(){
            if(this.readyState===4){
                var data = JSON.parse(this.responseText);
                if(this.status===200){
                    that1.setState({
                        open: true,
                        successMessage: "Logged in successfully!",
                        username: data.first_name
                    });
                    sessionStorage.setItem("access-token", this.getResponseHeader("access-token"));
                    sessionStorage.setItem("username", data.first_name);
                    that1.closeModalHandler();
                } else if (this.status === 401){
                   that1.setState({loginErrorMsg:data.message});
                }
            }
        });
        xhrLogin.open("POST", this.baseUrl+"/customer/login");
        xhrLogin.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrLogin.setRequestHeader("authorization", "Basic "+loginEncoded);
        xhrLogin.send();    
    }

    //Function to call Logout API end point
    callLogoutApi = () => {
        let xhrLogout = new XMLHttpRequest();
        let that = this;

        xhrLogout.addEventListener("readystatechange", function(){
            if(this.readyState===4){
                var data = JSON.parse(this.responseText);
                if(this.status===200){
                    sessionStorage.removeItem("access-token");
                    sessionStorage.removeItem("username");
                    that.setState({redirectToHome: true})
                } else if (this.status===401){
                    that.setState({loginErrorMsg:data.message});
                }
           }
        });
        xhrLogout.open("POST", this.baseUrl + "customer/logout");
        xhrLogout.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhrLogout.setRequestHeader("authorization", "Bearer "+sessionStorage.getItem("access-token"));
        xhrLogout.send();
    }

    //function to handle the changes in contact no. field on log in form/tab
    inputloginContactnoChangeHandler = (e) => {
        this.setState({ logincontactno: e.target.value });
    }

    //function to handle the changes in password field on log in form/tab
    inputloginPasswordChangeHandler = (e) => {
        this.setState({ loginpassword: e.target.value });
    }

    //function to handle the changes in first name field on signup in form/tab
    inputFirstnameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    //function to handle the changes in last name field on signup in form/tab
    inputLastnameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    //function to handle the changes in email field on signup in form/tab
    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    //function to handle the changes in password field on signup in form/tab
    inputSignupPasswordChangeHandler = (e) => {
        this.setState({ signupPassword: e.target.value });
    }

    //function to handle the changes in contact no. field on signup in form/tab
    inputsignupcontactnoChangeHandler = (e) => {
        this.setState({ signupcontactno: e.target.value });
    }

    //This function handles close event on snackbar
    snackbarClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        }
        this.setState({open:false});
    }

    //Function opens the menu item list on onClick event on login buttion
    openMenuItemsHandler = event => {
        this.setState({
          showUserProfileDropDown: true
        });
        this.setState({ anchorEl: event.currentTarget });
      };
    
      //Function closes the menu item list
      closeMenuItemsHandler = () => {
        this.setState({
          showUserProfileDropDown: false
        });
        this.setState({ anchorEl: null });
      };
    
      //sending history information to the profile page
      openProfilePageHandler = () => {
        this.props.history.push("/profile");
        this.closeMenuItemsHandler();
       };
    
       //This function handles log out event on the logout list/tab of menulist on the login button of header
       logoutHandler = () => {
          this.closeMenuItemsHandler();
          this.setState({
            showUserProfileDropDown: false,
            username: ""
          });
        this.callLogoutApi();
      };

      //This function handles the input query typed on search box
      inputChangeHandler = e => {
          sessionStorage.removeItem("query");
          sessionStorage.setItem("query", e.target.value);
          this.setState({query:e.target.value});
          this.props.searchHandler(e.target.value);
      }

 

    render() {
        const { classes } = this.props;
        const { anchorEl} = this.state;
        return (
            //This code section implements the LOGO, Search Box and LOGIN button part of the header..the entire header implementation
            <div>
                <header className="app-header">
                <Toolbar>
                        <Grid
                            justify="space-between"
                            container
                            style={{ alignItems: "center" }}
                            spacing={10} >
                        <Grid item>
                    <div className="logo">
                        <SvgIcon className="app-logo">
                            <FastfoodIcon />
                        </SvgIcon>
                    </div>
                    </Grid>
                    {this.props.showSearchBox === true && (
                    <Grid item>
                    <div className="search-box">
                        <Input
                            className={classes.searchBox}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start" className="search">
                                    <SvgIcon>
                                        <SearchIcon />
                                    </SvgIcon>
                                </InputAdornment>
                            }
                            onChange={this.inputChangeHandler}
                            placeholder="Search by Restaurant Name"
                        />
                    </div>
                    </Grid>
                    )}
                    <Grid item>
                    <div className="login-button">
                        {sessionStorage.getItem("username")!== null && (
                            <Button 
                                 onClick={this.openMenuItemsHandler}
                                 className={classes.loggedUserButton}
                                 aria-owns={anchorEl ? "simple-menu" : undefined}
                                 aria-haspopup="true">
                                <SvgIcon>
                                    <AccountCircleIcon/>
                                </SvgIcon>
                                <span className="login-spacing">{sessionStorage.getItem("username")} </span>
                            </Button>
                        )}
                        {sessionStorage.getItem("username") === null && (
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            <SvgIcon>
                                <AccountCircleIcon />
                            </SvgIcon>
                            <span className="login-spacing">LOGIN</span>
                        </Button>
                        )}
                            {this.state.showUserProfileDropDown ? (
                                <Menu
                                    className={classes.menuItems}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={this.closeMenuItemsHandler}
                                >
                                    <Link to={"/profile"}>
                                    <MenuItem onClick={this.closeMenuItemsHandler}>
                                        My Profile
                                    </MenuItem>
                                    </Link>
                                    <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
                                </Menu>
                                ) : null}
                    </div>
                    </Grid>
                    </Grid>
                    </Toolbar>
                </header>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Signup" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="logincontactno">Contact No</InputLabel>
                                <Input 
                                    id="logincontactno" 
                                    type="text" 
                                    logincontactno={this.state.logincontactno} 
                                    onChange={this.inputloginContactnoChangeHandler} 
                                    defaultValue={this.state.logincontactno}/>
                                <FormHelperText className={this.state.logincontactnoRequired}>
                                {this.state.validLoginContactNo === true ? <span className="red">Required</span> :
                                    <span className="red">Invalid Contact</span>}
                                    </FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="loginpassword">Password</InputLabel>
                                <Input 
                                    id="loginpassword" 
                                    type="password" 
                                    loginpassword={this.state.loginpassword} 
                                    defaultValue={this.state.loginpassword}
                                    onChange={this.inputloginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginpasswordRequired}><span className="red">Required</span></FormHelperText>
                            </FormControl><br />
                               <br />
                               {(this.state.loginErrorMsg===undefined || this.state.loginErrorMsg===null || this.state.loginErrorMsg==="") ? null 
                           : (<div className="error-msg">{this.state.loginErrorMsg}</div>)} <br/><br/>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input 
                                    id="firstname" 
                                    type="text" 
                                    firstname={this.state.firstname}
                                    defaultValue={this.state.firstname} 
                                    onChange={this.inputFirstnameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}><span className="red">Required</span></FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input 
                                    id="lastname" 
                                    type="text" 
                                    lastname={this.state.lastname} 
                                    defaultValue={this.state.lastname}
                                    onChange={this.inputLastnameChangeHandler} />
                            </FormControl>
                            <br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input 
                                    id="email" 
                                    type="text" 
                                    email={this.state.email} 
                                    defaultValue={this.state.email}
                                    onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    {this.state.validEmail === true ? <span className="red">Required</span> :
                                        <span className="red">Invalid Email</span>}
                                </FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="signupPassword">Password</InputLabel>
                                <Input 
                                    id="signupPassword" 
                                    type="password" 
                                    signupPassword={this.state.signupPassword}
                                    defaultValue={this.state.signupPassword} 
                                    onChange={this.inputSignupPasswordChangeHandler} />
                                <FormHelperText className={this.state.signupPasswordRequired}>
                                    {this.state.validPassword === true ? <span className="red">Required</span> :
                                        <span className="red">Password must contain at least one capital letter, one small letter, one number, and
                                         one special character</span>}
                                </FormHelperText>
                            </FormControl><br /><br />
                            <FormControl required className={classes.formControl}>
                                <InputLabel htmlFor="signupcontactno">Contact No</InputLabel>
                                <Input 
                                    id="signupcontactno" 
                                    type="text" 
                                    signupcontactno={this.state.signupcontactno} 
                                    defaultValue={this.state.signupcontactno}
                                    onChange={this.inputsignupcontactnoChangeHandler} />
                                <FormHelperText className={this.state.signupcontactnoRequired}>
                                   {this.state.validContactNo === true ? <span className="red">Required</span> :
                                   <span className="red">Contact No. must contain only numbers and must be 
                                   10 digits long</span>}
                                   </FormHelperText>
                            </FormControl><br /><br/>
                           {(this.state.signupErrorMsg===undefined || this.state.signupErrorMsg===null || this.state.signupErrorMsg==="") ? null 
                           : (<div className="error-msg">{this.state.signupErrorMsg}</div>)} <br/><br/>
                            <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                        </TabContainer>}
                </Modal>
                <Snackbar
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                    }}
                    open={this.state.open}
                    onClose={this.snackbarClose}
                    autoHideDuration={5000}
                    ContentProps={{
                        "aria-describedby":"message-id"
                    }}
                    message={<span id="message-id">{this.state.successMessage}</span>}
                    />
                     {this.state.redirectToHome &&<Redirect to='/'></Redirect>}
            </div>
        )
    }
}

export default withStyles(styles)(Header);