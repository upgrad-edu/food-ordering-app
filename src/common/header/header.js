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


const styles = theme => ({
    searchBox: {
        color: "#fff",
        width: "320px",
        fontSize: 15,
        "&::after": {
            borderBottom: "1px solid white"
          }
    }
});

class Header extends Component {
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
                        <Button variant="contained" color="default">
                            <SvgIcon>
                                <AccountCircleIcon />
                            </SvgIcon>
                            <span className="login-spacing">LOGIN</span>
                        </Button>
                    </div>
                </header>
            </div>
        )
    }
}

export default withStyles(styles)(Header);