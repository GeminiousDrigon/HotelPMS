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

export default class Room extends Component {
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
                        Rooms
                    </h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Room No</TableCell>
                                <TableCell align="left">Room Type</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableCell align="right">1</TableCell>
                            <TableCell align="left">Deluxe</TableCell>
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
                            float: "right",
                            marginTop: "250px",
                            marginRight: "80px"
                        }}
                        size="large"
                        color="primary"
                        aria-label="add"
                        href="/AddRoom"
                    >
                        <AddIcon />
                    </Fab>
                </div>
            </AdminLayout>
        );
    }
}
