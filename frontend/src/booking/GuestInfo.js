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

import countries from "../country.json";

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
            this.props.setFieldValue("contactno", e.target.value.substring(0, 9));
        } else {
            this.props.setFieldValue("contactno", e.target.value);
        }
    };

    render() {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;
        return (
            <Paper style={{ padding: 25 }}>
                <Typography variant="h5" style={{ fontWeight: 300 }} gutterBottom>
                    Personal Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl
                            component="fieldset"
                            // error={(validatedCalled || touched.honorific) && errors.honorific ? true : false}
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
                                <FormControlLabel value="Mr" control={<Radio color="primary" id="honorific" />} label="Mr" />
                                <FormControlLabel value="Ms" control={<Radio color="primary" id="honorific" />} label="Ms" />
                            </RadioGroup>
                            {/* <FormHelperText>{(validatedCalled || touched.honorific) && errors.honorific ? errors.honorific : ""}</FormHelperText> */}
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
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl
                            variant="outlined"
                            // error={(validatedCalled || touched.country) && errors.country ? true : false}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.countryInput = el)}>
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
                                input={<OutlinedInput labelWidth={this.state.countryWidth} />}
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
                            {/* <FormHelperText>{(validatedCalled || touched.country) && errors.country ? errors.country : ""}</FormHelperText> */}
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
                                startAdornment: <InputAdornment position="start">+639</InputAdornment>
                            }}
                            value={values.contactno}
                            onChange={this.onChangeNumber}
                            onBlur={handleBlur}
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="email"
                            placeholder="Email address"
                            variant="outlined"
                            label="Email address"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="confirmEmail"
                            placeholder="Re-type Email Address"
                            variant="outlined"
                            label="Re-type Email address"
                            value={values.confirmEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Grid>
                </Grid>
                <div style={{ marginTop: 25 }}>
                    <Typography variant="h4" style={{ fontWeight: 300 }} component="div" gutterBottom>
                        Save my information &amp; register
                    </Typography>
                    <FormControl component="fieldset">
                        <FormGroup value={values.honorific} onChange={handleChange} onBlur={handleBlur}>
                            <FormControlLabel
                                control={<Checkbox value="newAccount" color="primary" id="newAccount" />}
                                label="I agree to create my guest profile to be used for future reservations."
                            />
                        </FormGroup>
                        {/* <FormHelperText>Be careful</FormHelperText> */}
                    </FormControl>
                </div>
            </Paper>
        );
    }
}
