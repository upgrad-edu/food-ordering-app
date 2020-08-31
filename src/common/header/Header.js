import React, { Component, Fragment } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './Header.css'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fastfood from '@material-ui/icons/Fastfood'
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const classes = theme => ({
  searchBarInput: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white"
    },
    color: "white"
  },
  searchBarUnderline: {
    '&:before': {
      borderBottom: '1px solid black',
    },
    '&:after': {
      borderBottom: '1px solid white',
    }
  },
  profileButton: {
    color:"#c2c2c2",
    "text-transform":"none",
    fontSize: '17px'
  }    
})

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: localStorage.getItem('access-token') !== null,
      loggedInUserName: localStorage.getItem('user-name'),
      isProfileMenuOpen: false,
      profileMenuAnchorElement: null,
      isModalOpen: false,
      tabsValue: 0,
      loginContactNumber: "",
      loginContactNumberRequiredError: false,
      loginContactNumberInvalidError: false,
      loginContactNumberUnregisteredError: false,
      loginPassword: "",
      loginPasswordRequiredError: false,
      loginPasswordMismatchError: false,
      firstName: "",
      firstNameError: false,
      lastName: "",
      email: "",
      emailError: false,
      signupPassword: "",
      signupPasswordRequiredError: false,
      signupPasswordValidationError: false,
      signupContactNumber: "",
      signupContactNumberRequiredError: false,
      signupContactNumberValidationError: false,
      signupContactNumberRegisteredError: false,
      isSnackbarVisible: false,
      snackbarMessage: ""
    }
  }

  closeModalHandler = () => {
    this.setState({ 
      isModalOpen: false,
      tabsValue: 0,
      loginContactNumber: "",
      loginContactNumberRequiredError: false,
      loginContactNumberInvalidError: false,
      loginContactNumberUnregisteredError: false,
      loginPassword: "",
      loginPasswordRequiredError: false,
      loginPasswordMismatchError: false,
      firstName: "",
      firstNameError: false,
      lastName: "",
      email: "",
      emailRequiredError: false,
      emailInvalidError: false,
      signupPassword: "",
      signupPasswordRequiredError: false,
      signupPasswordValidationError: false,
      signupContactNumber: "",
      signupContactNumberRequiredError: false,
      signupContactNumberValidationError: false,
      signupContactNumberRegisteredError: false
    });
  }

  closeProfileMenuHandler = () => {
    this.setState({
      profileMenuAnchorElement: null,
      isProfileMenuOpen: false
    })
  }

  closeSnackbarHandler = () => {
    this.setState({ 
      isSnackbarVisible: false,
      snackbarMessage: ""
    })
  }

  loginButtonClickHandler = () => {
    this.setState({ isModalOpen: true });
  }

  profileButtonClickHandler = (event) => {
    this.setState({ 
      profileMenuAnchorElement: event.currentTarget,
      isProfileMenuOpen: true
    });
  };

  tabsChangeHandler = (event, value) => {
    this.setState({ tabsValue: value });
  }

  loginContactNumberInputHandler = (event) => {
    this.setState({ loginContactNumber: event.target.value });
  }

  loginPasswordInputHandler = (event) => {
    this.setState({ loginPassword: event.target.value });
  }

  firstNameInputHandler = (event) => {
    this.setState({ firstName: event.target.value });
  }

  lastNameInputHandler = (event) => {
    this.setState({ lastName: event.target.value });
  }

  emailInputHandler = (event) => {
    this.setState({ email: event.target.value });
  }

  signupPasswordInputHandler = (event) => {
    this.setState({ signupPassword: event.target.value });
  }

  signupContactNumberInputHandler = (event) => {
    this.setState({ signupContactNumber: event.target.value });
  }

  isPasswordStrong = (password) => {
    const NUMBER_REGEX = /(?=.*[0-9]).*/;
    const LOWERCASE_REGEX = /(?=.*[a-z]).*/;
    const UPPERCASE_REGEX = /(?=.*[A-Z]).*/;
    const SPECIAL_CHARACTER_REGEX = /(?=.*[#@$%&*!^]).*/;

    if (password.length < 8) {
      return false;
    }

    if (!(NUMBER_REGEX.test(password))) {
      return false;
    }

    if (!(LOWERCASE_REGEX.test(password))) {
      return false
    }

    if (!(UPPERCASE_REGEX.test(password))) {
      return false;
    }

    if (!(SPECIAL_CHARACTER_REGEX.test(password))) {
      return false;
    }

    return true;
}

  validateSignupForm = () => {
    let isFirstNameMissing = false;
    let isEmailMissing = false;
    let isEmailInvalid = false;
    let isPasswordMissing = false;
    let isPasswordWeak = false;
    let isContactNumberMissing = false;
    let isContactNumberInvalid = false;

    const EMAIL_REGEX = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w+)+$/;
    const CONTACT_NUMBER_REGEX = /[7-9][0-9]{9}/;

    if (this.state.firstName === "") {
      isFirstNameMissing = true;
    }

    if (this.state.email === "") {
      isEmailMissing = true;
    } else if (!(EMAIL_REGEX.test(this.state.email))) {
      isEmailInvalid = true;
    }
    
    if (this.state.signupPassword === "") {
      isPasswordMissing = true;
    } else if (!(this.isPasswordStrong(this.state.signupPassword))) { 
      isPasswordWeak = true;
    }
    
    if (this.state.signupContactNumber === "") { 
      isContactNumberMissing = true;
    } else if (!(CONTACT_NUMBER_REGEX.test(this.state.signupContactNumber))) {
      isContactNumberInvalid = true;
    }

    this.setState({
        firstNameError: isFirstNameMissing,
        emailRequiredError: isEmailMissing,
        emailInvalidError: isEmailInvalid,
        signupPasswordRequiredError: isPasswordMissing,
        signupPasswordValidationError: isPasswordWeak,
        signupContactNumberRequiredError: isContactNumberMissing,
        signupContactNumberValidationError: isContactNumberInvalid,
        signupContactNumberRegisteredError: false
    })

    return (!isFirstNameMissing && !isEmailMissing && !isEmailInvalid && !isPasswordMissing && !isPasswordWeak && !isContactNumberMissing && !isContactNumberInvalid);
  }

  signupSubmitClickHandler = () => {
    if (!(this.validateSignupForm())) return;

    const url = this.props.baseUrl + "customer/signup";
    const requestBody = JSON.stringify({ 
      "contact_number": this.state.signupContactNumber,
      "email_address": this.state.email,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "password": this.state.signupPassword
    });

    fetch(url, { 
      method: 'POST',
      headers: {
        "Accept": "application/json;charset=UTF-8"
      },
      body: requestBody
    })
    .then(response => {
      if (response.status === 201) {
        this.setState({
          tabsValue: 0,
          snackbarMessage: "Registered successfully! Please login now!",
          isSnackbarVisible: true,
          firstName: "",
          firstNameError: false,
          lastName: "",
          email: "",
          emailRequiredError: false,
          emailInvalidError: false,
          signupPassword: "",
          signupPasswordRequiredError: false,
          signupPasswordValidationError: false,
          signupContactNumber: "",
          signupContactNumberRequiredError: false,
          signupContactNumberValidationError: false,
          signupContactNumberRegisteredError: false
        })
      } else if (response.status === 400) {
        const json = JSON.parse(response.body);
        if (json.code === 'SGR-001') {
          this.setState({
            signupContactNumberRegisteredError: true
          })
        }
      }
    })
    .catch(err => console.log({err}));
  }

  validateLoginForm = () => {
    let isContactNumberMissing = false;
    let isContactNumberInvalid = false;
    let isPasswordMissing = false;

    const CONTACT_NUMBER_REGEX = /[7-9][0-9]{9}/;

    if (this.state.loginContactNumber === "") {
      isContactNumberMissing = true;
    } else if (!(CONTACT_NUMBER_REGEX.test(this.state.loginContactNumber))) {
      isContactNumberInvalid = true;
    }

    if (this.state.loginPassword === "") {
      isPasswordMissing = true;
    }

    this.setState({
      loginContactNumberRequiredError: isContactNumberMissing,
      loginContactNumberInvalidError: isContactNumberInvalid,
      loginPasswordRequiredError: isPasswordMissing
    })

    return (!isContactNumberMissing && !isContactNumberInvalid && !isPasswordMissing);
}

  loginSubmitClickHandler = () => {
    if (!(this.validateLoginForm())) return;

    const url = this.props.baseUrl + "customer/login";
    const requestBody = JSON.stringify({ 
      "contact_number": this.state.loginContactNumber,
      "password": this.state.loginPassword
    });

    fetch(url, { 
      method: 'POST',
      headers: {
        "Accept": "application/json;charset=UTF-8"
      },
      body: requestBody
    })
    .then(response => {
      if (response.status === 201) {
        localStorage.setItem("access-token", response.headers.get("access-token"));
        const responseJSON = JSON.parse(response.body);
        localStorage.setItem("user-uuid", responseJSON.id);
        localStorage.setItem("user-name", responseJSON.first_name);
        this.setState({
          isUserLoggedIn: true,
          loggedInUserName: responseJSON.first_name,
          snackbarMessage: "Logged in successfully!",
          isSnackbarVisible: true,
        });
        this.closeModalHandler();
      } else if (response.status === 401) {

        let isContactNumberUnregistered = false;
        let isPasswordMismatch = false;

        const responseJSON = JSON.parse(this.responseText);
        if (responseJSON.code === 'ATH-001') { 
          isContactNumberUnregistered = true;
        } else if (responseJSON.code === 'ATH-002') {
          isPasswordMismatch = true;
        }

        this.setState({
          loginContactNumberUnregisteredError: isContactNumberUnregistered,
          loginPasswordMismatchError: isPasswordMismatch,
        })
      }
    })
    .catch(err => console.log({err}));
  }

  logoutMenuItemHandler = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-uuid");
    localStorage.removeItem("user-name");
    this.setState({
      isUserLoggedIn: false,
      loggedInUserName: null
    });
    this.closeProfileMenuHandler();
  }

  render() {
    const menuButton = ( this.state.isUserLoggedIn ? 
      <Button 
        classes={{root: this.props.classes.profileButton }}
        size="large"
        variant="text"
        onClick={this.profileButtonClickHandler} >
        <AccountCircle className="profile-button-icon" htmlColor="#c2c2c2"/>
        {this.state.loggedInUserName}
      </Button> : 
      <Button variant="contained" color="default" onClick={this.loginButtonClickHandler}>
        <AccountCircle className="login-button-icon"/>
        LOGIN
      </Button>
    );
    return (
      <Fragment>
        <header className="app-header">
          <Fastfood fontSize="large" htmlColor="white"/>
          <div className="search-container">
            <Input 
              fullWidth
              classes={{ 
                input: this.props.classes.searchBarInput,
                underline: this.props.classes.searchBarUnderline
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Search htmlColor="white"/>
                </InputAdornment>
              }
              placeholder="Search by Restaurant Name"
            />
          </div>
          { menuButton }
          <Menu 
            anchorEl={this.state.profileMenuAnchorElement}
            getContentAnchorEl={null}
            anchorOrigin={{ 
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.isProfileMenuOpen}
            onClose={this.closeProfileMenuHandler}>
            <MenuItem>
              <Link to={"/profile"}>
                My profile
              </Link>
            </MenuItem>
            <MenuItem onClick={this.logoutMenuItemHandler}>
              Logout
            </MenuItem>
          </Menu>
        </header>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.isModalOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
          style={modalStyle}>
          <Tabs
            value={this.state.tabsValue}
            onChange={this.tabsChangeHandler}>
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>
          { this.state.tabsValue === 0 &&
            <div className="modal-content">
              <br />
              <FormControl fullWidth required>
                <InputLabel>Contact No.</InputLabel>
                <Input
                  className="input-fields"
                  type="tel"
                  value={this.state.loginContactNumber}
                  onChange={this.loginContactNumberInputHandler}/>
                <FormHelperText className={this.state.loginContactNumberRequiredError ? "dispBlock" : "dispNone"}>
                  <span className='red'>required</span>
                </FormHelperText>
                <FormHelperText className={this.state.loginContactNumberInvalidError ? "dispBlock" : "dispNone"}>
                  <span className='red'>Invalid Contact Number</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth required>
                <InputLabel>Password</InputLabel>
                <Input
                  className="input-fields"
                  type="password"
                  value={this.state.loginPassword}
                  onChange={this.loginPasswordInputHandler} />
                <FormHelperText className={this.state.loginPasswordRequiredError ? "dispBlock" : "dispNone"}>
                  <span className='red'>required</span>
                </FormHelperText>
                <FormHelperText className={this.state.loginContactNumberUnregisteredError ? "dispBlock" : "dispNone"}>
                  <span className='red'>This contact number has not been registered!</span>
                </FormHelperText>
                <FormHelperText className={this.state.loginPasswordMismatchError ? "dispBlock" : "dispNone"}>
                  <span className='red'>Invalid Credentials</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <br/>
              <Button 
                variant="contained"
                color="primary"
                onClick={this.loginSubmitClickHandler}>
                LOGIN
              </Button>
            </div>
          }
          { this.state.tabsValue === 1 &&
            <div className="modal-content">
              <br />
              <FormControl fullWidth required>
                <InputLabel>First Name</InputLabel>
                <Input
                  className="input-fields"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.firstNameInputHandler} />
                <FormHelperText className={this.state.firstNameError ? "dispBlock" : "dispNone"}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <FormControl fullWidth>
                <InputLabel>Last Name</InputLabel>
                <Input 
                  className="input-fields"
                  type="text"
                  value={this.state.lastName} 
                  onChange={this.lastNameInputHandler} />
              </FormControl>
              <br/>
              <br/>
              <FormControl fullWidth required>
                <InputLabel>Email</InputLabel>
                <Input 
                  className="input-fields"
                  type="email"
                  value={this.state.email}
                  onChange={this.emailInputHandler} />
                <FormHelperText className={this.state.emailRequiredError ? "dispBlock" : "dispNone"}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.emailInvalidError ? "dispBlock" : "dispNone"}>
                  <span className="red">Invalid Email</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <FormControl fullWidth required>
                <InputLabel>Password</InputLabel>
                <Input
                  className="input-fields"
                  type="password"
                  value={this.state.signupPassword}
                  onChange={this.signupPasswordInputHandler} />
                <FormHelperText className={this.state.signupPasswordRequiredError ? "dispBlock" : "dispNone"}>
                    <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.signupPasswordValidationError ? "dispBlock" : "dispNone"}>
                  <span className="red">Password must contain at least one capital letter, one small letter, one number, and one special character</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <FormControl fullWidth required>
                <InputLabel>Contact No.</InputLabel>
                <Input 
                  className="input-fields"
                  value={this.state.signupContactNumber}
                  onChange={this.signupContactNumberInputHandler} />
                <FormHelperText className={this.state.signupContactNumberRequiredError ? "dispBlock" : "dispNone"}>
                  <span className="red">required</span>
                </FormHelperText>
                <FormHelperText className={this.state.signupContactNumberValidationError ? "dispBlock" : "dispNone"}>
                  <span className="red">Contact No. must contain only numbers and must be 10 digits long</span>
                </FormHelperText>
                <FormHelperText className={this.state.signupContactNumberRegisteredError ? "dispBlock" : "dispNone"}>
                  <span className="red">This contact number is already registered! Try other contact number.</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <br/>
              <Button 
                variant="contained" 
                color="primary"
                onClick={this.signupSubmitClickHandler}>
                SIGNUP
              </Button>
            </div>
          }
        </Modal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isSnackbarVisible}
          autoHideDuration={4000}
          onClose={this.closeSnackbarHandler}
          message={<span>{this.state.snackbarMessage}</span>} />
      </Fragment>
    )
  }
}

export default withStyles(classes)(Header)