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
            value: 0
        }
    }

    openModalHandler = () => {
        this.setState({modalIsOpen:true})
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen:false})
    }

    tabChangeHandler = (event, value) => {
        this.setState({value})
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
                          <InputLabel htmlFor="contactno">Contact No</InputLabel>
                          <Input id="contactno" type="text" />
                      </FormControl><br/><br/>
                      <FormControl required className={classes.formControl}>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input id="password" type="password" />
                      </FormControl><br/>
                      <br/><br/>
                      <Button variant="contained" color="primary">LOGIN</Button>
                  </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Header);