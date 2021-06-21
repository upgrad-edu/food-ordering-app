import React, { Component } from 'react';

//importing Header
import Header from '../../common/header/Header';

//importing the css file of the Profile page
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <Header showSearchBox={false} />
                {/* displays only the text Profile Page */}
                <div className="page-title">
                    <h1 className="text">Profile Page</h1>
                </div>
            </div>
        )
    }
}

export default Profile;