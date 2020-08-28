import React, { Component } from 'react'
import './Header.css'
import Fastfood from '@material-ui/icons/Fastfood'

class Header extends Component {

  render() {
    return (
      <header className="app-header">
        <div className="app-logo">
          <Fastfood fontSize="large" htmlColor="white"/>
        </div>
      </header>
    )
  }
}

export default Header