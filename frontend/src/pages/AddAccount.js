import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withFormik, Form, Formik } from "formik";
import * as yup from "yup";

import axios from "axios";
import { GET, PUT, POST, DELETE } from "../utils/restUtils";
import { CircularProgress } from "@material-ui/core";

class AddAccount extends Component {
    constructor(props) {
        super(props);

        let { id } = this.props.match.params;
        this.state = {
            validateCalled: false,
            edit: id ? true : false,
            fetching: id ? true : false,
            user: {
                address: "",
                confirmPassword: "",
                contactno: "",
                email: "",
                firstname: "",
                lastname: "",
                middlename: "",
                password: ""
            }
        };
    }

    componentDidMount() {
        if (this.state.edit) {
            this.getAccount();
        }
    }

    onSaveAccount = async (values, actions) => {
        try {
            this.setState({ validateCalled: true });
            if (this.state.edit) {
                let { id } = this.props.match.params;
                await PUT("/api/user/" + id, {
                    ...values
                });
                this.props.history.replace("/account");
            } else {
                await POST("/api/createAdmin", {
                    firstname: values.firstname,
                    middlename: values.middlename,
                    lastname: values.lastname,
                    address: values.address,
                    email: values.email,
                    contactno: values.contactno,
                    password: values.password
                });
                this.props.history.replace("/account");
            }
        } catch (err) {
            actions.setSubmitting(false);
            console.log(err);
        }
    };

    onChangeNumber = e => {
        if (e.target.value.length > 9) {
            this.props.setFieldValue("contactno", e.target.value.substring(0, 9));
        } else {
            this.props.setFieldValue("contactno", e.target.value);
        }
    };

    getAccount = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await GET("/api/user/" + id);
            this.setState({ fetching: false, user: { ...data } });
        } catch (err) {
            console.log(err);
            this.setState({ fetching: false });
        }
    };

    render() {
        let { validateCalled, fetching, edit } = this.state;
        return (
            <Formik
                onSubmit={this.onSaveAccount}
                initialValues={{
                    ...this.state.user,
                    edit
                }}
                validationSchema={function() {
                    let schema = yup.object().shape({
                        firstname: yup.string().required("First name is required!"),
                        middlename: yup.string().required("Middle name is required!"),
                        lastname: yup.string().required("Lastname name is required!"),
                        address: yup.string().required("Address is required!"),
                        email: yup.string().when("edit", {
                            is: true,
                            then: yup.string().notRequired(),
                            otherwise: yup.string().required("Email address is required!")
                        }),
                        contactno: yup.string().when("edit", {
                            is: true,
                            then: yup.string().notRequired(),
                            otherwise: yup
                                .string()
                                .length(9, "Contact number must be 9 digits only!")
                                .required("Contact number is required!")
                        }),
                        password: yup.string().when("edit", {
                            is: true,
                            then: yup.string().notRequired(),
                            otherwise: yup
                                .string()
                                .required("Password is required!")
                                .matches(
                                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    "Password must be at least 8 letters, uppercase, lowercase and numbers."
                                )
                        }),

                        confirmPassword: yup.string().when("edit", {
                            is: true,
                            then: yup.string().notRequired(),
                            otherwise: yup
                                .string()
                                .required("Password confirmation is required!")
                                .oneOf([yup.ref("password"), null], "Password does not match!")
                        })
                    });
                    return schema;
                }}
                enableReinitialize
                validateOnBlur
                validateOnChange
                render={({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
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
                                        padding: 20
                                    }}
                                >
                                    <h1>{this.state.edit ? "Edit" : "Add"} Account</h1>

                                    {fetching ? (
                                        <div style={{ textAlign: "center" }}>
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                        <>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="firstname"
                                                        placeholder="First Name"
                                                        label="First Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.firstname}
                                                        helperText={(validateCalled || touched.firstname) && errors.firstname ? errors.firstname : ""}
                                                        error={(validateCalled || touched.firstname) && errors.firstname ? true : false}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="middlename"
                                                        placeholder="Middle Name"
                                                        label="Middle Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.middlename}
                                                        helperText={
                                                            (validateCalled || touched.middlename) && errors.middlename ? errors.middlename : ""
                                                        }
                                                        error={(validateCalled || touched.middlename) && errors.middlename ? true : false}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id="lastname"
                                                        placeholder="Last Name"
                                                        label="Last Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.lastname}
                                                        helperText={(validateCalled || touched.lastname) && errors.lastname ? errors.lastname : ""}
                                                        error={(validateCalled || touched.lastname) && errors.lastname ? true : false}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="address"
                                                        placeholder="Address"
                                                        label="Address"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.address}
                                                        helperText={(validateCalled || touched.address) && errors.address ? errors.address : ""}
                                                        error={(validateCalled || touched.address) && errors.address ? true : false}
                                                    />
                                                </Grid>
                                                {!this.state.edit && (
                                                    <>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                id="email"
                                                                placeholder="Email Address"
                                                                label="Email Address"
                                                                variant="outlined"
                                                                fullWidth
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                                helperText={(validateCalled || touched.email) && errors.email ? errors.email : ""}
                                                                error={(validateCalled || touched.email) && errors.email ? true : false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                id="contactno"
                                                                placeholder="Contact number"
                                                                label="Contact number"
                                                                variant="outlined"
                                                                fullWidth
                                                                type="number"
                                                                onChange={this.onChangeNumber}
                                                                onBlur={handleBlur}
                                                                value={values.contactno}
                                                                InputProps={{
                                                                    startAdornment: <InputAdornment position="start">+639</InputAdornment>
                                                                }}
                                                                helperText={
                                                                    (validateCalled || touched.contactno) && errors.contactno ? errors.contactno : ""
                                                                }
                                                                error={(validateCalled || touched.contactno) && errors.contactno ? true : false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                id="password"
                                                                type="password"
                                                                placeholder="Temporary Password"
                                                                label="Temporary Password"
                                                                variant="outlined"
                                                                fullWidth
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                helperText={
                                                                    (validateCalled || touched.password) && errors.password ? errors.password : ""
                                                                }
                                                                error={(validateCalled || touched.password) && errors.password ? true : false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                id="confirmPassword"
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                label="Confirm Password"
                                                                variant="outlined"
                                                                fullWidth
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.confirmPassword}
                                                                helperText={
                                                                    (validateCalled || touched.confirmPassword) && errors.confirmPassword
                                                                        ? errors.confirmPassword
                                                                        : ""
                                                                }
                                                                error={
                                                                    (validateCalled || touched.confirmPassword) && errors.confirmPassword
                                                                        ? true
                                                                        : false
                                                                }
                                                            />
                                                        </Grid>
                                                    </>
                                                )}
                                            </Grid>

                                            <div
                                                style={{
                                                    marginTop: 20,
                                                    display: "flex",
                                                    justifyContent: "flex-end"
                                                }}
                                            >
                                                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                                                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                                    {isSubmitting && <CircularProgress size={10} style={{ marginRight: 10 }} />}
                                                    <SaveIcon style={{ marginRight: "10px" }} />
                                                    Save
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Paper>
                            </div>
                        </AdminLayout>
                    );
                }}
            />
        );
    }
}

export default AddAccount;
