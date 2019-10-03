import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import DatePicker from "../components/DatePicker";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import countries from "../country.json";

import * as yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import { FormHelperText } from "@material-ui/core";

import moment from "moment";

import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import AddUserDialog from "../components/AddUserDialog";

class Walkin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newGuest: true,
            userId: "",
            honorific: "",
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            country: "",
            email: "",
            contactno: "",
            checkInDate: moment(),
            checkOutDate: moment().add({ days: 1 }),
            roomIndex: "",
            selectedRoom: {},
            rateId: "",
            rateIndex: "",
            selectedRate: {},
            roomTypeIndex: "",
            roomTypeId: "",
            selectedRoomType: {},

            numberOfNights: 1,
            numberOfGuest: 0,
            price: 0,
            paidAmount: 0,
            total: 0,
            balance: 0,
            rooms: [],
            rates: [],
            roomtypes: [],
            fetchingRate: false,
            userDialog: false,
            snackBar: false,
            snackBarMessage: "",
            validatedCalled: false
        };
    }

    async componentDidMount() {
        let { data } = await axios.get("/api/roomtype");
        console.log(data);
        this.setState({ roomtypes: data });
    }

    handleChange = e => this.setState({ [e.target.id]: e.target.value });

    noop = () => {};

    handleSelectChange = e => {
        console.log(e.target.name, e.target.value);
        this.props.setFieldValue(e.target.name, e.target.value);
    };

    handleSelectRoomType = async e => {
        console.log(e.target.value);
        console.log(this.state.roomtypes[e.target.value]);
        let roomTypeId = this.state.roomtypes[e.target.value].id;
        let roomType = this.state.roomtypes[e.target.value];
        if (this.props.values.roomTypeId !== roomTypeId) {
            this.props.setFieldValue("roomTypeId", roomTypeId);
            this.props.setTouched({
                roomTypeId: true
            });
            this.setState(
                {
                    roomTypeIndex: e.target.value,
                    fetchingRate: true,
                    selectedRoomType: roomType,
                    rateIndex: "",
                    roomIndex: ""
                },
                async () => {
                    try {
                        let [rooms, rates] = await Promise.all([
                            axios.get("/api/room/hotelroom?room_type_id=" + roomTypeId),
                            axios.get(`api/roomtype/${this.props.values.roomTypeId}/rate`)
                        ]);
                        this.setState({
                            rates: rates.data,
                            rooms: rooms.data,
                            fetchingRate: false
                        });
                    } catch (err) {
                        this.setState({ fetchingRate: false });
                        console.log(err);
                    }
                }
            );
        }
    };

    handleSelectRoom = async e => {
        let roomId = this.state.rooms[e.target.value].id;
        this.props.setFieldValue("roomId", roomId);
        this.props.setTouched({
            roomId: true
        });
        this.setState({ roomIndex: e.target.value });
    };

    handleSelectRate = e => {
        let rate = this.state.rates[e.target.value];
        let rateId = this.state.rates[e.target.value].id;
        let checkInDate = moment(this.props.values.checkInDate);
        let checkOutDate = moment(this.props.values.checkOutDate);
        let diff = checkOutDate.diff(checkInDate, "days");
        let price = diff * rate.price;
        console.log(diff, rate.price, price);
        this.props.setFieldValue("rateId", rateId);
        this.props.setFieldValue("price", price);
        this.props.setTouched({
            rateId: true
        });
        this.setState({ rateIndex: e.target.value });
    };

    onSubmit = async () => {
        try {
            this.setState({ validatedCalled: true });
            await this.props.validateForm();
            if (this.props.isValid) {
                this.setState({ submitting: true }, async () => {
                    try {
                        await axios.post("/api/booking/walkin", {
                            userId: this.props.values.userId,
                            email: this.props.values.email,
                            honorific: this.props.values.honorific,
                            firstname: this.props.values.firstname,
                            lastname: this.props.values.lastname,
                            middlename: this.props.values.middlename,
                            contactno: "+639" + this.props.values.contactno,
                            guest_no: this.props.values.numberOfGuest,
                            address: this.props.values.address,
                            country: this.props.values.country,
                            from_date: moment(this.props.values.checkInDate).format("YYYY-MM-DD"),
                            to_date: moment(this.props.values.checkOutDate).format("YYYY-MM-DD"),
                            room_id: this.props.values.roomId,
                            rate_id: this.props.values.rateId,
                            paidAmount: this.props.values.paidAmount
                        });
                        this.props.history.push("/calendar");
                    } catch (err) {
                        console.log(err);
                    }
                });
            } else {
                console.log("not valid");
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleCheckbox = e => {
        this.setState({ newGuest: e.target.checked });
    };

    setUser = user => {
        this.props.setFieldValue("honorific", user.honorific);
        this.props.setFieldValue("firstname", user.firstname);
        this.props.setFieldValue("middlename", user.middlename);
        this.props.setFieldValue("lastname", user.lastname);
        this.props.setFieldValue("address", user.address);
        this.props.setFieldValue("country", user.country);
        this.props.setFieldValue("email", user.email);
        this.props.setFieldValue("contactno", user.contactno.substring(4));
        this.props.setFieldValue("userId", user.userId);
    };

    handleUserDialog = () => {
        this.setState({ userDialog: !this.state.userDialog });
    };

    handleCheckinDate = date => {
        let checkInDate = moment(date);
        let checkOutDate = moment(this.props.values.checkOutDate);

        if (checkInDate.isSameOrAfter(checkOutDate, "days")) {
            checkOutDate = moment(date).add({ days: 1 });
            let diff = checkOutDate.diff(checkInDate, "day");
            console.log("same or after", diff);
            let price = 0;
            if (this.state.rateIndex !== "") {
                let rates = this.state.rates[this.state.rateIndex];
                price = rates.price * diff;
            }
            this.props.setFieldValue("checkInDate", moment(date));
            this.props.setFieldValue("checkOutDate", checkOutDate);
            this.props.setFieldValue("numberOfNights", diff);
            this.props.setFieldValue("price", price);
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            let price = 0;
            if (this.state.rateIndex !== "") {
                let rates = this.state.rates[this.state.rateIndex];
                price = rates.price * diff;
            }
            this.props.setFieldValue("checkInDate", moment(date));
            this.props.setFieldValue("numberOfNights", diff);
            this.props.setFieldValue("price", price);
        }
    };
    handleCheckoutDate = date => {
        let checkInDate = moment(this.props.values.checkInDate);
        let checkOutDate = moment(date);
        if (checkOutDate.isSameOrBefore(checkInDate, "days")) {
            this.setState({
                snackBarMessage: (
                    <span>
                        {`You can't select dates that are the `}
                        <strong>same</strong> or <strong>before</strong> the checkin date!
                    </span>
                ),
                snackBar: true
            });
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            let price = 0;
            if (this.state.rateIndex !== "") {
                let rates = this.state.rates[this.state.rateIndex];
                price = rates.price * diff;
                console.log(rates, diff, price);
            }
            this.props.setFieldValue("checkOutDate", moment(date));
            this.props.setFieldValue("numberOfNights", diff);
            this.props.setFieldValue("price", price);
        }
    };

    handleCloseSnackBar = () => this.setState({ snackBar: false });

    onChangeNumber = e => {
        if (e.target.value.length > 9) {
            this.props.setFieldValue("contactno", e.target.value.substring(0, 9));
        } else {
            this.props.setFieldValue("contactno", e.target.value);
        }
    };

    render() {
        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;
        let {
            newGuest,
            honorific,
            firstname,
            middlename,
            lastname,
            address,
            country,
            email,
            contactno,
            checkInDate,
            checkOutDate,
            roomIndex,
            selectedRoom,
            rateId,
            numberOfNights,
            numberOfGuest,
            price,
            paidAmount,
            total,
            balance,
            validatedCalled,
            roomTypeIndex,
            rateIndex,
            selectedRoomType
        } = this.state;

        let numberOfGuestItems = [];

        if (selectedRoom) {
            for (let i = 0; i <= selectedRoomType.max_guest; i++) {
                numberOfGuestItems.push(
                    <MenuItem value={i} key={i}>
                        {i}
                    </MenuItem>
                );
            }
        }

        console.log(numberOfGuestItems);

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
                    <Paper style={{ backgroundColor: "white", padding: 20 }}>
                        <Typography variant="h5" style={{ marginBottom: 20 }}>
                            Walk in
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 5
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <Icon>account_circle</Icon>
                                        <Typography variant="subtitle1" style={{ marginLeft: 5 }}>
                                            About Guest
                                        </Typography>
                                    </div>
                                    <FormControlLabel
                                        control={<Switch color="primary" checked={newGuest} onChange={this.handleCheckbox} value={!newGuest} />}
                                        label="New guest"
                                        labelPlacement="start"
                                    />
                                </div>
                                <Collapse in={!newGuest}>
                                    <div style={{ marginBottom: 20 }}>
                                        <Button variant="contained" color="primary" fullWidth onClick={this.handleUserDialog}>
                                            Select Guest
                                        </Button>
                                    </div>
                                </Collapse>

                                <FormControl component="fieldset" error={(validatedCalled || touched.honorific) && errors.honorific ? true : false}>
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
                                            control={<Radio disabled={!newGuest} color="primary" id="honorific" />}
                                            label="Mr"
                                        />
                                        <FormControlLabel
                                            value="Ms"
                                            control={
                                                <Radio
                                                    disabled={!newGuest}
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                    color="primary"
                                                    id="honorific"
                                                />
                                            }
                                            label="Ms"
                                        />
                                        <FormControlLabel
                                            value="Dr"
                                            control={
                                                <Radio
                                                    disabled={!newGuest}
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                    color="primary"
                                                    id="honorific"
                                                />
                                            }
                                            label="Dr"
                                        />
                                        <FormControlLabel
                                            value="Atty"
                                            control={
                                                <Radio
                                                    disabled={!newGuest}
                                                    inputProps={{
                                                        readOnly: true
                                                    }}
                                                    color="primary"
                                                    id="honorific"
                                                />
                                            }
                                            label="Atty"
                                        />
                                    </RadioGroup>
                                    <FormHelperText>
                                        {(validatedCalled || touched.honorific) && errors.honorific ? errors.honorific : ""}
                                    </FormHelperText>
                                </FormControl>

                                <TextField
                                    id="firstname"
                                    placeholder="First name"
                                    variant="standard"
                                    label="Firstname"
                                    margin="normal"
                                    helperText={(validatedCalled || touched.firstname) && errors.firstname ? errors.firstname : ""}
                                    error={(validatedCalled || touched.firstname) && errors.firstname ? true : false}
                                    onBlur={handleBlur}
                                    value={values.firstname}
                                    onChange={handleChange}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />

                                <TextField
                                    id="middlename"
                                    placeholder="Middle name"
                                    variant="standard"
                                    label="Middle name"
                                    margin="normal"
                                    helperText={(validatedCalled || touched.middlename) && errors.middlename ? errors.middlename : ""}
                                    error={(validatedCalled || touched.middlename) && errors.middlename ? true : false}
                                    onBlur={handleBlur}
                                    value={values.middlename}
                                    onChange={handleChange}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />
                                <TextField
                                    id="lastname"
                                    placeholder="Last name"
                                    variant="standard"
                                    label="Lastname"
                                    margin="normal"
                                    helperText={(validatedCalled || touched.lastname) && errors.lastname ? errors.lastname : ""}
                                    error={(validatedCalled || touched.lastname) && errors.lastname ? true : false}
                                    onBlur={handleBlur}
                                    value={values.lastname}
                                    onChange={handleChange}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />
                                <TextField
                                    id="address"
                                    placeholder="Address"
                                    variant="standard"
                                    label="Address"
                                    margin="normal"
                                    helperText={(validatedCalled || touched.address) && errors.address ? errors.address : ""}
                                    error={(validatedCalled || touched.address) && errors.address ? true : false}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    onChange={handleChange}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={(validatedCalled || touched.country) && errors.country ? true : false}
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
                                        disabled={!newGuest}
                                    >
                                        {countries.map((c, i) => {
                                            return (
                                                <MenuItem value={c} key={c}>
                                                    {c}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText>{(validatedCalled || touched.country) && errors.country ? errors.country : ""}</FormHelperText>
                                </FormControl>
                                <TextField
                                    id="email"
                                    placeholder="Email address"
                                    variant="standard"
                                    label="Email address"
                                    margin="normal"
                                    helperText={(validatedCalled || touched.country) && errors.email ? errors.email : ""}
                                    error={(validatedCalled || touched.country) && errors.email ? true : false}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    onChange={handleChange}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />
                                <TextField
                                    id="contactno"
                                    placeholder="Contact number"
                                    variant="standard"
                                    label="Contact number"
                                    margin="normal"
                                    type="number"
                                    helperText={(validatedCalled || touched.contactno) && errors.contactno ? errors.contactno : ""}
                                    error={(validatedCalled || touched.contactno) && errors.contactno ? true : false}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">+639</InputAdornment>
                                    }}
                                    onBlur={handleBlur}
                                    value={values.contactno}
                                    onChange={this.onChangeNumber}
                                    inputProps={{ readOnly: !newGuest }}
                                    disabled={!newGuest}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyItems: "center",
                                        marginBottom: 5
                                    }}
                                >
                                    <Icon>information</Icon>
                                    <Typography variant="subtitle1" style={{ marginLeft: 5 }}>
                                        About Booking
                                    </Typography>
                                </div>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Check-in Date"
                                    format="MM/dd/yyyy"
                                    value={values.checkInDate}
                                    onChange={this.handleCheckinDate}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                    minDate={new Date()}
                                    // showDisabledMonthNavigation
                                    style={{ width: "100%" }}
                                />

                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Check-out Date"
                                    format="MM/dd/yyyy"
                                    value={values.checkOutDate}
                                    onChange={this.handleCheckoutDate}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                    minDate={new Date()}
                                    // showDisabledMonthNavigation
                                    style={{ width: "100%" }}
                                />
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={(validatedCalled || touched.roomTypeId) && errors.roomTypeId ? true : false}
                                    fullWidth
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.roomInput = el)}>
                                        Room type
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleSelectRoomType}
                                        value={roomTypeIndex}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {this.state.roomtypes.map((roomType, i) => {
                                            let [firstLetter, ...bedType] = roomType.bed_type;
                                            bedType = bedType.reduce((acc, el) => acc + el.toLowerCase(), "");
                                            return (
                                                <MenuItem value={i} key={roomType.id}>
                                                    {`${roomType.name} (${firstLetter + bedType} Bed)`}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {(validatedCalled || touched.roomTypeId) && errors.roomTypeId ? errors.roomTypeId : ""}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={(validatedCalled || touched.roomId) && errors.roomId ? true : false}
                                    fullWidth
                                    disabled={this.state.fetchingRate || roomTypeIndex === ""}
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.roomInput = el)}>
                                        Room
                                        {this.state.fetchingRate && <CircularProgress size={13} style={{ marginLeft: 5 }} />}
                                    </InputLabel>
                                    <Select
                                        name="rateId"
                                        onChange={this.handleSelectRoom}
                                        value={roomIndex}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {this.state.rooms.map((room, i) => {
                                            return <MenuItem value={i} key={room.id}>{`Room #${room.room_number}`}</MenuItem>;
                                        })}
                                    </Select>
                                    <FormHelperText>{(validatedCalled || touched.roomId) && errors.roomId ? errors.roomId : ""}</FormHelperText>
                                </FormControl>
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={(validatedCalled || touched.rateId) && errors.rateId ? true : false}
                                    fullWidth
                                    disabled={this.state.fetchingRate || roomTypeIndex === ""}
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.roomInput = el)}>
                                        Rate
                                        {this.state.fetchingRate && <CircularProgress size={13} style={{ marginLeft: 5 }} />}
                                    </InputLabel>
                                    <Select
                                        name="rateId"
                                        onChange={this.handleSelectRate}
                                        value={rateIndex}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {this.state.rates.map((rate, i) => {
                                            return <MenuItem value={i} key={rate.id}>{`P${rate.price} (${rate.name})`}</MenuItem>;
                                        })}
                                    </Select>
                                    <FormHelperText>{(validatedCalled || touched.rateId) && errors.rateId ? errors.rateId : ""}</FormHelperText>
                                </FormControl>

                                <FormControl variant="standard" margin="normal" fullWidth disabled={roomTypeIndex === ""}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Number of Guests</InputLabel>
                                    <Select
                                        name="numberOfGuest"
                                        onChange={this.handleSelectChange}
                                        value={values.numberOfGuest}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {numberOfGuestItems}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="firstname"
                                    placeholder="Number of Nights"
                                    variant="standard"
                                    label="Number of Nights"
                                    margin="normal"
                                    value={values.numberOfNights}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyItems: "center",
                                        marginBottom: 5
                                    }}
                                >
                                    <Icon>account_balance_wallet</Icon>
                                    <Typography variant="subtitle1" style={{ marginLeft: 5 }}>
                                        Balance
                                    </Typography>
                                </div>
                                <TextField
                                    id="price"
                                    placeholder="Price"
                                    label="Price"
                                    value={values.price}
                                    InputProps={{ readOnly: true }}
                                    variant="standard"
                                    hiddenLabel
                                    margin="normal"
                                    fullWidth
                                />
                                <TextField
                                    id="paidAmount"
                                    placeholder="Paid Amount"
                                    label="Paid Amount"
                                    value={values.paidAmount}
                                    onChange={handleChange}
                                    variant="standard"
                                    hiddenLabel
                                    margin="normal"
                                    fullWidth
                                />

                                <TextField
                                    id="total"
                                    placeholder="Total"
                                    label="Total"
                                    variant="standard"
                                    margin="normal"
                                    value={values.price}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />

                                <TextField
                                    id="balance"
                                    placeholder="Balance"
                                    variant="standard"
                                    label="Balance"
                                    margin="normal"
                                    value={values.price - values.paidAmount < 0 ? 0 : values.price - values.paidAmount}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        {/* <DatePicker /> */}

                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button variant="contained" color="primary" onClick={this.onSubmit}>
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <SaveIcon style={{ marginRight: "20px" }} />
                                Save
                            </Button>
                        </div>
                    </Paper>
                </div>
                <AddUserDialog
                    open={this.state.userDialog}
                    selectedUser={this.state.userId}
                    setUser={this.setUser}
                    handleClose={this.handleUserDialog}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.snackBar}
                    autoHideDuration={5000}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.handleCloseSnackBar}
                    message={
                        <span
                            id="message-id"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyItems: "center"
                            }}
                        >
                            <Icon style={{ marginRight: 10 }}>warning</Icon>
                            {this.state.snackBarMessage}
                        </span>
                    }
                    TransitionComponent={Slide}
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleCloseSnackBar}>
                            <Icon>close</Icon>
                        </IconButton>
                    ]}
                />
            </AdminLayout>
        );
    }
}

const styles = createStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        margin: theme.spacing(2)
    },
    dayWrapper: {
        position: "relative"
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit"
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%"
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled
    },
    highlightNonCurrentMonthDay: {
        color: "#676767"
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%"
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%"
    }
}));

const WithFormik = withFormik({
    mapPropsToValues: props => {
        console.log(props);
        return {
            userId: "",
            honorific: "",
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            country: "",
            email: "",
            contactno: "",
            roomTypeId: "",
            roomId: "",
            rateId: "",
            numberOfGuest: 0,
            numberOfNights: 1,
            paidAmount: 0,
            price: 0,
            checkInDate: moment(),
            checkOutDate: moment().add({ day: 1 })
        };
    },

    validationSchema: function() {
        let schema = yup.object().shape({
            honorific: yup.string("Honorific must be a word!").required("Honorific is required!"),
            firstname: yup.string("Name must be a word!").required("First Name is required!"),
            middlename: yup.string("Name must be a word!").required("Middle Name is required!"),
            lastname: yup.string("Name must be a word!").required("Last Name is required!"),
            address: yup.string("Name must be a word!").required("Address is required!"),
            country: yup.string("Name must be a word!").required("Country is required!"),
            email: yup.string("Name must be a word!").required("Gmail is required!"),
            contactno: yup
                .string("Name must be a word!")
                .length(9, "Contact number must be 9 digits")
                .required("Contact number is required!"),
            roomTypeId: yup.string().required("Room type is required!"),
            roomId: yup.string().required("Room is required!"),
            rateId: yup.string().required("Rate is required!"),
            numberOfGuest: yup
                .number()
                .required("Number of guest is required!")
                .min(1, "Number of guest must be more than one(1)!")
        });
        return schema;
    }
})(Walkin);

export default withStyles(styles)(WithFormik);
