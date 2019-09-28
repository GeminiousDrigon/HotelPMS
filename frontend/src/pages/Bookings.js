import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import Reservation from "./Reservation";
import Checkins from "./Checkins";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function Bookings(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      props.history.push(newValue);
    };
    return (
        <AdminLayout {...props} style={{ padding: "60px 0 0" }}>
            <AppBar position="static">
                <Tabs value={props.location.pathname} onChange={handleChange} aria-label="simple tabs example">
                    <Tab value="/bookings/reservations" label="Reservations" {...a11yProps(0)} />
                    <Tab value="/bookings/check-ins" label="Checked-ins" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <Switch>
                <Route path="/bookings/reservations" component={Reservation} exact />
                <Route path="/bookings/check-ins" component={Checkins} exact />
                <Redirect to="/bookings/reservations" />
            </Switch>
        </AdminLayout>
    );
}
