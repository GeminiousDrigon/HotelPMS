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
export default class Confirmation extends Component {
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <div>
                    <table border="0" width="40%">
                        <p style={{ fontSize: "25px" }}>Guest Details</p>
                        <tr>
                            <td width="20%">Guest Name</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Birthdate</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Nationality</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Gmail</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Contact Number</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Check-in</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Check-out</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Arrival Time</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Night(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Room(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Adult(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Children(s)</td>
                            <td width="20%">:</td>
                        </tr>
                    </table>
                </div>
                <div
                    style={{
                        float: "right",
                        marginRight: "100px",
                        width: "40%",
                        marginTop: "-32.6%"
                    }}
                >
                    <table border="0">
                        <p style={{ fontSize: "25px" }}>Charge Summary</p>
                        <tr>
                            <td width="20%">Room Charges</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Facilities</td>
                            <td>:</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}
