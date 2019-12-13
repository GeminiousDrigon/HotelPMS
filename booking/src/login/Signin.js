import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import * as yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import { GET, PUT, POST, DELETE } from "../utils/restUtils";

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateCalled: false,
            failed: false,
            logging: false,
            message: "User credentials are not valid",
            checking: true
        };
    }
    componentDidMount() {
        this.checkAccount();
    }

    onSignin = async () => {
        try {
            this.setState({ validateCalled: true, logging: true });
            await this.props.validateForm();
            if (this.props.isValid) {
                let { data } = await POST("/api/login/user", {
                    ...this.props.values
                });
                localStorage.setItem("login", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));
                this.props.history.push("/calendar");
            } else {
                this.setState({ logging: false });
            }
        } catch (err) {
            this.setState({ failed: true, logging: false });
        }
    };

    checkAccount = async () => {
        try {
            let token = localStorage.getItem("login");
            let { data } = await GET("/api/user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            this.setState({ checking: false });
            this.props.history.push("/calendar");
        } catch (err) {
            this.setState({ checking: false });
        }
    };

    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
        } = this.props;
        let { validateCalled } = this.state;
        if (this.state.checking) {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        margin: "50px 0"
                    }}
                >
                    <CircularProgress />
                </div>
            );
        } else
            return (
                <div>
                    {/* <img
                        src="img/login.jpg"
                        style={{
                            width: "1200px"
                        }}
                    ></img> */}
                    <Grid
                        container
                        spacing={3}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Grid xs={10} sm={4}>
                            <div>
                                <img
                                    src="img/logo1.jpg"
                                    style={{
                                        width: "70%",
                                        marginLeft: "15%",
                                        marginTop: "8%"
                                    }}
                                ></img>
                            </div>

                            <Paper
                                style={{
                                    height: "290px",
                                    backgroundColor: "#E6E6E6"
                                }}
                            >
                                {this.state.logging && (
                                    <LinearProgress style={{ height: 2 }} />
                                )}
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
                                        id="email"
                                        placeholder="Username"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle />
                                                </InputAdornment>
                                            )
                                        }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        helperText={
                                            (validateCalled || touched.email) &&
                                            errors.email
                                                ? errors.email
                                                : ""
                                        }
                                        error={
                                            (validateCalled || touched.email) &&
                                            errors.email
                                        }
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        helperText={
                                            (validateCalled ||
                                                touched.password) &&
                                            errors.password
                                                ? errors.password
                                                : ""
                                        }
                                        error={
                                            (validateCalled ||
                                                touched.password) &&
                                            errors.password
                                        }
                                    />
                                </div>
                                <br></br>
                                {/* <div
                                    style={{
                                        float: "right",
                                        marginRight: "10%"
                                    }}
                                >
                                    <a href="">
                                        <i>Forgot Password?</i>
                                    </a>
                                </div> */}
                                <br></br>

                                <div style={{ margin: "5% 5% 5% 10%" }}>
                                    <Fab
                                        variant="contained"
                                        style={{
                                            backgroundColor: "#1093bd",
                                            color: "white",
                                            width: "95%"
                                        }}
                                        onClick={this.onSignin}
                                    >
                                        LOGIN
                                    </Fab>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
    }
}

const WithFormik = withFormik({
    mapPropsToValues: props => {
        console.log(props);
        return {
            email: "",
            password: ""
        };
    },
    validationSchema: function() {
        let schema = yup.object().shape({
            email: yup
                .string()
                .required("Email address is required!")
                .email("Email address is not valid!"),
            password: yup.string().required("Password is required!")
        });
        return schema;
    }
})(Signin);

export default WithFormik;
