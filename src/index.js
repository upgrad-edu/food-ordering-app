import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import serviceWorker from "./serviceWorker";
import Controller from "./screens/Controller";

ReactDOM.render(<Controller />, document.getElementById("root"));
serviceWorker();
