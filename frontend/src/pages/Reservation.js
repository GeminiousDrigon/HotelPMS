import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            reservations: []
        };
    }

    componentDidMount() {
        this.getReservedBookings();
    }

    getReservedBookings = async () => {
        try {
            let { data } = await axios.get("/api/booking?status=RESERVED");
            console.log(data);
            this.setState({ fetching: false, reservations: data });
        } catch (err) {
            console.log(err);
            this.setState({ fetching: false });
        }
    };

    render() {
        return (
            <AdminLayout {...this.props}>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Paper style={{ backgroundColor: "white", padding: 20 }}>
                        <Typography variant="h5">Reservation(s)</Typography>
                        {/* <Button href="/reservation" variant="contained" style={{ backgroundColor: "blue", color: "white" }}>
                            Pending
                        </Button>
                        <Button
                            href="/checkIn"
                            variant="contained"
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "orange",
                                color: "white"
                            }}
                        >
                            Check-in
                        </Button>
                        <Button
                            href="/checkOut"
                            variant="contained"
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "red",
                                color: "white"
                            }}
                        >
                            Check-out
                        </Button> */}
                        {this.state.fetching ? (
                            <div style={{ width: "100%", textAlign: "center", padding: "50px 0" }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Room</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Contact No</TableCell>
                                        <TableCell align="left">Reserve Date</TableCell>
                                        <TableCell align="left">Number of Guest</TableCell>
                                        <TableCell align="left">With Breakfast</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.reservations.map((reservation, i, array) => {
                                        const { user, room_type, room } = reservation;
                                        return (
                                            <TableRow>
                                                <TableCell align="left">{`${user.firstname} ${user.middlename[0]}. ${user.lastname}`}</TableCell>
                                                <TableCell align="left">{room_type.name}</TableCell>
                                                <TableCell align="left">{user.email}</TableCell>
                                                <TableCell align="left">{user.contactno}</TableCell>
                                                <TableCell align="left">
                                                    {moment(reservation.from_date).format("MMMM DD, YYYY") +
                                                        "-" +
                                                        moment(reservation.to_date).format("MMMM DD, YYYY")}
                                                </TableCell>
                                                <TableCell align="left" style={{ color: "blue" }}>
                                                    {reservation.guest_no}
                                                </TableCell>
                                                <TableCell align="left" style={{ color: "blue" }}>
                                                    {reservation.with_breakfast ? "Yes" : "No"}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Button href="/pending" variant="contained" style={{ backgroundColor: "green" }} color="primary">
                                                        Check-in
                                                    </Button>
                                                    <Fab size="small" aria-label="delete" color="secondary" style={{ marginLeft: "10px" }}>
                                                        <DeleteIcon />
                                                    </Fab>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
