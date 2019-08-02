import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import _ from "lodash";
import queryString from "query-string";
import Test from "./pages/Test";

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
                <Route path="/" component={Test} exact />
            </Switch>
        </Router>
    );
}

export default App;
