import React from "react";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import _ from "lodash";
import queryString from "query-string";

//booking
import Booking from "./booking/Booking";
import Signin from "./login/Signin";

import "./App.css";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Home from "./pages/Home";
import requireAuthentication from "./components/auth/requireAuthentication";
import ViewBooking from "./pages/ViewBooking";

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
					<Route path="/sign-in" component={Signin} exact />
					<Route path="/home" component={requireAuthentication(Home, ["USER"])} exact />
					<Route path="/booking" component={requireAuthentication(Booking, ["USER"])} exact />
					<Route path="/bookings/view/:id" component={requireAuthentication(ViewBooking, ["USER"])} exact />
					<Redirect to="/" />
				</Switch>
			</Router>
		</MuiPickersUtilsProvider>
	);
}

export default App;
