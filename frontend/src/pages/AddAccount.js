import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withFormik } from "formik";
import * as yup from "yup";

import axios from "axios";
import { GET, PUT, POST, DELETE } from '../utils/restUtils'

class AddAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validateCalled: false
        };
    }

    onSaveAccount = async () => {
        try {
            this.setState({ validateCalled: true });
            await this.props.validateForm();
            if (this.props.isValid) {
                let { values } = this.props;
                await POST("/api/createAdmin", {
                    firstname: values.firstname,
                    middlename: values.middlename,
                    lastname: values.lastname,
                    address: values.address,
                    email: values.email,
                    contactno: values.contactno,
                    password: values.password
                });
                this.props.history.push("/account");
            }
        } catch (err) {
            console.log(err);
        }
    };

    onChangeNumber = e => {
        if (e.target.value.length > 9) {
            this.props.setFieldValue(
                "contactno",
                e.target.value.substring(0, 9)
            );
        } else {
            this.props.setFieldValue("contactno", e.target.value);
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
                        <h1>Account/ Add Account</h1>

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
                                    helperText={
                                        (validateCalled || touched.firstname) &&
                                        errors.firstname
                                            ? errors.firstname
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.firstname) &&
                                        errors.firstname
                                            ? true
                                            : false
                                    }
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
                                        (validateCalled ||
                                            touched.middlename) &&
                                        errors.middlename
                                            ? errors.middlename
                                            : ""
                                    }
                                    error={
                                        (validateCalled ||
                                            touched.middlename) &&
                                        errors.middlename
                                            ? true
                                            : false
                                    }
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
                                    helperText={
                                        (validateCalled || touched.lastname) &&
                                        errors.lastname
                                            ? errors.lastname
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.lastname) &&
                                        errors.lastname
                                            ? true
                                            : false
                                    }
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
                                    helperText={
                                        (validateCalled || touched.address) &&
                                        errors.address
                                            ? errors.address
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.address) &&
                                        errors.address
                                            ? true
                                            : false
                                    }
                                />
                            </Grid>
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
                                    helperText={
                                        (validateCalled || touched.email) &&
                                        errors.email
                                            ? errors.email
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.email) &&
                                        errors.email
                                            ? true
                                            : false
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="contactno"
                                    placeholder="Email Address"
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    onChange={this.onChangeNumber}
                                    onBlur={handleBlur}
                                    value={values.contactno}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +639
                                            </InputAdornment>
                                        )
                                    }}
                                    helperText={
                                        (validateCalled || touched.contactno) &&
                                        errors.contactno
                                            ? errors.contactno
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.contactno) &&
                                        errors.contactno
                                            ? true
                                            : false
                                    }
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
                                        (validateCalled || touched.password) &&
                                        errors.password
                                            ? errors.password
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.password) &&
                                        errors.password
                                            ? true
                                            : false
                                    }
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
                                        (validateCalled ||
                                            touched.confirmPassword) &&
                                        errors.confirmPassword
                                            ? errors.confirmPassword
                                            : ""
                                    }
                                    error={
                                        (validateCalled ||
                                            touched.confirmPassword) &&
                                        errors.confirmPassword
                                            ? true
                                            : false
                                    }
                                />
                            </Grid>
                        </Grid>

                        <div
                            style={{
                                marginTop: 20,
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onSaveAccount}
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

const WithFormik = withFormik({
    mapPropsToValues: props => {
        console.log(props);
        return {
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            email: "",
            contactno: "",
            password: "",
            confirmPassword: ""
        };
    },
    validationSchema: function() {
        let schema = yup.object().shape({
            firstname: yup.string().required("First name is required!"),
            middlename: yup.string().required("Middle name is required!"),
            lastname: yup.string().required("Lastname name is required!"),
            address: yup.string().required("Address is required!"),
            email: yup.string().required("Email address is required!"),
            contactno: yup
                .string()
                .length(9, "Contact number must be 9 digits only!")
                .required("Contact number is required!"),
            password: yup
                .string()
                .required("Password is required!")
                .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Password must be at least 8 letters, uppercase, lowercase and numbers."
                ),
            confirmPassword: yup
                .string()
                .required("Password confirmation is required!")
                .oneOf([yup.ref("password"), null], "Password does not match!")
        });
        return schema;
    },
    validateOnBlur: true,
    validateOnChange: true
})(AddAccount);

export default WithFormik;
