import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        console.log(error.response)
        if (error.response.status === 401) return Promise.reject((window.location.href = "/"));
        else return Promise.reject();
    }
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
