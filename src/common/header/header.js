import React, { Component } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgIcon from '@material-ui/core/SvgIcon';


class Header extends Component {
    render() {
            return (
                //This code section implements the LOGIN button part of the header
            <div>
                <header className="app-header">
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

export default Header;