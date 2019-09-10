import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import _ from "lodash";
import queryString from "query-string";

//pages
import Test from "./pages/Test";
import Component from "./pages/Component";
import Walkin from "./pages/WalkIn";
import Report from "./pages/Report";

import Reservation from "./pages/Reservation";
import Pending from "./pages/Pending";
import CheckIn from "./pages/CheckIn";

import Room from "./pages/Room";
import AddRoom from "./pages/AddRoom";

import Account from "./pages/Account";
import AddAccount from "./pages/AddAccount";

import RoomFacilities from "./pages/RoomFacilities";
import AddFacilities from "./pages/AddFacilities";

//booking
import Booking from "./booking/Booking";
import RoomInfo from "./booking/RoomInfo";
import GuestInfo from "./booking/GuestInfo";
import Confirmation from "./booking/Confirmation";

//Login
import Signin from "./login/Signin";

import "./App.css";
import ViewRoom from "./pages/ViewRoom";
import RoomType from "./pages/RoomType";
import Property from "./pages/Property";
import AddRoomType from "./pages/AddRoomType";
import ViewRoomType from "./pages/ViewRoomType";

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
                {/* Admin */}
                <Route path="/" component={Component} exact />
                <Route path="/Test" component={Test} exact />
                <Route path="/reports" component={Report} exact />
                <Route path="/walkin" component={Walkin} exact />
                <Route path="/reservation" component={Reservation} exact />
                <Route path="/pending" component={Pending} exact />
                <Route path="/checkIn" component={CheckIn} exact />
                <Route path="/property" component={Property} />
                <Route path="/room/:id/edit" component={AddRoom} exact />
                <Route path="/room/:id/view" component={ViewRoom} exact />
                <Route path="/room/add" component={AddRoom} exact />
                <Route
                    path="/roomtype/:id/view"
                    component={ViewRoomType}
                    exact
                />
                <Route path="/roomtype/add" component={AddRoomType} exact />
                <Route
                    path="/roomtype/:id/edit"
                    component={AddRoomType}
                    exact
                />
                <Route
                    path="/roomfacilities"
                    component={RoomFacilities}
                    exact
                />
                <Route
                    path="/roomfacilities/:id"
                    component={AddFacilities}
                    exact
                />
                <Route path="/addfacilities" component={AddFacilities} exact />
                <Route path="/account" component={Account} exact />
                <Route path="/addaccount" component={AddAccount} exact />
                {/* Booking */}
                <Route path="/booking" component={Booking} exact />
                <Route path="/roominfo" component={RoomInfo} exact />
                <Route path="/guestinfo" component={GuestInfo} exact />
                <Route path="/confirmation" component={Confirmation} exact />
                {/* Log-in */}
                <Route path="/sign-in" component={Signin} exact />
            </Switch>
        </Router>
    );
}

export default App;
