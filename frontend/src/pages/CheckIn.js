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

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class CheckIn extends Component {
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
                        <h1>Reservation/ Check-in</h1>
                        <Button
                            href="/reservation"
                            variant="contained"
                            style={{ backgroundColor: "blue", color: "white" }}
                        >
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
                        </Button>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">
                                        Room Type
                                    </TableCell>
                                    <TableCell align="left">Room No</TableCell>
                                    <TableCell align="left">
                                        Check-in Days
                                    </TableCell>
                                    <TableCell align="left">
                                        Check-out
                                    </TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Bill</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="left">Dominic Vega</TableCell>
                                <TableCell align="left">Deluxe</TableCell>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">2</TableCell>
                                <TableCell align="left">
                                    August 28,2019 @ 7:00 AM
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ color: "orange" }}
                                >
                                    Check-in
                                </TableCell>
                                <TableCell align="left">1000</TableCell>
                                <TableCell align="left">
                                    <Button
                                        href="/pending"
                                        variant="contained"
                                        style={{
                                            backgroundColor: "red",
                                            marginRight: "10px"
                                        }}
                                        color="primary"
                                    >
                                        Check-out
                                    </Button>
                                    <Fab size="small" aria-label="add">
                                        <EditIcon />
                                    </Fab>
                                    <Fab
                                        size="small"
                                        aria-label="delete"
                                        color="secondary"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        <DeleteIcon />
                                    </Fab>
                                </TableCell>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
