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
import Paper from "@material-ui/core/Paper";
export default class Room extends Component {
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
                        <h1>Room(s)</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Room No</TableCell>
                                    <TableCell align="left">
                                        Room Type
                                    </TableCell>
                                    <TableCell align="left">Photo</TableCell>
                                    <TableCell align="left">
                                        Description
                                    </TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Deluxe</TableCell>
                                <TableCell align="left">PhotoExample</TableCell>
                                <TableCell align="left">Secret</TableCell>
                                <TableCell align="left">1000</TableCell>
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
                                position: "absolute",
                                bottom: "50px",
                                right: 50
                            }}
                            size="large"
                            color="primary"
                            aria-label="add"
                            href="/AddRoom"
                        >
                            <AddIcon />
                        </Fab>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
