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

import axios from "axios";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class RoomFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilities: []
        };
    }

    componentDidMount() {
        this.getAllFacilities();
    }

    getAllFacilities = async () => {
        try {
            let { data } = await axios.get("/api/amenity");
            console.log(data);
            this.setState({ facilities: data });
        } catch (err) {
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
                        <h1>Facilities</h1>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Icon</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.facilities.map((data, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="left">
                                                {data.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {data.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {data.icon}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Fab
                                                    style={{
                                                        marginRight: "10px"
                                                    }}
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
                                        </TableRow>
                                    );
                                })}
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
                            href="/AddFacilities"
                        >
                            <AddIcon />
                        </Fab>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
