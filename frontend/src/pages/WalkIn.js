import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../components/DatePicker";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        margin: theme.spacing(2)
    }
}));

export default class Walkin extends Component {
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
                        <h1 style={{ marginLeft: "35px" }}>Walk-in</h1>
                        <DatePicker />
                        <table
                            border="0"
                            width="98%"
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
                                <td>Birthdate</td>
                                <td>Nationality</td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="birthdate"
                                        placeholder="yyyy-mm-dd"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="nationality"
                                        placeholder=""
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Gmail</td>
                                <td>Re-type Gmail</td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="gmail"
                                        placeholder="@gmail.com"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="regmail"
                                        placeholder="@gmail.com"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Contact No.</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="contact"
                                        placeholder="+63-901-2345678"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <TextField
                                        style={{ width: "95%" }}
                                        id="contact"
                                        placeholder="Location"
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
                                width: "100%",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                style={{ marginRight: "38px" }}
                                variant="contained"
                                color="primary"
                                onClick=""
                            >
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <SaveIcon style={{ marginRight: "20px" }} />
                                Save
                            </Button>
                        </div>
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
