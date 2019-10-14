import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import axios from "axios";

export default class Reservation extends Component {
    constructor(props) {
        super(props);

        let checkInDate = moment(props.checkInDate);
        let checkOutDate = moment(props.checkOutDate);
        let diff = checkOutDate.diff(checkInDate, "day");
        this.state = {
            initialCheckInDate: props.checkInDate,
            checkInDate: props.checkInDate,
            checkOutDate: props.checkOutDate,
            arrival: props.arrival,
            numberOfNights: diff,
            submitting: false,
            snackBar: false,
            roomException: false
        };
    }

    handleCheckinDate = date => {
        let checkInDate = moment(date);
        let checkOutDate = moment(this.state.checkOutDate);

        if (checkInDate.isSameOrAfter(checkOutDate, "days")) {
            checkOutDate = moment(date).add({ days: 1 });
            let diff = checkOutDate.diff(checkInDate, "day");
            console.log("same or after", diff);

            this.setState({
                checkInDate: moment(date),
                checkOutDate: checkOutDate
            });
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            this.setState({
                checkInDate: moment(date)
            });

            this.setState({
                checkInDate: moment(date),
                numberOfNights: diff
            });
        }
    };
    handleCheckoutDate = date => {
        let checkInDate = moment(this.state.checkInDate);
        let checkOutDate = moment(date);
        if (checkOutDate.isSameOrBefore(checkInDate, "days")) {
            this.setState({
                snackBarMessage: (
                    <span>
                        {`You can't select dates that are the `}
                        <strong style={{ color: "#f50057" }}>
                            same
                        </strong> or{" "}
                        <strong style={{ color: "#f50057" }}>before</strong> the
                        checkin date!
                    </span>
                ),
                snackBar: true
            });
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            this.setState({
                checkOutDate: moment(date),
                numberOfNights: diff
            });
        }
    };

    handleSubmit = async () => {
        try {
            this.setState({ submitting: true, roomException: false });
            let id = this.props.bookingId;
            let checkin = moment(this.state.checkInDate).format("YYYY-MM-DD");
            let checkout = moment(this.state.checkOutDate).format("YYYY-MM-DD");
            await axios.put(`/api/booking/${id}/date`, {
                checkin,
                checkout
            });
            this.setState({
                submitting: false,
                snackBar: false
            });
            this.props.getBookingDetails();
            this.props.onCloseEditReservationDates();
            this.props.openSnackBar(
                <span
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <InfoIcon style={{ marginRight: "5" }} />
                    {` Successfully Changed Dates! `}
                </span>
            );
        } catch (err) {
            this.setState({ submitting: false });
            console.log(err.response);
            if (err.response.data.code === "RoomException") {
                this.setState({ roomException: true });
            }
        }
    };

    handleCloseSnackBar = () => this.setState({ snackBar: false });

    render() {
        let {
            checkInDate,
            checkOutDate,
            submitting,
            initialCheckInDate
        } = this.state;

        return (
            <Paper style={{ padding: "15px", position: "relative" }}>
                {this.state.roomException && (
                    <Typography
                        align="center"
                        style={{ margin: "20px 0", color: "#e74c3c" }}
                    >
                        Can't change the dates to{" "}
                        {`${moment(this.state.checkInDate).format(
                            "MM/DD/YYYY"
                        )}-${moment(this.state.checkOutDate).format(
                            "MM/DD/YYYY"
                        )}`}
                        . One of the rooms might be unavailable.
                    </Typography>
                )}
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check-in"
                        format="MM/dd/yyyy"
                        value={checkInDate}
                        onChange={this.handleCheckinDate}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check-out"
                        format="MM/dd/yyyy"
                        value={checkOutDate}
                        onChange={this.handleCheckoutDate}
                        KeyboardButtonProps={{
                            "aria-label": "change date"
                        }}
                        minDate={new Date()}
                        showDisabledMonthNavigation
                    />
                    {/* <KeyboardTimePicker
                          margin="normal"
                          id="time-picker"
                          label="Time Arrival"
                          value={values.arrival}
                          // onChange={this.handleTimeArrivalChange}
                          KeyboardButtonProps={{
                              "aria-label": "change time"
                          }}
                      /> */}
                </Grid>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: 20
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        style={{ marginRight: 5 }}
                        disabled={submitting}
                        onClick={this.props.onCloseEditReservationDates}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        style={{ marginLeft: 5 }}
                        disabled={submitting}
                        onClick={this.handleSubmit}
                    >
                        Submit
                        {submitting && (
                            <CircularProgress
                                size={10}
                                style={{ marginLeft: 5 }}
                            />
                        )}
                    </Button>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.snackBar}
                    autoHideDuration={5000}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.handleCloseSnackBar}
                    message={
                        <span
                            id="message-id"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyItems: "center"
                            }}
                        >
                            <Icon color="secondary" style={{ marginRight: 10 }}>
                                warning
                            </Icon>
                            {this.state.snackBarMessage}
                        </span>
                    }
                    ClickAwayListenerProps={{ onClickAway: () => null }}
                    TransitionComponent={Slide}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleCloseSnackBar}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    ]}
                />
            </Paper>
        );
    }
}
