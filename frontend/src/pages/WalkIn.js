import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../components/DatePicker";

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
                    Walk-in
                </h3>
                <div style={{ marginLeft: "20px" }}>
                    <DatePicker />
                    <TextField
                        id="outlined-with-placeholder"
                        label="First Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "25%" }}
                    />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Last Name"
                        placeholder="Placeholder"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "25%", marginLeft: "20px" }}
                    />
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Gmail"
                        placeholder="Gmail"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "51.7%" }}
                    />
                    <TextField
                        style={{ marginLeft: 20 }}
                        id="outlined-with-placeholder"
                        label="Contact Number"
                        placeholder="Contact Number"
                        margin="normal"
                        variant="outlined"
                    />
                </div>
            </AdminLayout>
        );
    }
}
