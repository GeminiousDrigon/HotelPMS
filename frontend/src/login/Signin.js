import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

export default class Signin extends Component {
    render() {
        return (
            <div>
                <div>
                    <img
                        src="img/logo1.jpg"
                        style={{
                            width: "30%",
                            marginLeft: "35%",
                            marginTop: "5%"
                        }}
                    ></img>
                </div>

                <Paper
                    style={{
                        width: "30%",
                        margin: "auto",
                        backgroundColor: "#DCDCDC",
                        height: "250px"
                    }}
                >
                    <div
                        style={{
                            width: "80%",
                            margin: "auto",
                            paddingTop: "30px"
                        }}
                    >
                        <TextField
                            style={{
                                width: "100%"
                            }}
                            id="Gmail"
                            placeholder="Username"
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
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <br></br>
                    <div
                        style={{
                            float: "right",
                            marginRight: "10%"
                        }}
                    >
                        <a href="">
                            <i>Forgot Password?</i>
                        </a>
                    </div>
                    <br></br>

                    <div style={{ margin: "5% 5% 5% 10%" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: "#1093bd",
                                color: "white",
                                width: "95%"
                            }}
                            onClick={this.onAddRoomType}
                        >
                            LOGIN
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}
