import React, { Component } from 'react'
import './Header.css'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
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

class Header extends Component {

  render() {
    return (
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
        
        <Button variant="contained" color="default">
          <AccountCircle className="login-button-icon"/>
          LOGIN
        </Button>
      </header>
    )
  }
}

export default withStyles(classes)(Header)