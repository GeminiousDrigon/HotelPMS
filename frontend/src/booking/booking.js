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

//components
import BookingLayout from "../components/BookingLayout";
import DatePicker from "../components/DatePicker";
import GuestInfo from "./GuestInfo";
import Confirmation from "./Confirmation";
import RoomInfo from "./RoomInfo";

export default class Booking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0
        };
    }

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

    handleBack = e => this.setState({ activeStep: this.state.activeStep - 1 });

    handleNext = e => this.setState({ activeStep: this.state.activeStep + 1 });

    getContents = activeStep => {
        switch (activeStep) {
            case 0:
                return (
                    <Paper
                        style={{
                            width: "90%",
                            marginLeft: "5%",
                            backgroundColor: "#DCDCDC"
                        }}
                    >
                        <DatePicker />
                    </Paper>
                );
            case 1:
                return <RoomInfo />;
            case 2:
                return <GuestInfo />;
            case 3:
                return <Confirmation />;
        }
    };
    render() {
        let steps = this.getSteps();
        let { activeStep } = this.state;
        return (
            <div>
                <BookingLayout {...this.props}>
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        style={{
                            width: "50%",
                            margin: "auto"
                        }}
                    >
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
                    <div>{this.getContents(activeStep)}</div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            margin: "50px 100px 50px"
                        }}
                    >
                        <div>
                            <Button
                                style={{ marginRight: 20 }}
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                style={{ marginLeft: 20 }}
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext}
                            >
                                {activeStep === steps.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </Button>
                        </div>
                    </div>
                </BookingLayout>
            </div>
        );
    }
}
