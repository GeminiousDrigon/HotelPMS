import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider } from "@material-ui/core";

export default class Report extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <Typography variant="h5" style={{ marginBottom: 20 }}>
                    Reports
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #27ae60"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Reserved Rooms
                            </Typography>
                            <Typography variant="h2" component="div" style={{ display: "flex", justifyContent: "flex-end" }}>
                                &#8369;20
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #3498db"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Monthly Reservation
                            </Typography>
                            <Typography variant="h2" component="div" style={{ display: "flex", justifyContent: "flex-end" }}>
                                &#8369;20
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #e74c3c"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Monthly Income
                            </Typography>
                            <Typography variant="h2" component="div" style={{ display: "flex", justifyContent: "flex-end" }}>
                                &#8369;20
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #f1c40f"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Yearly Income
                            </Typography>
                            <Typography variant="h2" component="div" style={{ display: "flex", justifyContent: "flex-end" }}>
                                &#8369;20
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                padding: 10
                            }}
                        >
                            <Typography variant="h5" component="div" gutterBottom>
                                Room type bookings
                            </Typography>
                            <Divider />
                        </Paper>
                    </Grid>
                </Grid>
            </AdminLayout>
        );
    }
}
