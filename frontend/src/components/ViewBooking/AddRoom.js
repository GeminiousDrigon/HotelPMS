import React, { Component } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import moment from "moment";
import InfoIcon from "@material-ui/icons/Info";
import { GET,PUT,POST,DELETE} from '../../utils/restUtils'

export default class AddRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableRooms: [],
            rates: [],
            roomTypes: [],
            selectedRoomType: "",
            selectedRate: "",
            fetchingRoomTypes: true,
            fetchingRates: false,
            fetchingRooms: false,
            failed: false,
            isFullyBooked: false,
            submitting: false
        };
    }

    componentDidMount() {
        this.getRoomTypes();
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.addingRooms, prevProps.addingRooms)
        if (this.props.addingRooms && !prevProps.addingRooms) {
            this.getRoomTypes();
        }
    }

    getRoomTypes = async () => {
        try {
            let checkin = moment(this.props.checkInDate).format("YYYY-MM-DD");
            let checkout = moment(this.props.checkOutDate).format("YYYY-MM-DD");
            let { data } = await GET("/api/roomtype/available", {
                params: {
                    checkin,
                    checkout
                }
            });
            let roomTypes = data.filter(roomtype => !roomtype.unbookable);
            this.setState({ roomTypes, fetchingRoomTypes: false });
        } catch (err) {
            console.log(err);
            this.setState({ fetchingRoomTypes: false });
            if (err.response.data.message === "FullyBookedRooms") {
                this.setState({ isFullyBooked: true });
            }
        }
    };

    handleChangeRoomTypes = async e => {
        try {
            // get all rooms
            // set the rates
            // let { selectedRoomType } = this.state;
            this.setState({
                fetchingRates: true,
                fetchingRooms: true
            });
            let selectedRoomType = e.target.value;
            let checkin = "2019-10-08";
            let checkout = "2019-10-09";
            let { data } = await GET("/api/room/available", {
                params: {
                    checkin,
                    checkout,
                    room_type_id: selectedRoomType
                }
            });
            data = data.map(room => {
                room.selected = false;
                return room;
            });
            let roomType = await GET("/api/roomtype/" + e.target.value);

            this.setState({
                selectedRoomType: e.target.value,
                rates: roomType.data.rates,
                availableRooms: data,
                fetchingRates: false,
                fetchingRooms: false
            });
        } catch (err) {
            console.log(err);
            this.setState({
                fetchingRates: false,
                fetchingRooms: false
            });
        }
    };

    handleChangeRate = e => {
        this.setState({ selectedRate: e.target.value });
    };

    onSelectRoom = e => {
        let id = e.target.value;
        let { availableRooms } = this.state;
        availableRooms = availableRooms.map(room => {
            if (room.id === id) {
                room.selected = !room.selected;
                return room;
            } else {
                return room;
            }
        });
        // console.log(availableRooms);
        this.setState({ availableRooms });
    };

    onAddRooms = async () => {
        try {
            this.setState({ submitting: true });
            let { availableRooms } = this.state;
            let selectedRooms = availableRooms.filter(room => room.selected);
            console.log(selectedRooms);
            if (selectedRooms.length > 0) {
                this.setState({ failed: false, submittingAddRoom: true });
                //add one rooms to the booking
                let { bookingId } = this.props;
                let { selectedRoomType, selectedRate } = this.state;
                let rate = await GET(`/api/rate/${selectedRate}`);
                rate = rate.data;
                let rooms = selectedRooms.map((room, i) => {
                    return {
                        room_type_id: selectedRoomType,
                        room_id: room.id,
                        price: rate.price,
                        rateId: rate.id,
                        with_breakfast: rate.breakfast,
                        guest_no: 1,
                        booking_id: bookingId
                    };
                });
                await POST(`/api/booking/${bookingId}/room`, {
                    rooms
                });
                this.setState({ submitting: false });
                this.onCancelAdd(true);
                this.props.openSnackBar(
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <InfoIcon style={{ marginRight: "5" }} /> {` Successfully Added Room! `}
                    </span>
                );
            } else {
                this.setState({
                    failed: true,
                    submitting: false
                });
            }
        } catch (err) {
            this.setState({
                failed: true,
                submitting: false
            });
        }
    };

    onCancelAdd = refresh => {
        this.setState(
            {
                availableRooms: [],
                rates: [],
                roomTypes: [],
                selectedRoomType: "",
                selectedRate: "",
                fetchingRoomTypes: true,
                fetchingRates: false,
                fetchingRooms: false,
                failed: false,
                isFullyBooked: false
            },
            () => this.props.cancelAddRoom(refresh)
        );
    };

    render() {
        let { selectedRoomType, selectedRate, availableRooms, submitting } = this.state;
        let selectedRooms = availableRooms.filter(room => room.selected).length;
        if (this.state.isFullyBooked) {
            return (
                //TODO improve design
                <div style={{ padding: "30px 0" }}>
                    <Typography variant="h6" color="textSecondary" align="center">
                        No more rooms available.
                    </Typography>
                </div>
            );
        } else {
            if (this.state.fetchingRoomTypes) {
                return (
                    <div style={{ padding: "50px 0", textAlign: "center" }}>
                        <CircularProgress />
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            margin: "10px 0",
                            padding: "0 20px",
                            width: "100%"
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">Room type</InputLabel>
                                    <Select
                                        value={this.state.selectedRoomType}
                                        // onChange={handleChange}
                                        onChange={this.handleChangeRoomTypes}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                        disabled={submitting}
                                    >
                                        {this.state.roomTypes.map((roomType, id) => {
                                            return (
                                                <MenuItem value={roomType.id} key={roomType.id}>
                                                    {roomType.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel htmlFor="age-simple">
                                        Rate
                                        {this.state.fetchingRates && <CircularProgress style={{ marginLeft: 5 }} size={15} />}
                                    </InputLabel>
                                    <Select
                                        value={this.state.selectedRate}
                                        onChange={this.handleChangeRate}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                        disabled={this.state.selectedRoomType === "" || submitting}
                                    >
                                        {this.state.rates.map((rate, i) => {
                                            return (
                                                <MenuItem value={rate.id} key={rate.id}>
                                                    {rate.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {this.state.selectedRoomType && (
                                <Grid item xs={12}>
                                    <div>
                                        <FormControl component="fieldset" style={{ width: "100%" }} error={this.state.failed}>
                                            <FormLabel component="legend">Select Rooms</FormLabel>
                                            <FormGroup>
                                                {this.state.fetchingRooms ? (
                                                    <div
                                                        style={{
                                                            padding: "20px 0",
                                                            width: "100%",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        <CircularProgress size={30} />
                                                    </div>
                                                ) : (
                                                    <Grid container>
                                                        {this.state.availableRooms.map((room, i) => {
                                                            return (
                                                                <Grid item xs={12} md={4} key={room.id}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={room.selected}
                                                                                onChange={this.onSelectRoom}
                                                                                disabled={submitting}
                                                                                value={room.id}
                                                                                color="primary"
                                                                            />
                                                                        }
                                                                        label={room.room_number + " " + room.room_type.name}
                                                                    />
                                                                </Grid>
                                                            );
                                                        })}
                                                    </Grid>
                                                )}
                                            </FormGroup>
                                            {this.state.failed && <FormHelperText>You must select one(1) or more rooms.</FormHelperText>}
                                        </FormControl>
                                    </div>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginTop: 25 }}
                                        onClick={this.onCancelAdd}
                                        style={{
                                            marginRight: 5
                                        }}
                                        size="small"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginTop: 25 }}
                                        style={{
                                            marginLeft: 5
                                        }}
                                        onClick={this.onAddRooms}
                                        size="small"
                                        disabled={!(selectedRooms > 0 && selectedRoomType && selectedRate) || submitting}
                                    >
                                        Submit
                                        {submitting && <CircularProgress style={{ marginLeft: 5 }} size={15} />}
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                );
            }
        }
    }
}
