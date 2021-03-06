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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class Pending extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <div>
                    <h3
                        style={{
                            width: "100%",
                            backgroundColor: "yellow",
                            height: "50px",
                            marginTop: "-5px",
                            paddingTop: "11px",
                            paddingLeft: "20px",
                            float: "left"
                        }}
                    >
                        Reservations / Pending
                    </h3>
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
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Gmail</TableCell>
                                <TableCell align="left">Password</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="left">Dominic Vega</TableCell>
                            <TableCell align="left">
                                davega12.dv@gmail.com
                            </TableCell>
                            <TableCell align="left">
                                e1sknfd123jksfj423
                            </TableCell>
                            <TableCell align="left">
                                <Fab
                                    style={{ marginRight: "10px" }}
                                    size="small"
                                    aria-label="add"
                                >
                                    <EditIcon />
                                </Fab>
                                <Fab
                                    size="small"
                                    aria-label="delete"
                                    color="secondary"
                                >
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                        </TableBody>
                    </Table>
                    <Fab
                        style={{
                            float: "right",
                            marginTop: "250px",
                            marginRight: "80px"
                        }}
                        size="large"
                        color="primary"
                        aria-label="add"
                        href="/AddAccount"
                    >
                        <AddIcon />
                    </Fab>
                </div>
            </AdminLayout>
        );
    }
}
