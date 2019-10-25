import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import _ from "lodash";
import queryString from "query-string";

//booking
import Booking from "./booking/Booking";


import "./App.css";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Router history={history}>
                <Switch>
                    {/* Admin */}

                    <Route path="/" component={Booking} exact />
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </MuiPickersUtilsProvider>
    );
}

export default App;
