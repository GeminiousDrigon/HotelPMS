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
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class Account extends Component {
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
                        <h1>Account(s)</h1>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Gmail</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">Dominic Vega</TableCell>
                                <TableCell align="left">
                                    davega12.dv@gmail.com
                                </TableCell>
                                <TableCell align="left">
                                    e1sknfd123jksfj423
                                </TableCell>
                                <TableCell align="left" color="primary">
                                    ordinary
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        style={{ marginRight: "10px" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onAddRoomType}
                                    >
                                        Set Admin
                                    </Button>
                                    <Fab
                                        style={{ marginRight: "10px" }}
                                        size="small"
                                        aria-label="add"
                                        href="/AddAccount"
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
                            href="/AddAccount"
                        >
                            <AddIcon />
                        </Fab>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
