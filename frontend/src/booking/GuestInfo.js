import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Paper } from "react-md";
import DatePicker from "../components/DatePicker";

export default class GuestInfo extends Component {
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <p style={{ fontSize: "25px" }}>Personal Information</p>
                <table border="0" width="70%">
                    <tr>
                        <td>Name</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="firstname"
                                placeholder="First Name"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                                required
                            />
                        </td>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="lastname"
                                placeholder="Last Name"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Birthdate</td>
                        <td>Nationality</td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="birthdate"
                                placeholder="yyyy-mm-dd"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="nationality"
                                placeholder=""
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Gmail</td>
                        <td>Re-type Gmail</td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="gmail"
                                placeholder="@gmail.com"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="regmail"
                                placeholder="@gmail.com"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Contact No.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                                style={{ width: "90%" }}
                                id="contact"
                                placeholder="+63-901-2345678"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <TextField
                                style={{ width: "95%" }}
                                id="contact"
                                placeholder="Location"
                                variant="filled"
                                margin="dense"
                                hiddenLabel
                            />
                        </td>
                    </tr>
                </table>
                <div>
                    <Paper
                        style={{
                            width: "20%",
                            backgroundColor: "#DCDCDC",
                            float: "right",
                            marginRight: "9%",
                            marginTop: "-35%"
                        }}
                    >
                        <label
                            style={{
                                margin: "10px",
                                fontSize: "25px"
                            }}
                        >
                            Booking Summary
                        </label>
                        <DatePicker />
                        <label
                            style={{
                                margin: "10px",
                                fontSize: "25px"
                            }}
                        >
                            Charges Summary
                        </label>
                        <TextField
                            style={{ margin: "10px", width: "92%" }}
                            id="contact"
                            value="Room Charge"
                            margin="dense"
                            hiddenLabel
                            disabled
                        />
                        <Button
                            style={{
                                width: "92%",
                                margin: "10px",
                                backgroundColor: "yellow"
                            }}
                            variant="outlined"
                        >
                            Details
                        </Button>
                    </Paper>
                </div>
            </div>
        );
    }
}
