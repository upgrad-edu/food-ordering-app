import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FoodOrdering from './FoodOrdering';
import 'typeface-roboto';
import {BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <FoodOrdering />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
