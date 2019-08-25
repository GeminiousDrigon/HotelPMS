import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";

export default class AddRoom extends Component {
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
                        <h1 style={{ marginLeft: "35px" }}>Add Room</h1>
                        <table
                            border="0"
                            width="95%"
                            style={{ marginLeft: "35px" }}
                        >
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="Type of Room"
                                        placeholder="Type of Room"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                        required
                                    />
                                </td>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="Number of Room"
                                        placeholder="Number of Room"
                                        variant="filled"
                                        margin="dense"
                                        hiddenLabel
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <TextField
                                        style={{ width: "95%" }}
                                        id="description"
                                        placeholder="Description"
                                        multiline
                                        rows="5"
                                        margin="normal"
                                        variant="filled"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <TextField
                                        style={{ width: "90%" }}
                                        id="price"
                                        placeholder="Price"
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
