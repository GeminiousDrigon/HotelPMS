import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PaymentIcon from "@material-ui/icons/Payment";

export default class ViewBooking extends Component {
    render() {
        return (
            <div style={{ margin: "10px", fontFamily: "Arial" }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="h5">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <AccountCircleIcon /> Guest Information
                            </div>
                        </Typography>

                        <Paper
                            style={{
                                backgroundColor: "#E0E0E0"
                            }}
                        >
                            <div
                                style={{
                                    margin: "10px"
                                }}
                            >
                                <Grid item xs={12}>
                                    <div>
                                        <Typography
                                            style={{ fontSize: "30px" }}
                                            gutterBottom
                                        >
                                            Full Name
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography>
                                            davega12.dv@gmail.com
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography gutterBottom>
                                            +639361180320
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography gutterBottom>
                                            Clarin, Bohol
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" gutterBottom>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <LocalOfferIcon />
                                Pricing
                            </div>
                        </Typography>
                        <Paper>
                            <List
                                component="nav"
                                aria-label="secondary mailbox folders"
                            >
                                <ListItem button>
                                    <ListItemText>
                                        01. Double Room <i>(1 Guest)</i> P200.00
                                    </ListItemText>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText>
                                        02. Double Room <i>(1 Guest)</i> P200.00
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <EventAvailableIcon />
                                Reservation
                            </div>
                        </Typography>
                        <Paper>
                            <div
                                style={{
                                    marginLeft: "10px"
                                }}
                            >
                                <br />
                                <Grid item xs={12}>
                                    <div>
                                        <Typography>Arrival</Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography gutterBottom>
                                            Checked in
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography gutterBottom>
                                            Checked Out
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        ></Typography>
                                    </div>
                                </Grid>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <PaymentIcon /> Payment
                            </div>
                        </Typography>
                        <Paper>
                            <div style={{ margin: "0 5px 0 5px" }}>
                                <Typography>Paid</Typography>
                                <Divider />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <Typography variant="h6">
                                        Total Due: P400.00
                                    </Typography>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
