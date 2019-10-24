import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//icons
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import GuestInfoItem from "./GuestInfoItem.js";
import { CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

export default class GuestInfo extends Component {
    constructor(props) {
        super(props);
        let guests;
        if (props.guests.length > 0) {
            guests = props.guests;
        } else {
            guests = [
                {
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    address: "",
                    email: "",
                    contactno: "",
                    country: ""
                }
            ];
        }

        this.state = {
            guests: guests,
            selectedGuest: 0,
            fetching: props.guests.length > 0 ? true : false,
            guest: {
                firstname: "",
                middlename: "",
                lastname: "",
                address: "",
                email: "",
                contactno: "",
                country: ""
            },
            //additional bed
            addBedDialog: false,
            addBedValue: 0,
            fetchingAddBed: false,
            submittingAddBed: false,
            addBedFailed: false
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.selectedRoom === this.props.id) {
    //         if (this.props.guests.length > 0) {
    //             // console.log("getting " + this.props.guests[0].id);
    //             if (prevProps.selectedRoom !== this.props.selectedRoom) {
    //                 // console.log("get guest");
    //                 let { id } = this.props.guests[this.state.selectedGuest];
    //                 this.getGuest(id);
    //             }
    //         }
    //     } else {
    //         if (!this.state.fetching) {
    //             this.setState({
    //                 fetching: true
    //             });
    //         }
    //     }
    // }

    onAddGuest = () => {
        let { guests } = this.state;
        guests = guests.concat({
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            email: "",
            contactno: "",
            country: ""
        });
        this.setState({ guests });
    };

    // getGuest = async id => {
    //     try {
    //         let { fetching } = this.state;
    //         if (!fetching) this.setState({ fetching: true });
    //         let { data } = await axios.get("/api/guest/" + id);
    //         this.setState({ guest: { ...data }, fetching: false });
    //     } catch (err) {
    //         this.setState({ fetching: false });
    //         console.log(err);
    //     }
    // };

    onSelectGuest = selectedGuest => {
        this.setState({ selectedGuest });
    };

    //additional bed dialog

    handleAddBedDialog = () => this.setState({ addBedDialog: !this.state.addBedDialog });

    handleCloseAddBedDialog = () => {
        this.setState({ addBedDialog: false, addBedValue: 0, fetchingAddBed: false, submittingAddBed: false, room: {} });
    };

    getBedDetails = async params => {
        try {
            //get bed details
            this.setState({ fetchingAddBed: true });
            let { id } = this.props.room;
            this.setState({ fetchingAddBed: true });
            let { data } = await axios.get("/api/bookroom/" + id);
            this.setState({ addBedValue: data.additional_beds, fetchingAddBed: false });
        } catch (err) {
            this.setState({
                addBedFailed: true,
                fetchingAddBed: false
            });
        }
    };

    submitAddBed = async values => {
        try {
            //submit bed
            let { room, room_type, guests, ...bookRoom } = this.props.room;
            this.setState({ submittingAddBed: true });
            let bookroom = {
                ...bookRoom,
                additional_beds: values.beds
            };
            console.log(bookroom);
            await axios.put("/api/bookroom/" + bookroom.id, bookroom);
            this.props.getRooms();
            this.setState({ submittingAddBed: false });
            this.handleCloseAddBedDialog();
        } catch (err) {
            this.setState({ submittingAddBed: false });
            this.setState({
                addBedFailed: true
            });
        }
    };

    render() {
        let { guests, fetching, submittingAddBed } = this.state;
        let { room } = this.props;
        let content = this.state.guests.map((guest, el) => {
            return (
                <GuestInfoItem
                    guest={guest}
                    getGuest={this.getGuest}
                    key={guest.id ? guest.id : el}
                    show={el === this.state.selectedGuest && this.props.id === this.props.selectedRoom}
                    roomId={this.props.id}
                    openSnackBar={this.props.openSnackBar}
                />
            );
        });
        return (
            <>
                <div style={{ width: "100%" }}>
                    <div style={{ margin: "20px 0", display: "flex", justifyContent: "space-between" }}>
                        <Typography>Additional Beds: {room.additional_beds}</Typography>
                        <Button variant="outlined" size="small" color="primary" onClick={this.handleAddBedDialog}>
                            Add Bed
                        </Button>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {guests.map((guest, i) => {
                            return (
                                <Button
                                    variant="text"
                                    color={i === this.state.selectedGuest ? "primary" : "default"}
                                    onClick={() => this.onSelectGuest(i)}
                                    key={guest.id ? guest.id : i}
                                >
                                    <PersonIcon />
                                    {i + 1}
                                </Button>
                            );
                        })}
                        <Button variant="text" color="primary" onClick={this.onAddGuest}>
                            <PersonAddIcon />
                        </Button>
                    </div>
                    {content}
                </div>
                <Dialog
                    open={this.state.addBedDialog}
                    onClose={this.handleCloseAddBedDialog}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                    maxWidth="sm"
                    onEnter={this.getBedDetails}
                >
                    <Formik
                        initialValues={{ beds: this.state.addBedValue }}
                        onSubmit={(values, actions) => {
                            this.submitAddBed(values);
                        }}
                        enableReinitialize
                        render={({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <>
                                <DialogTitle id="form-dialog-title">Additional Beds</DialogTitle>
                                <DialogContent>
                                    {this.state.fetchingAddBed ? (
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                        <>
                                            <DialogContentText>Please enter the number of beds.</DialogContentText>
                                            <TextField
                                                id="beds"
                                                placeholder="Additional beds"
                                                label="Additional beds"
                                                variant="outlined"
                                                type="number"
                                                margin="dense"
                                                fullWidth
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.beds}
                                                helperText={touched.beds && errors.beds ? errors.beds : ""}
                                                error={touched.beds && errors.beds ? true : false}
                                                disabled={submittingAddBed}
                                            />
                                        </>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseAddBedDialog} color="primary" disabled={submittingAddBed}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} color="primary" disabled={submittingAddBed}>
                                        Add
                                        {submittingAddBed && <CircularProgress size={10} style={{ marginLeft: 10 }} />}
                                    </Button>
                                </DialogActions>
                            </>
                        )}
                    />
                </Dialog>
            </>
        );
    }
}
