import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default class Report extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={2}>
                            <Paper>xs=6 sm=3</Paper>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>

                        <Grid item xs={6} sm={2}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={8}>
                            <Paper>xs=6 sm=3</Paper>
                        </Grid>
                    </Grid>
                </div>
            </AdminLayout>
        );
    }
}
