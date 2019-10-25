import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import moment from "moment";

export default class Confirmation extends Component {
    render() {
        let room = {
            rate: {}
        };
        let { values } = this.props;
        return (
            <>
                <Paper
                    style={{
                        padding: 25,
                        marginBottom: 25,
                        backgroundColor: "#E6E6E6"
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Guest Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Honorifics
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.honorifics}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                First name
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.firstname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Middle name
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.middlename}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Last name
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.lastname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Address
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.address}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Country
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.country}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Contact number
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                +639{values.contactno}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                style={{ fontWeight: 300 }}
                            >
                                Email address
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: 300, paddingLeft: 25 }}
                            >
                                {values.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ padding: 25, backgroundColor: "#E6E6E6" }}>
                    <Typography variant="h4" gutterBottom>
                        Booking Information
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        style={{ paddingTop: 25, paddingBottom: 25 }}
                    >
                        <Grid container justify="space-around">
                            <Grid
                                item
                                xs={12}
                                md={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    Check-in Date
                                </Typography>

                                <Typography
                                    variant="subtitle1"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    {moment(values.checkInDate).format(
                                        "MMMM D, YYYY"
                                    )}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    Arrival Time : 8:00
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    Check-out Date
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    {moment(values.checkOutDate).format(
                                        "MMMM D, YYYY"
                                    )}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    Check-out Time : 12:00 NN
                                </Typography>
                            </Grid>
                            {/* <Grid
                                item
                                xs={12}
                                md={3}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    Time Arrival
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    style={{ fontWeight: 300 }}
                                    component="span"
                                >
                                    {moment(values.timeArrival).format(
                                        "hh:mm A"
                                    )}
                                </Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: 25 }}>
                        <Typography variant="h4" gutterBottom>
                            Selected Room(s)
                        </Typography>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex-start"
                        }}
                    >
                        {values.selectedRooms.map((room, i) => {
                            return (
                                <Paper
                                    style={{
                                        padding: 10,
                                        margin: 5,
                                        minWidth: 200
                                    }}
                                >
                                    <div>
                                        <Typography
                                            variant="h5"
                                            style={{ fontWeight: 300 }}
                                        >
                                            {room.name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            style={{ fontWeight: 300 }}
                                        >
                                            {room.rate.adult} Adult(s)
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            style={{ fontWeight: 300 }}
                                        >
                                            {room.rate.name}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            style={{ fontWeight: 300 }}
                                        >
                                            Price: PHP{room.rate.price}
                                        </Typography>
                                    </div>
                                </Paper>
                            );
                        })}
                    </div>
                </Paper>
            </>
        );
    }
}
