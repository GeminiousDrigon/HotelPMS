import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default class Room extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <div>
                    <h3
                        style={{
                            width: "100%",
                            backgroundColor: "gold",
                            height: "50px",
                            marginTop: "-5px",
                            paddingTop: "10px"
                        }}
                    >
                        Rooms
                    </h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">ID</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Gmail</TableCell>
                                <TableCell align="left">Password</TableCell>
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
                        </TableBody>
                        <TableBody>
                            <TableCell align="right">2</TableCell>
                            <TableCell align="left">Junrex Dalman</TableCell>
                            <TableCell align="left">
                                junrexDalman@gmail.com
                            </TableCell>
                            <TableCell align="left">
                                429d9dsjsdj231233
                            </TableCell>
                        </TableBody>
                    </Table>
                </div>
            </AdminLayout>
        );
    }
}
