import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";

//components
import BookingLayout from "../components/BookingLayout";
import DatePicker from "../components/DatePicker";
import GuestInfo from "./GuestInfo";
import Confirmation from "./Confirmation";
import RoomInfo from "./RoomInfo";

import * as yup from "yup";
import { withFormik } from "formik";
import moment from "moment";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";
import { GET } from "../utils/restUtils";

class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            selectedRoomsUnavailable: false,
            datesFullyBooked: false,
            snackBar: false,
            snackBarMessage: null,
            validatedSteps: [false, false, false, false],

            handleDialog: false,
            dialogType: null,
            submitting: false
        };
    }

    async componentDidMount() {
        let token = localStorage.getItem('login')
        let { data } = await GET(`/api/user`);
        let user = data;
        console.log(user)
        console.log(user === true)
        if(user && !this.props.match.path === '/booking') this.props.history.replace('/booking')
    }

    setStateValue = value => {
        this.setState({ ...value });
    };

    getSteps = () => {
        return [
            {
                title: "Check-in & Check-out date",
                icon: <CalendarTodayOutlinedIcon style={{ margin: "10px 0" }} />
            },
            {
                title: "Select Rooms & Rates",
                icon: <HotelOutlinedIcon style={{ margin: "10px 0" }} />
            },
            {
                title: "Guest Information",
                icon: <PersonOutlinedIcon style={{ margin: "10px 0" }} />
            },
            {
                title: "Booking Confirmation",
                icon: <CheckOutlinedIcon style={{ margin: "10px 0" }} />
            }
        ];
    };

    handleBack = e =>
        this.setState({
            activeStep: this.state.activeStep - 1,
            datesFullyBooked: false
        });

    handleNext = async e => {
        await this.props.validateForm();
        let validatedSteps = this.state.validatedSteps;
        validatedSteps[this.state.activeStep] = true;
        this.setState({ validatedSteps });
        if (this.state.activeStep !== 3) {
            switch (this.state.activeStep) {
                case 1:
                    if (!this.state.datesFullyBooked) {
                        if (this.props.errors.selectedRooms) {
                            console.log("hey! wrong!");
                            this.setState({
                                snackBarMessage: (
                                    <span>
                                        Please select at <strong style={{ color: "#f50057" }}>least</strong> 1 room.
                                    </span>
                                ),
                                snackBar: true
                            });
                        } else {
                            console.log("we are cool!");
                            this.setState({
                                activeStep: this.state.activeStep + 1
                            });
                        }
                    }
                    break;
                case 2:
                    if (this.props.isValid)
                        try {
                            await axios.post("/api/user/checkemail", {
                                email: this.props.values.email
                            });
                            this.setState({
                                activeStep: this.state.activeStep + 1
                            });
                        } catch (err) {
                            if (err.response.data.code === "EmailHasTaken") {
                                this.props.setFieldError("email", "Email has already taken");
                                this.setState({
                                    snackBarMessage: (
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            {`Email already exist, enter other email! `}
                                        </span>
                                    ),
                                    snackBar: true
                                });
                            }
                        }
                    break;
                default:
                    this.setState({ activeStep: this.state.activeStep + 1 });
                    break;
            }
        } else {
            this.submitBooking();
        }
    };

    submitBooking = async () => {
        try {
            this.setState({ submitting: true });
            let { values } = this.props;
            let { data } = await axios.post("/api/booking", {
                honorific: values.honorific,
                firstname: values.firstname,
                middlename: values.middlename,
                lastname: values.lastname,
                address: values.address,
                country: values.country,
                email: values.email,
                contactno: "+63" + values.contactno,
                selectedRooms: values.selectedRooms,
                newAccount: true,
                checkInDate: moment(values.checkInDate).format("YYYY-MM-DD"),
                checkOutDate: moment(values.checkOutDate).format("YYYY-MM-DD"),
                arrival: moment(values.timeArrival).format("YYYY-MM-DD HH:mm:ss")
            });
            // this.props.history.push("/booking");

            this.setState({ submitting: false });
            this.handleBookingPrompt("SUCCESS");
        } catch (err) {
            this.setState({ submitting: false });
            if (err.response.data.message === "SelectedRoomsUnavailable") {
                console.log("show dialog ");
                const { selectedRooms, ranOutRooms } = err.response.data.body;
                this.setState({
                    selectedRoomsUnavailable: true,
                    selectedRooms,
                    ranOutRooms
                });
            } else if (err.response.data.exception === "Swift_TransportException") {
            } else {
                this.handleBookingPrompt("ERROR");
            }
        }
    };

    getContents = activeStep => {
        switch (activeStep) {
            case 0:
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "5%"
                        }}
                    >
                        <Paper
                            style={{
                                padding: "20px",
                                backgroundColor: "#E6E6E6"
                            }}
                        >
                            <DatePicker setStateValue={this.setStateValue} {...this.props} validateCalled={this.state.validatedSteps[0]} />
                        </Paper>
                    </div>
                );
            case 1:
                return (
                    <RoomInfo
                        setStateValue={this.setStateValue}
                        {...this.props}
                        datesFullyBooked={this.state.datesFullyBooked}
                        validateCalled={this.state.validatedSteps[1]}
                    />
                );
            case 2:
                return <GuestInfo setStateValue={this.setStateValue} {...this.props} validateCalled={this.state.validatedSteps[2]} />;
            case 3:
                return <Confirmation setStateValue={this.setStateValue} {...this.props} validateCalled={this.state.validatedSteps[3]} />;
        }
    };

    handleCloseSnackBar = () => this.setState({ snackBar: false });

    handleBookingPrompt = dialogType => {
        this.setState({
            handleDialog: true,
            dialogType
        });
    };

    closeBookingPrompt = () => {
        if (this.state.dialogType === "ERROR") {
            this.setState({
                activeStep: 0,
                handleDialog: false,
                dialogType: null
            });
        } else {
            //reset
            window.location.reload();
        }
    };

    render() {
        let steps = this.getSteps();
        let { activeStep } = this.state;

        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = this.props;

        if (this.state.selectedRoomsUnavailable) {
            return (
                <BookingLayout {...this.props}>
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <Typography style={{ fontSize: "4em" }}>Opppss, Sorry</Typography>
                        <Typography style={{ fontSize: "2em" }}>
                            The following rooms are no longer available on <br />
                            {moment(values.checkInDate).format("MMMM D, YYYY")}
                            &nbsp;-&nbsp;
                            {moment(values.checkOutDate).format("MMMM D, YYYY")}
                        </Typography>
                        <br />
                        <div>
                            {this.state.ranOutRooms.map((el, i, array) => {
                                return (
                                    <Typography style={{ fontSize: "2em" }} component="span">
                                        {el.name}
                                        {array.length === 2 && i != array.length - 1
                                            ? " and "
                                            : array.length > 0 && i != array.length - 2
                                            ? i != array.length - 1
                                                ? ", "
                                                : null
                                            : " and "}
                                    </Typography>
                                );
                            })}
                        </div>
                        <br />
                        <Typography style={{ fontSize: "2em" }}>Please go back &amp; change the booking details.</Typography>
                        <br />
                        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
                            Refresh
                        </Button>
                    </div>
                </BookingLayout>
            );
        } else
            return (
                <div>
                    <BookingLayout {...this.props}>
                        <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: "#f7f7f7" }}>
                            {steps.map(label => (
                                <Step key={label.title}>
                                    <StepLabel>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            {label.icon}
                                            {label.title}
                                        </div>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {this.state.selectedRoomsUnavailable ? <div></div> : <div>{this.getContents(activeStep)}</div>}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                margin: "50px 0"
                            }}
                        >
                            <div>
                                <Button style={{ marginRight: 20 }} onClick={this.handleBack} disabled={this.state.submitting || activeStep === 0}>
                                    Back
                                </Button>
                                <Button
                                    style={{ marginLeft: 20 }}
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    disabled={this.state.datesFullyBooked || this.state.submitting}
                                >
                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    {this.state.submitting && <CircularProgress size={10} style={{ marginLeft: 10 }} />}
                                </Button>
                            </div>
                        </div>
                    </BookingLayout>
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
                                <Icon color="secondary" style={{ marginRight: 10 }}>
                                    warning
                                </Icon>
                                {this.state.snackBarMessage}
                            </span>
                        }
                        ClickAwayListenerProps={{ onClickAway: () => null }}
                        TransitionComponent={Slide}
                        action={[
                            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleCloseSnackBar}>
                                <Icon>close</Icon>
                            </IconButton>
                        ]}
                    />
                    <Dialog
                        open={this.state.handleDialog}
                        onClose={this.closeBookingPrompt}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {this.state.dialogType === "ERROR" ? "Something went wrong" : "Booking has made Successfully"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.dialogType === "ERROR"
                                    ? "Failed to add the booking, Please check the rooms again or Try again later."
                                    : "Thank you for booking with us, your booking has been successfully made. We have sent you an email with a QR code. Please present the QR code when you check-in"}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeBookingPrompt} color="primary" autoFocus>
                                Okay
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
    }
}

export default withFormik({
    mapPropsToValues: props => {
        return {
            honorific: "",
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            country: "",
            email: "",
            confirmEmail: "",
            contactno: "",
            numberOfNights: 0,
            selectedRooms: [],
            newAccount: false,
            checkInDate: moment(),
            checkOutDate: moment().add({ day: 1 }),
            timeArrival: moment()
        };
    },

    validationSchema: function() {
        let schema = yup.object().shape({
            honorific: yup.string("Honorific must be a word!").required("Honorific is required!"),
            firstname: yup.string("First name must be a word!").required("First Name is required!"),
            middlename: yup.string("Middle name must be a word!").required("Middle Name is required!"),
            lastname: yup.string("Last name must be a word!").required("Last Name is required!"),
            address: yup.string("Address must be a word!").required("Address is required!"),
            country: yup.string("Country must be a word!").required("Country is required!"),
            email: yup
                .string("Email address must be a word!")
                .email("Please provide a valid email address!")
                .required("Email address is required!"),
            contactno: yup
                .string()
                .required("Contact number is required!")
                .length(10, "Contact number must be 10 digits"),
            confirmEmail: yup
                .string()
                .required("Email confirmation is required!")
                .oneOf([yup.ref("email"), null], "Email does not match!"),
            selectedRooms: yup.array().min(1, "Please select at least 1 room")
        });
        return schema;
    },
    validateOnChange: true,
    validateOnBlur: true,
    isInitialValid: false
})(Booking);
