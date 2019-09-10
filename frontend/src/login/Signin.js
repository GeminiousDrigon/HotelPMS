import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default class Signin extends Component {
    render() {
        return (
            <div>
                <Paper
                    style={{
                        width: "30%",
                        margin: "auto",
                        marginTop: "10%",
                        backgroundColor: "#DCDCDC",
                        height: "250px"
                    }}
                >
                    <div
                        style={{
                            width: "80%",
                            margin: "auto",
                            paddingTop: "50px"
                        }}
                    >
                        <TextField
                            style={{
                                width: "100%"
                            }}
                            id="Gmail"
                            placeholder="Gmail"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            style={{
                                width: "100%"
                            }}
                            id="password"
                            placeholder="Password"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <br></br>
                    <div style={{ marginLeft: "60%" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onAddRoomType}
                        >
                            Sign In
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}
