import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

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
                <div>
                    <h3 />
                    <TextField
                        id="outlined-with-placeholder"
                        label="First Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginLeft: 20 }}
                        id="outlined-with-placeholder"
                        label="Last Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="With placeholder"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        style={{ marginLeft: 20 }}
                        id="outlined-with-placeholder"
                        label="With placeholder"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </AdminLayout>
        );
    }
}
