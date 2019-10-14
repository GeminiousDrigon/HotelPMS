import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import InfoIcon from "@material-ui/icons/Info";

import * as yup from "yup";
import { withFormik } from "formik";

import countries from "../../country.json";
import axios from "axios";
import { LinearProgress } from "@material-ui/core";

class GuestInfoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countryLabelWidth: 0,
            fetching: this.props.guest.id && this.props.show ? true : false,
            validateCalled: false,
            fetched: this.props.guest.id && this.props.show ? false : true
        };
    }

    componentDidMount() {
        // this.setState({ countryLabelWidth: this.countryInput.offsetWidth });
        console.log(this.props.show);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.countryInput && this.state.countryLabelWidth === 0)
            this.setState({ countryLabelWidth: this.countryInput.offsetWidth });

        if (!prevProps.show && this.props.show) {
            if (this.props.guest.id) {
                console.log("get guest info", this.props.guest.id);
                this.getGuest(this.props.guest.id);
            }
        }
    }

    getGuest = async id => {
        try {
            let { fetching } = this.state;
            if (!fetching) this.setState({ fetching: true });
            let { data } = await axios.get("/api/guest/" + id);
            this.setState({ fetching: false, fetched: true });
            this.props.setFieldValue("address", data.address);
            this.props.setFieldValue("book_room_id", data.book_room_id);
            this.props.setFieldValue("contactno", data.contactno.substring(4));
            this.props.setFieldValue("created_at", data.created_at);
            this.props.setFieldValue("email", data.email);
            this.props.setFieldValue("firstname", data.firstname);
            this.props.setFieldValue("id", data.id);
            this.props.setFieldValue("lastname", data.lastname);
            this.props.setFieldValue("middlename", data.middlename);
            this.props.setFieldValue("updated_at", data.updated_at);
        } catch (err) {
            this.setState({ fetching: false, fetched: false });
            console.log(err);
        }
    };

    handleSelectChange = e => {
        console.log(e.target.name, e.target.value);
        this.props.setFieldValue(e.target.name, e.target.value);
    };

    onSubmitGuestInfo = async () => {
        try {
            this.setState({ validateCalled: true, fetching: true });
            let errors = await this.props.validateForm();
            if (this.props.isValid) {
                let { values } = this.props;
                if (values.id) {
                    //update info
                    let data = { ...values };
                    data.contactno = "+639" + values.contactno;
                    await axios.put(`/api/guest/${values.id}`, {
                        ...data
                    });
                    this.getGuest(data.id);
                } else {
                    //add new info
                    let guest = { ...values };
                    guest.contactno = "+639" + values.contactno;
                    guest.book_room_id = this.props.roomId;
                    let { data } = await axios.post(`/api/guest`, {
                        ...guest
                    });
                    this.getGuest(data.id);
                    this.props.openSnackBar(
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {/* <InfoIcon style={{ marginRight: "5" }} />{" "} */}
                            {` Successfully Added Room! `}
                        </span>
                    );
                }
                this.setState({ fetching: false });
                this.props.openSnackBar(
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <InfoIcon style={{ marginRight: "5" }} />
                        {` Successfully Added Guest! `}
                    </span>
                );
            } else {
                this.setState({ fetching: false });
            }
        } catch (err) {
            this.setState({ fetching: false });
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
            handleSubmit,
            show
        } = this.props;
        let { validateCalled, fetching, fetched } = this.state;
        if (show) {
            if (fetching && !fetched) {
                return (
                    <div
                        style={{
                            padding: "30px 0",
                            textAlign: "center",
                            width: "100%"
                        }}
                    >
                        <CircularProgress size={30} />
                    </div>
                );
            } else {
                return (
                    <div style={{ width: "100%", marginTop: 10 }}>
                        {this.state.fetching && fetched && (
                            <LinearProgress
                                style={{ height: 2, marginBottom: 5 }}
                            />
                        )}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="firstname"
                                    label="First name"
                                    variant="outlined"
                                    margin="dense"
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
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="middlename"
                                    label="Middle name"
                                    variant="outlined"
                                    margin="dense"
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
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="lastname"
                                    label="Last name"
                                    variant="outlined"
                                    margin="dense"
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
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="email"
                                    label="Email address"
                                    variant="outlined"
                                    margin="dense"
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
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address"
                                    label="Address"
                                    variant="outlined"
                                    margin="dense"
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
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl
                                    variant="standard"
                                    margin="dense"
                                    error={
                                        (validateCalled || touched.country) &&
                                        errors.country
                                            ? true
                                            : false
                                    }
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel
                                        htmlFor="outlined-age-native-simple"
                                        ref={el => (this.countryInput = el)}
                                    >
                                        Country
                                    </InputLabel>
                                    <Select
                                        name="country"
                                        onChange={this.handleSelectChange}
                                        value={values.country}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                        labelWidth={
                                            this.state.countryLabelWidth
                                        }
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: "300px"
                                                }
                                            }
                                        }}
                                        disabled={this.state.fetching}
                                    >
                                        {countries.map((c, i) => {
                                            return (
                                                <MenuItem value={c} key={c}>
                                                    {c}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {(validateCalled || touched.country) &&
                                        errors.country
                                            ? errors.country
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="contactno"
                                    label="Contact number"
                                    variant="outlined"
                                    margin="dense"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +639
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={this.onChangeNumber}
                                    onBlur={handleBlur}
                                    value={values.contactno}
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
                                    type="number"
                                    disabled={this.state.fetching}
                                />
                            </Grid>
                        </Grid>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 10
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={this.onSubmitGuestInfo}
                                disabled={this.state.fetching}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}

const WithFormik = withFormik({
    mapPropsToValues: props => {
        let defaultGuest = {
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            email: "",
            contactno: "",
            country: ""
        };
        return {
            ...defaultGuest,
            ...props.guest
        };
    },
    validationSchema: function() {
        let schema = yup.object().shape({
            firstname: yup.string().required("First name is required!"),
            middlename: yup.string().required("Middle name is required!"),
            lastname: yup.string().required("Lastname name is required!"),
            address: yup.string().required("Address is required!"),
            email: yup
                .string()
                .email("Please provide a valid email!")
                .required("Email address is required!"),
            country: yup.string().required("Country is required!"),
            contactno: yup
                .string()
                .length(9, "Contact number must be 9 digits only!")
                .required("Contact number is required!")
        });
        return schema;
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true
})(GuestInfoItem);

export default WithFormik;
