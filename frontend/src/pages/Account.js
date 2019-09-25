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
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetching: true
        };
    }

    componentDidMount() {
        this.getGuestAccounts();
    }

    getGuestAccounts = async () => {
        try {
            let { data } = await axios.get("/api/user/admin");
            this.setState({ data, fetching: false });
        } catch (err) {
            this.setState({ fetching: false });
            console.log(err);
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 10
                            }}
                        >
                            <Typography variant="h5">Account(s)</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    this.props.history.push("/add/account")
                                }
                            >
                                Add Account
                            </Button>
                        </div>

                        {this.state.fetching ? (
                            <div
                                style={{
                                    display: "flex",
                                    padding: "50px 0",
                                    justifyContent: "center"
                                }}
                            >
                                <CircularProgress />
                            </div>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            Firstname
                                        </TableCell>
                                        <TableCell align="left">
                                            Middlename
                                        </TableCell>
                                        <TableCell align="left">
                                            Lastname
                                        </TableCell>
                                        <TableCell align="left">
                                            Email address
                                        </TableCell>
                                        <TableCell align="left">
                                            Contact number
                                        </TableCell>
                                        <TableCell align="left">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.data.map((el, i) => {
                                        return (
                                            <TableRow key={el.id}>
                                                <TableCell align="left">
                                                    {el.firstname}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {el.middlename}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {el.lastname}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {el.email}
                                                </TableCell>
                                                <TableCell align="left">
                                                    +63ß{el.contactno}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Fab
                                                        style={{
                                                            marginRight: "10px"
                                                        }}
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
