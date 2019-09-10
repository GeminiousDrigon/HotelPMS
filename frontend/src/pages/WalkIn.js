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

import { List } from "react-virtualized";

import countries from "../country.json";

import * as yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import { FormHelperText } from "@material-ui/core";

import moment from "moment";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";
import AddUserDialog from "../components/AddUserDialog";

class Walkin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newGuest: true,
            userId: null,
            honorifics: "",
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
            selectedRate: {},
            numberOfNights: 1,
            numberOfGuest: 0,
            price: 0,
            paidAmount: 0,
            total: 0,
            balance: 0,
            rooms: [],
            rates: [],
            fetchingRate: false,
            userDialog: false,
            snackBar: false,
            snackBarMessage: ""
        };
    }

    async componentDidMount() {
        let { data } = await axios.get("/api/room/hotelroom");
        this.setState({ rooms: data });
    }

    handleChange = e => this.setState({ [e.target.id]: e.target.value });

    noop = () => {};

    handleSelectChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSelectRoom = async e => {
        if (e.target.value !== this.state.roomIndex) {
            let { rooms } = this.state;
            let room = rooms[e.target.value];
            let roomTypeId = room.room_type.id;
            this.setState(
                {
                    fetchingRate: true,
                    roomIndex: e.target.value,
                    roomTypeId: roomTypeId,
                    selectedRoom: room,
                    rateId: ""
                },
                async () => {
                    let { data } = await axios.get(
                        "/api/roomtype/" + this.state.roomTypeId + "/rate"
                    );
                    this.setState({ rates: data, fetchingRate: false });
                }
            );
        } else {
            this.setState({ roomIndex: e.target.value });
        }
    };

    handleSelectRate = e => {
        this.setState({ [e.target.name]: e.target.value });
        let { rates } = this.state;
        let rate = rates[e.target.value];
        let rateId = e.target.value;
        this.setState({
            selectedRate: rate,
            rateId,
            price: rate.price * this.state.numberOfNights
        });
    };

    onSubmit = async () => {
        try {
            await this.props.validateForm();
            if (this.props.isValid) {
                this.setState({ submitting: true }, async () => {
                    try {
                        await axios.post("/api/booking/walkin", {
                            userId: this.state.userId,
                            email: this.state.email,
                            honorific: this.state.honorifics,
                            firstname: this.state.firstname,
                            lastname: this.state.lastname,
                            middlename: this.state.middlename,
                            contactno: this.state.contactno,
                            address: this.state.address,
                            from_date: moment(this.state.checkInDate).format(
                                "YYYY-MM-DD"
                            ),
                            to_date: moment(this.state.checkOutDate).format(
                                "YYYY-MM-DD"
                            ),
                            room_id: this.state.selectedRoom.id,
                            rate_id: this.state.selectedRate.id,
                            paidAmount: this.state.paidAmount
                        });
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
        this.setState({
            honorifics: user.honorific,
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            address: user.address,
            country: user.country,
            email: user.email,
            contactno: user.contactno,
            userId: user.id
        });
    };

    handleUserDialog = () => {
        this.setState({ userDialog: !this.state.userDialog });
    };

    handleCheckinDate = date => {
        let checkInDate = moment(date);
        let checkOutDate = moment(this.state.checkoutDate);
        if (checkInDate.isSameOrAfter(checkOutDate, "day")) {
            checkOutDate = moment(date).add({ days: 1 });
            let diff = checkOutDate.diff(checkInDate, "days");
            this.setState({
                checkInDate: date,
                checkOutDate: checkOutDate,
                numberOfNights: diff
            });
        } else {
            this.setState({ checkInDate: date });
        }
    };
    handleCheckoutDate = date => {
        let checkInDate = moment(this.state.checkInDate);
        let checkOutDate = moment(date);
        if (checkOutDate.isSameOrBefore(checkInDate, "day")) {
            this.setState({
                snackBarMessage: (
                    <span>
                        {`You can't select dates that are the `}
                        <strong>same</strong> or <strong>before</strong> the
                        checkin date!
                    </span>
                ),
                snackBar: true
            });
        } else {
            let diff = checkOutDate.diff(checkInDate, "days");
            this.setState({ checkOutDate: date, numberOfNights: diff });
        }
    };

    handleCloseSnackBar = () => this.setState({ snackBar: false });

    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
        } = this.props;
        let {
            newGuest,
            honorifics,
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
            balance
        } = this.state;

        let numberOfGuestItems = [];

        if (selectedRoom.room_type_id) {
            for (let i = 0; i <= selectedRoom.room_type.max_guest; i++) {
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
                        <Typography variant="h4" style={{ marginBottom: 20 }}>
                            Walk-in
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
                                        <Typography
                                            variant="subtitle1"
                                            style={{ marginLeft: 5 }}
                                        >
                                            About Guest
                                        </Typography>
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={newGuest}
                                                onChange={this.handleCheckbox}
                                                value={!newGuest}
                                            />
                                        }
                                        label="New guest"
                                        labelPlacement="start"
                                    />
                                </div>
                                <Collapse in={!newGuest}>
                                    <div style={{ marginBottom: 20 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={this.handleUserDialog}
                                        >
                                            Select Guest
                                        </Button>
                                    </div>
                                </Collapse>

                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Honorifics
                                    </FormLabel>
                                    <RadioGroup
                                        value={honorifics}
                                        onChange={this.handleChange}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <FormControlLabel
                                            value="Mr"
                                            control={
                                                <Radio
                                                    disabled={!newGuest}
                                                    color="primary"
                                                    id="honorifics"
                                                />
                                            }
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
                                                    id="honorifics"
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
                                                    id="honorifics"
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
                                                    id="honorifics"
                                                />
                                            }
                                            label="Atty"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <TextField
                                    id="firstname"
                                    placeholder="First name"
                                    variant="standard"
                                    label="Firstname"
                                    margin="normal"
                                    helperText={
                                        errors.firstname ? errors.firstname : ""
                                    }
                                    error={errors.firstname}
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
                                    helperText={
                                        errors.middlename
                                            ? errors.middlename
                                            : ""
                                    }
                                    error={errors.middlename}
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
                                    helperText={
                                        errors.lastname ? errors.lastname : ""
                                    }
                                    error={errors.lastname}
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
                                    helperText={
                                        errors.address ? errors.address : ""
                                    }
                                    error={errors.address}
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
                                    error={errors.country}
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
                                        value={country}
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
                                    <FormHelperText>
                                        {errors.country ? errors.country : ""}
                                    </FormHelperText>
                                </FormControl>
                                <TextField
                                    id="email"
                                    placeholder="Email address"
                                    variant="standard"
                                    label="Email address"
                                    margin="normal"
                                    helperText={
                                        errors.email ? errors.email : ""
                                    }
                                    error={errors.email}
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
                                    helperText={
                                        errors.contactno ? errors.contactno : ""
                                    }
                                    error={errors.contactno}
                                    onBlur={handleBlur}
                                    value={values.contactno}
                                    onChange={handleChange}
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
                                    <Typography
                                        variant="subtitle1"
                                        style={{ marginLeft: 5 }}
                                    >
                                        About Booking
                                    </Typography>
                                </div>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Check-in Date"
                                    format="MM/dd/yyyy"
                                    value={checkInDate}
                                    onChange={this.handleCheckinDate}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                    minDate={new Date()}
                                    showDisabledMonthNavigation
                                    style={{ width: "100%" }}
                                />

                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Check-out Date"
                                    format="MM/dd/yyyy"
                                    value={checkOutDate}
                                    onChange={this.handleCheckoutDate}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                    minDate={new Date()}
                                    showDisabledMonthNavigation
                                    style={{ width: "100%" }}
                                />
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={errors.roomIndex}
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="outlined-age-native-simple"
                                        ref={el => (this.roomInput = el)}
                                    >
                                        Room
                                    </InputLabel>
                                    <Select
                                        onChange={this.handleSelectRoom}
                                        value={roomIndex}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {this.state.rooms.map((room, i) => {
                                            return (
                                                <MenuItem
                                                    value={i}
                                                    key={room.id}
                                                >
                                                    {`Room #${room.room_number} (${room.room_type.name})`}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {errors.roomIndex
                                            ? errors.roomIndex
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    error={errors.rateId}
                                    fullWidth
                                    disabled={
                                        this.state.fetchingRate ||
                                        roomIndex === null
                                    }
                                >
                                    <InputLabel
                                        htmlFor="outlined-age-native-simple"
                                        ref={el => (this.roomInput = el)}
                                    >
                                        Rate
                                        {this.state.fetchingRate && (
                                            <CircularProgress
                                                size={13}
                                                style={{ marginLeft: 5 }}
                                            />
                                        )}
                                    </InputLabel>
                                    <Select
                                        name="rateId"
                                        onChange={this.handleSelectRate}
                                        value={rateId}
                                        SelectDisplayProps={{
                                            style: {
                                                display: "flex"
                                            }
                                        }}
                                    >
                                        {this.state.rates.map((rate, i) => {
                                            return (
                                                <MenuItem
                                                    value={i}
                                                    key={rate.id}
                                                >{`P${rate.price} (${rate.name})`}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText>
                                        {errors.rateId ? errors.rateId : ""}
                                    </FormHelperText>
                                </FormControl>

                                <FormControl
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    disabled={!Boolean(roomIndex)}
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple">
                                        Number of Guests
                                    </InputLabel>
                                    <Select
                                        name="numberOfGuest"
                                        onChange={this.handleSelectChange}
                                        value={numberOfGuest}
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
                                    value={numberOfNights}
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
                                    <Typography
                                        variant="subtitle1"
                                        style={{ marginLeft: 5 }}
                                    >
                                        Balance
                                    </Typography>
                                </div>
                                <TextField
                                    id="price"
                                    placeholder="Price"
                                    label="Price"
                                    value={price}
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
                                    value={paidAmount}
                                    onChange={this.handleChange}
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
                                    value={price}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />

                                <TextField
                                    id="balance"
                                    placeholder="Balance"
                                    variant="standard"
                                    label="Balance"
                                    margin="normal"
                                    value={
                                        price - paidAmount < 0
                                            ? 0
                                            : price - paidAmount
                                    }
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
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onSubmit}
                            >
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
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleCloseSnackBar}
                        >
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
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            country: "",
            email: "",
            contactno: "",
            roomInput: "",
            rateId: ""
        };
    },

    validationSchema: function() {
        let schema = yup.object().shape({
            firstname: yup
                .string("Name must be a word!")
                .required("First Name is required!"),
            middlename: yup
                .string("Name must be a word!")
                .required("Middle Name is required!"),
            lastname: yup
                .string("Name must be a word!")
                .required("Last Name is required!"),
            address: yup
                .string("Name must be a word!")
                .required("Address is required!"),
            country: yup
                .string("Name must be a word!")
                .required("Country is required!"),
            email: yup
                .string("Name must be a word!")
                .required("Gmail is required!"),
            contactno: yup
                .string("Name must be a word!")
                .required("Contact No is required!"),
            roomIndex: yup
                .string("Name must be a word!")
                .required("Room is required!"),
            rateId: yup
                .string("Name must be a word!")
                .required("Rate is required!")
        });
        return schema;
    }
})(Walkin);

export default withStyles(styles)(WithFormik);
