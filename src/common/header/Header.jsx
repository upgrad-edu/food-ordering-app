import React, { Component } from 'react'
import './Header.css'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fastfood from '@material-ui/icons/Fastfood'
import Search from '@material-ui/icons/Search';

const classes = theme => ({
  searchInput: {
    color: 'white'
  },
  searchIcon: {
    height: '28px',
  }
})

class Header extends Component {

  render() {
    return (
      <header className="app-header">
        <div className="app-logo">
          <Fastfood fontSize="large" htmlColor="white"/>
        </div>
        <div className="search-container">
          <Input 
            className={classes.searchInput}
            startAdornment={
              <InputAdornment position="start">
                <Search className={classes.searchIcon} htmlColor="white"/>
              </InputAdornment>
            }
            fullWidth={true} 
            placeholder="Search by Restaurant Name"
            color="primary"
          />
        </div>
      </header>
    )
  }
}

export default withStyles(classes)(Header)