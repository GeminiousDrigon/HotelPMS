import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";

export default class RoomInfo extends Component {
    render() {
        return (
            <div>
                <BookingLayout {...this.props}>
                    <Table border="0">
                        <tr align="center">
                            <td width="20%">
                                <Fab size="medium" color="primary">
                                    <CalendarTodayOutlinedIcon />
                                </Fab>
                            </td>
                            <td width="20%">
                                <Fab size="medium" color="primary">
                                    <HotelOutlinedIcon />
                                </Fab>
                            </td>
                            <td width="20%">
                                <Fab size="medium" disabled>
                                    <PersonOutlinedIcon />
                                </Fab>
                            </td>
                            <td width="20%">
                                <Fab size="medium" disabled>
                                    <CheckOutlinedIcon />
                                </Fab>
                            </td>
                            <td />
                        </tr>
                        <tr align="center">
                            <td>
                                Check-in & <br /> Check-out Date
                            </td>
                            <td>
                                Select <br /> Rooms & Rates
                            </td>
                            <td>
                                Guest <br /> Information
                            </td>
                            <td>
                                Booking <br /> Confirmation
                            </td>
                        </tr>
                    </Table>
                </BookingLayout>
            </div>
        );
    }
}
