import React, { Component, Fragment } from 'react'
import Modal from 'react-modal';
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
import Fastfood from '@material-ui/icons/Fastfood'
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const classes = theme => ({
  searchInput: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white"
    }
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

  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      tabsValue: 0,
      contactNumber: "",
      contactNumberError: false,
      passwordI: "",
      passwordError: false
    }
  }

  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
  }

  loginButtonClickHandler = () => {
    this.setState({ isModalOpen: true });
  }

  tabsChangeHandler = (event, value) => {
    this.setState({ tabsValue: value });
  }

  contactNumberInputHandler = (event) => {
    this.setState({ contactNumber: event.target.value })
  }

  passwordInputHandler = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <Fragment>
        <header className="app-header">
          <Fastfood fontSize="large" htmlColor="white"/>
          <div className="search-container">
            <Input 
              classes={{ input: classes.searchInput }}
              startAdornment={
                <InputAdornment position="start">
                  <Search htmlColor="white"/>
                </InputAdornment>
              }
              placeholder="Search by Restaurant Name"
            />
          </div>
          
          <Button variant="contained" color="default" onClick={this.loginButtonClickHandler}>
            <AccountCircle className="login-button-icon"/>
            LOGIN
          </Button>
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
                <InputLabel htmlFor="contact-number">Contact No.</InputLabel>
                <Input
                  className="input-fields"
                  type="tel"
                  value={this.state.contactNumber}
                  onChange={this.contactNumberInputHandler}/>
                <FormHelperText className={this.state.contactNumberError ? "dispBlock" : "dispNone"}>
                  <span className='red'>required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  className="input-fields"
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordInputHandler} />
                <FormHelperText className={this.state.passwordError ? "dispBlock" : "dispNone"}>
                  <span className='red'>required</span>
                </FormHelperText>
              </FormControl>
              <br/>
              <br/>
              <br/>
              <Button variant="contained" color="primary">
                LOGIN
              </Button>
            </div>
          }
        </Modal>
      </Fragment>
    )
  }
}

export default withStyles(classes)(Header)