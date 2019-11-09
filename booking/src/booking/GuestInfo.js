import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import DatePicker from "../components/DatePicker";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import countries from "../country.json";

import cebuana from "../images/cebuana.png";
import bpi from "../images/bpi.png";
import mlhuillier from "../images/mlhuillier.png";
import palawan from "../images/palawan.png";

export default class GuestInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countryWidth: 0
        };
    }

    componentDidMount() {
        this.setState({
            countryWidth: this.countryInput.offsetWidth
        });
    }

    handleSelectChange = e => {
        this.props.setFieldValue(e.target.name, e.target.value);
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

    // handleClickOpen = () => {
    //     setOpen(true);
    // };

    // handleClose = () => {
    //     setOpen(false);
    // };
    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            validateCalled
        } = this.props;
        return (
            <Paper style={{ padding: 25 }}>
                <Typography
                    variant="h5"
                    style={{ fontWeight: 300 }}
                    gutterBottom
                >
                    Personal Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            component="fieldset"
                            error={
                                (validateCalled || touched.honorific) &&
                                errors.honorific
                                    ? true
                                    : false
                            }
                        >
                            <FormLabel component="legend">Honorifics</FormLabel>
                            <RadioGroup
                                value={values.honorific}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <FormControlLabel
                                    value="Mr"
                                    control={
                                        <Radio color="primary" id="honorific" />
                                    }
                                    label="Mr"
                                />
                                <FormControlLabel
                                    value="Ms"
                                    control={
                                        <Radio color="primary" id="honorific" />
                                    }
                                    label="Ms"
                                />
                            </RadioGroup>
                            <FormHelperText>
                                {(validateCalled || touched.honorific) &&
                                errors.honorific
                                    ? errors.honorific
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="firstname"
                            placeholder="First Name"
                            variant="outlined"
                            label="First name"
                            value={values.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="middlename"
                            placeholder="Middle Name"
                            variant="outlined"
                            label="Middle name"
                            value={values.middlename}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                                (validateCalled || touched.middlename) &&
                                errors.middlename
                                    ? errors.middlename
                                    : ""
                            }
                            error={
                                (validateCalled || touched.middlename) &&
                                errors.middlename
                                    ? true
                                    : false
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            id="lastname"
                            placeholder="Lastname Name"
                            variant="outlined"
                            label="Last name"
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            fullWidth
                            id="address"
                            placeholder="Address"
                            variant="outlined"
                            label="Address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                    <Grid item xs={12} md={6}>
                        <FormControl
                            variant="outlined"
                            error={
                                (validateCalled || touched.country) &&
                                errors.country
                                    ? true
                                    : false
                            }
                            fullWidth
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
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.countryWidth}
                                    />
                                }
                                // disabled={!newGuest}
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
                            fullWidth
                            id="contactno"
                            placeholder="Contact number"
                            variant="outlined"
                            label="Contact number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +639
                                    </InputAdornment>
                                )
                            }}
                            value={values.contactno}
                            onChange={this.onChangeNumber}
                            onBlur={handleBlur}
                            type="number"
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="email"
                            placeholder="Gmail address"
                            variant="outlined"
                            label="Gmail address"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="confirmEmail"
                            placeholder="Re-type Gmail Address"
                            variant="outlined"
                            label="Re-type Gmail address"
                            value={values.confirmEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                                (validateCalled || touched.confirmEmail) &&
                                errors.confirmEmail
                                    ? errors.confirmEmail
                                    : ""
                            }
                            error={
                                (validateCalled || touched.confirmEmail) &&
                                errors.confirmEmail
                                    ? true
                                    : false
                            }
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={12}
                        justify="center"
                        alignItems="center"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center"
                            }}
                        >
                            <Typography variant="h6">Payment Method</Typography>
                            <div>
                                <img
                                    src={palawan}
                                    style={{ marginRight: "10px" }}
                                    width="15%"
                                ></img>
                                <img
                                    src={cebuana}
                                    style={{ marginRight: "10px" }}
                                    width="15%"
                                ></img>
                                <img
                                    src={mlhuillier}
                                    style={{ marginRight: "10px" }}
                                    width="15%"
                                ></img>
                                <img src={bpi} width="15%"></img>
                            </div>
                            <Typography>
                                <h6>
                                    Please choose only one(1) of this payment
                                    method:
                                </h6>
                                <h6>
                                    Palawan Express Pera Padala / Cebuana
                                    Lhuiller / MLhuiller
                                    <br></br>
                                    Receiver : Maria Paz Bacareza<br></br>
                                    Contact Number: 09217661951<br></br>
                                    For your BPI payment method please deposit
                                    in the information below:
                                </h6>
                                <br></br>
                                Account Number : 1234 5678 9012 3456<br></br>
                                Account Name : Maria Paz Bacareza
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

                {/* <div style={{ marginTop: 25 }}>
                    <Typography
                        variant="h4"
                        style={{ fontWeight: 300 }}
                        component="div"
                        gutterBottom
                    >
                        Save my information &amp; register
                    </Typography>
                    <FormControl component="fieldset">
                        <FormGroup
                            value={values.honorific}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="newAccount"
                                        color="primary"
                                        id="newAccount"
                                    />
                                }
                                label="I agree to create my guest profile to be used for future reservations."
                            />
                        </FormGroup>
                        <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                </div> */}
            </Paper>
        );
    }
}
