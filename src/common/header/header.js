import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgIcon from '@material-ui/core/SvgIcon';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {withStyles} from '@material-ui/core';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';



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

const TabContainer = function(props){
    return(
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}



class Header extends Component {
    constructor()
    {
        super();
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
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen:true,
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

    closeModalHandler = () => {
        this.setState({modalIsOpen:false})
    }

    tabChangeHandler = (event, value) => {
        this.setState({value})
    }

    loginClickHandler = () => {
        this.state.logincontactno === "" ? this.setState({logincontactnoRequired: "dispBlock"}) :
         this.setState({logincontactnoRequired: "dispNone"});
         this.state.loginpassword === "" ? this.setState({loginpasswordRequired: "dispBlock"}) :
         this.setState({loginpasswordRequired: "dispNone"});
    }

    signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({firstnameRequired: "dispBlock"}) :
        this.setState({firstnameRequired: "dispNone"});
        this.state.email === "" ? this.setState({emailRequired: "dispBlock"}) :
        this.setState({emailRequired: "dispNone"});
        this.state.signupPassword === "" ? this.setState({signupPasswordRequired: "dispBlock"}) :
        this.setState({signupPasswordRequired: "dispNone"});
        this.state.signupcontactno === "" ? this.setState({signupcontactnoRequired: "dispBlock"}) :
        this.setState({signupcontactnoRequired: "dispNone"});
    }

    inputloginContactnoChangeHandler = (e) => {
        this.setState({logincontactno: e.target.value});
    }

    inputloginPasswordChangeHandler = (e) => {
        this.setState({loginpassword: e.target.value});
    }

    inputFirstnameChangeHandler = (e) => {
        this.setState({firstname: e.target.value});
    }

    inputLastnameChangeHandler = (e) => {
        this.setState({lastname: e.target.value});
    }

    inputEmailChangeHandler = (e) => {
        this.setState({email: e.target.value})
    }

    inputSignupPasswordChangeHandler = (e) => {
        this.setState({signupPassword: e.target.value});
    }

    inputsignupcontactnoChangeHandler = (e) => {
        this.setState({signupcontactno: e.target.value});
    }


    render() {
        const {classes} = this.props;
            return (
                //This code section implements the LOGO and LOGIN button part of the header
            <div>
                <header className="app-header">
                    <div className="logo">
                        <SvgIcon className="app-logo">
                            <FastfoodIcon/>
                        </SvgIcon>
                    </div>
                    <div className="search-box">
                        <Input
                            className={classes.searchBox}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start" className="search">
                                    <SvgIcon>
                                         <SearchIcon/>
                                    </SvgIcon>
                                </InputAdornment>
                            }
                            placeholder="Search by Restaurant Name"

                        />
                    </div>
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            <SvgIcon>
                                <AccountCircleIcon />
                            </SvgIcon>
                            <span className="login-spacing">LOGIN</span>
                        </Button>
                    </div>
                </header>
                <Modal 
                    ariaHideApp={false}  
                    isOpen={this.state.modalIsOpen} 
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                  <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                      <Tab label="Login"/>
                      <Tab label="Signup"/>
                  </Tabs>
                  {this.state.value === 0 &&
                  <TabContainer>
                      <FormControl required className={classes.formControl}>
                          <InputLabel htmlFor="logincontactno">Contact No</InputLabel>
                          <Input id="logincontactno" type="text" logincontactno={this.state.logincontactno} onChange={this.inputloginContactnoChangeHandler}/>
                          <FormHelperText className={this.state.logincontactnoRequired}><span className="red">Required</span></FormHelperText>
                      </FormControl><br/><br/>
                      <FormControl required className={classes.formControl}>
                          <InputLabel htmlFor="loginpassword">Password</InputLabel>
                          <Input id="loginpassword" type="password" loginpassword={this.state.loginpassword} onChange= {this.inputloginPasswordChangeHandler}/>
                          <FormHelperText className={this.state.loginpasswordRequired}><span className="red">Required</span></FormHelperText>
                      </FormControl><br/>
                      <br/><br/>
                      <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                  </TabContainer>}
                  {this.state.value === 1 &&
                <TabContainer>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="firstname">First Name</InputLabel>
                        <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstnameChangeHandler}/>
                        <FormHelperText className={this.state.firstnameRequired}><span className="red">Required</span></FormHelperText>
                    </FormControl><br/><br/>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="lastname">Last Name</InputLabel>
                        <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastnameChangeHandler}/>
                    </FormControl><br/><br/>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler}/>
                        <FormHelperText className={this.state.emailRequired}><span className="red">Required</span></FormHelperText>
                    </FormControl><br/><br/>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="signupPassword">Password</InputLabel>
                        <Input id="signupPassword" type="password" signupPassword={this.state.signupPassword} onChange={this.inputSignupPasswordChangeHandler}/>
                        <FormHelperText className={this.state.signupPasswordRequired}><span className="red">Required</span></FormHelperText>
                    </FormControl><br/><br/>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="signupcontactno">Contact No</InputLabel>
                        <Input id="signupcontactno" type="text" signupcontactno={this.state.signupcontactno} onChange={this.inputsignupcontactnoChangeHandler}/>
                        <FormHelperText className={this.state.signupcontactnoRequired}><span className="red">Required</span></FormHelperText>
                    </FormControl><br/><br/><br/>
                    <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);