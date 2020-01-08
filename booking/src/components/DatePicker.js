import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import DateFnsUtils from "@date-io/date-fns";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { Paper, Typography } from "@material-ui/core";
import moment from "moment";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackBar: false
    };
  }

  // The first commit of Material-UI
  handleCheckinDate = date => {
    let checkInDate = moment(date);
    let checkOutDate = moment(this.props.values.checkOutDate);

    if (checkInDate.isSameOrAfter(checkOutDate, "days")) {
      checkOutDate = moment(date).add({ days: 1 });
      let diff = checkOutDate.diff(checkInDate, "day");
      console.log("same or after", diff);

      this.props.setFieldValue("checkInDate", moment(date));
      this.props.setFieldValue("checkOutDate", checkOutDate);
    } else {
      let diff = checkOutDate.diff(checkInDate, "day");
      this.props.setFieldValue("checkInDate", moment(date));
      this.props.setFieldValue("numberOfNights", diff);
    }
  };
  handleCheckoutDate = date => {
    let checkInDate = moment(this.props.values.checkInDate);
    let checkOutDate = moment(date);
    if (checkOutDate.isSameOrBefore(checkInDate, "days")) {
      this.setState({
        snackBarMessage: (
          <span>
            {`You can't select dates that are the `}
            <strong style={{ color: "#f50057" }}>same</strong> or <strong style={{ color: "#f50057" }}>before</strong> the
            checkin date!
          </span>
        ),
        snackBar: true
      });
    } else {
      let diff = checkOutDate.diff(checkInDate, "day");
      this.props.setFieldValue("checkOutDate", moment(date));
      this.props.setFieldValue("numberOfNights", diff);
    }
  };

  handleTimeArrivalChange = date => {
    console.log(date);

    this.props.setFieldValue("timeArrival", moment(date));
  };

  handleCloseSnackBar = () => this.setState({ snackBar: false });

  render() {
    let selectedDate = moment();

    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;
    return (
      <div>
        <Typography variant="h5" style={{ fontFamily: "Calibri", textAlign: "center", fontWeight: "400", color: "#1093bd" }}>
          <p>
            Please select{" "}
            <font color="#c89553">
              <b>arrival</b>
            </font>{" "}
            and{" "}
            <font color="#c89553">
              <b>departure</b>
            </font>{" "}
            dates to proceed.
          </p>
        </Typography>
        <div style={{ backgroundColor: "#d8d8d8", padding: "0px 20px 0px 20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} xl={12} align="center">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="CHECK-IN"
                format="MM/dd/yyyy"
                value={values.checkInDate}
                onChange={this.handleCheckinDate}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                minDate={new Date()}
                showDisabledMonthNavigation
                style={{ marginRight: "10px" }}
              />

              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="CHECK-OUT"
                format="MM/dd/yyyy"
                value={values.checkOutDate}
                onChange={this.handleCheckoutDate}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
                minDate={new Date()}
                showDisabledMonthNavigation
                style={{ marginRight: "10px" }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="TIME ARRIVAL"
                value={values.timeArrival}
                onChange={this.handleTimeArrivalChange}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </Grid>
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
                <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleCloseSnackBar}>
                  <Icon>close</Icon>
                </IconButton>
              ]}
            />
          </Grid>
        </div>
      </div>
    );
  }
}
