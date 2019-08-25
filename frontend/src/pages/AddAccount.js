import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";

export default class AddAccount extends Component {
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
                    <Paper
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            width: "70%"
                        }}
                    >
                        <h1 style={{ marginLeft: "35px" }}>
                            Account/ Add Account
                        </h1>
                        <table
                            border="0"
                            width="95%"
                            style={{ marginLeft: "35px" }}
                        >
                            <tr>
                                <td>Name</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="firstname"
                                        placeholder="First Name"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                        required
                                    />
                                </td>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="lastname"
                                        placeholder="Last Name"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Gmail</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <TextField
                                        style={{ width: "95%" }}
                                        id="birthdate"
                                        placeholder="abc@gmail.com"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>Re-type Password</td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="gmail"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="regmail"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                        </table>
                        <div
                            style={{
                                display: "flex",
                                width: "94%",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onSave}
                            >
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <SaveIcon style={{ marginRight: "10px" }} />
                                Save
                            </Button>
                        </div>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
