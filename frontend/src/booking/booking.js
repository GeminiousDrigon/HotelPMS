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

class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            selectedRoomsUnavailable: false,
            datesFullyBooked: false
        };
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

    handleBack = e => this.setState({ activeStep: this.state.activeStep - 1, datesFullyBooked: false });

    handleNext = e => {
        if (this.state.activeStep !== 3) {
            this.setState({ activeStep: this.state.activeStep + 1 });
        } else {
            this.submitBooking();
        }
    };

    submitBooking = async () => {
        try {
            let { values } = this.props;
            let { data } = await axios.post("/api/booking", {
                honorific: values.honorific,
                firstname: values.firstname,
                middlename: values.middlename,
                lastname: values.lastname,
                address: values.address,
                country: values.country,
                email: values.email,
                contactno: "+639" + values.contactno,
                selectedRooms: values.selectedRooms,
                newAccount: true,
                checkInDate: moment(values.checkInDate).format("YYYY-MM-DD"),
                checkOutDate: moment(values.checkOutDate).format("YYYY-MM-DD")
            });
            console.log(data);
        } catch (err) {
            if (err.response.data.message === "SelectedRoomsUnavailable") {
                console.log("show dialog ");
                const { selectedRooms, ranOutRooms } = err.response.data.body;
                this.setState({
                    selectedRoomsUnavailable: true,
                    selectedRooms,
                    ranOutRooms
                });
            }
        }
    };

    getContents = activeStep => {
        switch (activeStep) {
            case 0:
                return (
                    <Paper style={{ padding: "30px" }}>
                        <DatePicker setStateValue={this.setStateValue} {...this.props} />
                    </Paper>
                );
            case 1:
                return <RoomInfo setStateValue={this.setStateValue} {...this.props} datesFullyBooked={this.state.datesFullyBooked} />;
            case 2:
                return <GuestInfo setStateValue={this.setStateValue} {...this.props} />;
            case 3:
                return <Confirmation setStateValue={this.setStateValue} {...this.props} />;
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
                            {moment(values.checkInDate).format("MMMM D, YYYY")}&nbsp;-&nbsp;{moment(values.checkOutDate).format("MMMM D, YYYY")}
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
                                <Button style={{ marginRight: 20 }} disabled={activeStep === 0} onClick={this.handleBack}>
                                    Back
                                </Button>
                                <Button style={{ marginLeft: 20 }} variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                            </div>
                        </div>
                    </BookingLayout>
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
            // honorific: yup.string("Honorific must be a word!").required("Honorific is required!"),
            // firstname: yup.string("Name must be a word!").required("First Name is required!"),
            // middlename: yup.string("Name must be a word!").required("Middle Name is required!"),
            // lastname: yup.string("Name must be a word!").required("Last Name is required!"),
            // address: yup.string("Name must be a word!").required("Address is required!"),
            // country: yup.string("Name must be a word!").required("Country is required!"),
            // email: yup.string("Name must be a word!").required("Gmail is required!"),
            // contactno: yup.string("Name must be a word!").required("Contact No is required!"),
            // roomTypeId: yup.string().required("Room type is required!"),
            // roomId: yup.string().required("Room is required!"),
            // rateId: yup.string().required("Rate is required!"),
            // numberOfGuest: yup
            //     .number()
            //     .required("Number of guest is required!")
            //     .min(1, "Number of guest must be more than one(1)!"),
            // confirmEmail: yup
            //     .string()
            //     .required("Email confirmation is required!")
            //     .oneOf([yup.ref("email"), null], "Email does not match!")
        });
        return schema;
    }
})(Booking);
