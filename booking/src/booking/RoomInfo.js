import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    validate
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Carousel from "react-bootstrap/Carousel";

import axios from "axios";
import { CircularProgress, Divider } from "@material-ui/core";
import RateItem from "./RateItem";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import moment from "moment";
import RoomTypeItem from "./RoomTypeItem";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

export default class RoomInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            totalCharge: 0,
            selectedType: null,
            selectedRooms: [],
            roomTypes: [],
            validateCalled: false,
            confirmReset: false,
            snackBar: false
        };
    }

    componentDidMount() {
        this.getRoomTypes();
    }

    getRoomTypes = async () => {
        try {
            let { values } = this.props;
            let checkin = moment(values.checkInDate).format("YYYY-MM-DD");
            let checkout = moment(values.checkOutDate).format("YYYY-MM-DD");
            let { data } = await axios.get(
                `/api/roomtype/available?checkin=${checkin}&checkout=${checkout}`
            );
            let selectedType = {};
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (!element.unbookable) {
                    selectedType = element;
                    break;
                }
            }
            this.setState({
                roomTypes: data,
                selectedType,
                fetching: false
            });
        } catch (err) {
            if ((err.response.data.message = "FullyBookedRooms")) {
                this.props.setStateValue({
                    datesFullyBooked: true
                });
            }
        }
    };

    onChangeType = selectedType => {
        this.setState({ selectedType });
    };

    onAddRoom = room => {
        let { selectedType } = this.state;

        //check if it exceeds available Rooms
        let { selectedRooms } = this.props.values;
        let { amenities, rates, ...roomType } = selectedType;
        roomType.rate = room;
        let numberOfRooms = selectedRooms.filter(
            selectedRoom => selectedRoom.id === roomType.id
        );
        console.log(numberOfRooms);
        let { checkInDate, checkOutDate } = this.props.values;
        let numberOfDays = checkOutDate.diff(checkInDate, "days");
        console.log(numberOfDays);
        if (numberOfRooms.length < roomType.availableRooms) {
            let rooms = this.props.values.selectedRooms.concat(roomType);
            // console.log(rooms);
            let totalCharge = rooms.reduce((output, room, i) => {
                console.log(room);
                let roomRate = numberOfDays * room.rate.price;
                return output + roomRate;
            }, 0);
            this.setState({ totalCharge });
            this.props.setFieldValue("selectedRooms", rooms);
        } else {
            this.setState({
                snackBarMessage: (
                    <span>
                        {`You have selected the maximum available rooms for `}
                        <strong>{`${roomType.name}`}</strong>.
                        {`Available rooms:` + roomType.availableRooms}
                    </span>
                ),
                snackBar: true
            });
        }
    };

    removeRoom = index => {
        let selectedRooms = this.props.values.selectedRooms;
        selectedRooms.splice(index, 1);
        let newSelectedRoom = [...selectedRooms];
        this.props.setFieldValue("selectedRooms", newSelectedRoom);
    };

    handleReset = () => {
        this.setState({ confirmReset: !this.state.confirmReset });
    };

    onConfirmReset = () => {
        this.setState({ selectedRooms: [], confirmReset: false });
    };

    handleCheckinDate = date => {
        let checkInDate = moment(date);
        let checkOutDate = moment(this.props.values.checkOutDate);

        if (checkInDate.isSameOrAfter(checkOutDate, "days")) {
            checkOutDate = moment(date).add({ days: 1 });
            let diff = checkOutDate.diff(checkInDate, "day");
            console.log("same or after", diff);

            this.props.setFieldValue("checkInDate", moment(date));
            this.props.setFieldValue("checkOutDate", checkOutDate);
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            this.props.setFieldValue("checkInDate", moment(date));
            this.props.setFieldValue("numberOfNights", diff);
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
                        <strong style={{ color: "#f50057" }}>
                            same
                        </strong> or{" "}
                        <strong style={{ color: "#f50057" }}>before</strong> the
                        checkin date!
                    </span>
                ),
                snackBar: true
            });
        } else {
            let diff = checkOutDate.diff(checkInDate, "day");
            this.props.setFieldValue("checkOutDate", moment(date));
            this.props.setFieldValue("numberOfNights", diff);
        }
    };

    handleCloseSnackBar = () => this.setState({ snackBar: false });

    handleViewImages = () => this.setState({ viewImages: true });

    handleCloseImages = () => this.setState({ viewImages: false });

    render() {
        let { selectedType, validateCalled } = this.state;

        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
        } = this.props;

        if (this.props.datesFullyBooked) {
            return (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <Typography style={{ fontSize: "4em" }}>
                        Opppss, Sorry
                    </Typography>
                    <Typography style={{ fontSize: "2em" }}>
                        We are fully booked on dates
                    </Typography>
                    <Typography style={{ fontSize: "2em" }}>
                        {moment(values.checkInDate).format("MMMM D, YYYY")}
                        &nbsp;-&nbsp;
                        {moment(values.checkOutDate).format("MMMM D, YYYY")}
                    </Typography>
                    <br />
                    <Typography style={{ fontSize: "2em" }}>
                        Please go back &amp; change the dates.
                    </Typography>
                </div>
            );
        } else if (this.state.fetching) {
            return (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                    <CircularProgress />
                </div>
            );
        } else
            return (
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
                            <div>
                                <Typography variant="h5" gutterBottom>
                                    Select Room(s)
                                </Typography>
                                {this.state.roomTypes.map((roomType, i) => {
                                    return (
                                        <RoomTypeItem
                                            roomType={roomType}
                                            onChangeType={this.onChangeType}
                                            selectedType={selectedType}
                                        />
                                    );
                                })}
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <Paper
                                style={{
                                    padding: 25,
                                    marginBottom: 25,
                                    backgroundColor: "#e9f0fa"
                                }}
                            >
                                {selectedType.images.length > 0 ? (
                                    <div>
                                        <img
                                            src={selectedType.images[0].src}
                                            style={{
                                                width: "100%",
                                                cursor: "pointer"
                                            }}
                                            onClick={this.handleViewImages}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <PhotoLibraryIcon
                                            style={{
                                                fontSize: 100,
                                                marginBottom: 10
                                            }}
                                            color="primary"
                                        />
                                        <Typography component="span">
                                            No images
                                        </Typography>
                                    </div>
                                )}

                                <Typography
                                    variant="h5"
                                    component="div"
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "300"
                                    }}
                                >
                                    {this.state.selectedType.name}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    Description:
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    gutterBottom
                                >
                                    {selectedType.description}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    Room size:{" "}
                                    {this.state.selectedType.room_size +
                                        this.state.selectedType.room_size_unit}
                                    <sup>2</sup>
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    Bed type: {this.state.selectedType.bed_type}
                                </Typography>
                                <Typography variant="subtitle2" component="div">
                                    Number of beds:{" "}
                                    {this.state.selectedType.bed_no}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    style={{
                                        marginTop: "4%",
                                        marginBottom: "3%"
                                    }}
                                >
                                    Facilities:
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        flexWrap: "wrap",
                                        color: "#0ab21b"
                                    }}
                                >
                                    {this.state.selectedType.amenities.map(
                                        (amenity, o) => {
                                            return (
                                                <span
                                                    style={{
                                                        display: "flex",
                                                        marginRight: 15
                                                    }}
                                                >
                                                    <Icon
                                                        component="span"
                                                        color="#0ab21b"
                                                        fontSize="small"
                                                    >
                                                        {amenity.icon}
                                                    </Icon>
                                                    <Typography
                                                        component="span"
                                                        variant="caption"
                                                    >
                                                        {amenity.name}
                                                    </Typography>
                                                </span>
                                            );
                                        }
                                    )}
                                </div>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    variant="h5"
                                    color="primary"
                                    style={{
                                        marginTop: "4%",
                                        marginBottom: "3%"
                                    }}
                                >
                                    Available This Room(s):{" "}
                                    {selectedType.availableRooms}
                                </Typography>

                                <Typography
                                    style={{
                                        marginTop: "5%",
                                        marginBottom: "4%"
                                    }}
                                    variant="h5"
                                    gutterBottom
                                >
                                    Available This Room Rates
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid xs={12} sm={7}>
                                        <div>
                                            {this.state.selectedType &&
                                                this.state.selectedType.rates.map(
                                                    (rate, i) => {
                                                        return (
                                                            <RateItem
                                                                key={rate.id}
                                                                rate={rate}
                                                                validateCalled={
                                                                    validateCalled
                                                                }
                                                                onAddRoom={
                                                                    this
                                                                        .onAddRoom
                                                                }
                                                                roomTypeId={
                                                                    this.state
                                                                        .selectedType
                                                                        .id
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: 20
                                }}
                            >
                                <Paper
                                    style={{
                                        padding: 25,
                                        backgroundColor: "#3c3b3b",
                                        color: "white"
                                    }}
                                >
                                    <div style={{ marginBottom: 25 }}>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: 300 }}
                                            gutterBottom
                                        >
                                            Booking Dates
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            style={{
                                                fontWeight: 50,
                                                color: "gold"
                                            }}
                                        >
                                            Check-in Date:
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: 300 }}
                                            align="center"
                                        >
                                            {moment(values.checkInDate).format(
                                                "MMMM DD,  YYYY"
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            style={{
                                                fontWeight: 50,
                                                color: "gold"
                                            }}
                                        >
                                            Check-out Date:
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: 300 }}
                                            align="center"
                                        >
                                            {moment(values.checkOutDate).format(
                                                "MMMM DD,  YYYY"
                                            )}
                                        </Typography>
                                    </div>
                                    <div style={{ marginBottom: 25 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: 2,
                                                maxWidth: 400
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{ fontWeight: 300 }}
                                            >
                                                Rooms Selected
                                            </Typography>
                                            {/* <Tooltip title="Reset">
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={this.handleReset}
                                                >
                                                    <Icon fontSize="small">
                                                        refresh
                                                    </Icon>
                                                </IconButton>
                                            </Tooltip> */}
                                        </div>
                                        {values.selectedRooms.length > 0 ? (
                                            <>
                                                {values.selectedRooms.map(
                                                    (room, i) => (
                                                        <Paper
                                                            style={{
                                                                padding: 15,
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column"
                                                            }}
                                                        >
                                                            <div>
                                                                <Typography
                                                                    variant="h5"
                                                                    style={{
                                                                        fontWeight: 300
                                                                    }}
                                                                >
                                                                    {room.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    style={{
                                                                        fontWeight: 300
                                                                    }}
                                                                >
                                                                    {
                                                                        room
                                                                            .rate
                                                                            .adult
                                                                    }{" "}
                                                                    Adult(s)
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    style={{
                                                                        fontWeight: 300
                                                                    }}
                                                                >
                                                                    {
                                                                        room
                                                                            .rate
                                                                            .name
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    style={{
                                                                        fontWeight: 300
                                                                    }}
                                                                >
                                                                    Price: PHP
                                                                    {
                                                                        room
                                                                            .rate
                                                                            .price
                                                                    }
                                                                </Typography>
                                                                <Button
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    style={{
                                                                        marginTop: 10
                                                                    }}
                                                                    onClick={() =>
                                                                        this.removeRoom(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    remove
                                                                </Button>
                                                            </div>
                                                        </Paper>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <div style={{ margin: "25px 0" }}>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 50,
                                                        color: "#E6E6E6"
                                                    }}
                                                >
                                                    Total Charge
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        fontWeight: 300
                                                    }}
                                                >
                                                    P
                                                    {this.state.totalCharge.toFixed(
                                                        2
                                                    )}
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            style={{
                                                fontWeight: 50,
                                                color: "gold"
                                            }}
                                        >
                                            Total Charge
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            style={{ fontWeight: 300 }}
                                        >
                                            P{this.state.totalCharge.toFixed(2)}
                                        </Typography>
                                    </div>
                                </Paper>
                            </div>
                        </Grid>

                        {/* <div style={{ flexGrow: 1, marginLeft: 10, alignItems: 'flex-start' }}>
                </div> */}
                        <ConfirmDialog
                            title="Are you sure?"
                            content="Are you sure you want to reset your choosen rooms?"
                            open={this.state.confirmReset}
                            onConfirm={this.onConfirmReset}
                            handleClose={this.handleReset}
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
                                    <Icon
                                        color="secondary"
                                        style={{ marginRight: 10 }}
                                    >
                                        warning
                                    </Icon>
                                    {this.state.snackBarMessage}
                                </span>
                            }
                            ClickAwayListenerProps={{ onClickAway: () => null }}
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
                        <Dialog
                            open={this.state.viewImages}
                            fullWidth
                            maxWidth="md"
                            onClose={this.handleViewImages}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <div>
                                    <Carousel>
                                        {selectedType.images.map(image => {
                                            return (
                                                <Carousel.Item>
                                                    <img
                                                        className="d-block w-100"
                                                        src={image.src}
                                                        alt="First slide"
                                                        key={image.filename}
                                                        style={{
                                                            width: "100%",
                                                            height: "auto"
                                                        }}
                                                    />
                                                </Carousel.Item>
                                            );
                                        })}
                                    </Carousel>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={this.handleCloseImages}
                                    color="primary"
                                    autoFocus
                                >
                                    close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </div>
            );
    }
}
