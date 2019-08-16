import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default class AddAccount extends Component {
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
                        Accounts/Add Account
                    </h3>
                    <TextField
                        id="outlined-with-placeholder"
                        label="First Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "25%" }}
                    />

                    <TextField
                        style={{ marginLeft: 20, width: "25%" }}
                        id="outlined-with-placeholder"
                        label="Last Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Gmail"
                        placeholder="Gmail"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "51.6%" }}
                    />
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Password"
                        placeholder="Password"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "25%" }}
                    />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        margin="normal"
                        variant="outlined"
                        style={{ marginLeft: 20, width: "25%" }}
                    />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "green" }}
                        color="primary"
                    >
                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                        <SaveIcon style={{ marginRight: "10px" }} />
                        Save
                    </Button>
                </div>
            </AdminLayout>
        );
    }
}
