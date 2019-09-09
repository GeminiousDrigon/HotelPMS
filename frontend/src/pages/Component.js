import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import AdminLayout from "../components/AdminLayout";

import moment from "moment";
import Calendar from "../components/Calendar";

export default class Component extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            //.....currentDate: "",
            currentViewName: "Day"
        };
    }

    render() {
        return (
            <AdminLayout {...this.props} style={{ padding: 0, overflow: 'unset'}}>
                <Paper style={{display: 'flex', padding: '84px 24px 24px 24px'}}>
                    <Calendar />
                </Paper>
            </AdminLayout>
        );
    }
}
