import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import _ from "lodash";
import queryString from "query-string";

//pages
import Test from "./pages/Test";
import Component from "./pages/Component";
import Walkin from "./pages/WalkIn";
import Reservation from "./pages/Reservation";
import Settings from "./pages/Settings";

import Room from "./pages/Room";
import AddRoom from "./pages/AddRoom";

import Account from "./pages/Account";
import AddAccount from "./pages/AddAccount";

import RoomFacilities from "./pages/RoomFacilities";
import AddFacilities from "./pages/AddFacilities";

import "./App.css";

export const history = createBrowserHistory({
    forceRefresh: false
});

history.location = _.assign(history.location, {
    search: queryString.parse(history.location.search)
});

history.listen((location, action) => {
    location.search = queryString.parse(location.search);
});

function App() {
    return (
        <Router history={history}>
            <Switch>
                {/* add route component if you want to add another page */}
                <Route path="/Test" component={Test} exact />
                <Route path="/" component={Component} exact />
                <Route path="/walkin" component={Walkin} exact />
                <Route path="/reservation" component={Reservation} exact />
                <Route path="/room" component={Room} exact />
                <Route path="/addroom" component={AddRoom} exact />
                <Route
                    path="/roomfacilities"
                    component={RoomFacilities}
                    exact
                />
                <Route path="/addfacilities" component={AddFacilities} exact />
                <Route path="/settings" component={Settings} exact />
                <Route path="/account" component={Account} exact />
                <Route path="/addaccount" component={AddAccount} exact />
            </Switch>
        </Router>
    );
}

export default App;
