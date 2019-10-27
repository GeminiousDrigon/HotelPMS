import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PaymentIcon from "@material-ui/icons/Payment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AdminLayout from "../components/AdminLayout";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Formik } from "formik";

import Slide from "@material-ui/core/Slide";

import axios from "axios";
import * as yup from "yup";
import moment from "moment";
import AddRoom from "../components/ViewBooking/AddRoom";
import Collapse from "@material-ui/core/Collapse";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GuestInfo from "../components/ViewBooking/GuestInfo";
import Reservation from "../components/ViewBooking/Reservation";
import Icon from "@material-ui/core/Icon";
import Snackbar from "@material-ui/core/Snackbar";
import numeral from "numeral";

const NumeralComponent = React.memo(function Numeral(props) {
    return numeral(props.number).format("0,0.00");
});

export default class ViewBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            failed: false,
            notFound: false,
            booking: {},
            //guest
            guestAnchorEl: null,
            //billing
            addBilling: false,
            paymentAnchorEl: null,
            selectedPayment: null,
            fetchingViewPayment: false,
            initialPayment: 0,
            fetchingPayment: false,
            deletePayment: false,
            deletingPayment: false,

            //adding rooms
            addingRooms: false,
            fetchingRooms: false,
            selectedRoom: "dc38e19b-8dc8-4b3a-88f0-1152b6dfcb3b",

            //reservation
            editReservationDates: false,

            //snackbar
            snackbar: false,
            snackBarMessage: null,

            //status prompt
            statusPrompt: false,
            selectedStatus: "",
            changingStatus: false,

            //balance prompt
            balancePrompt: false
        };
    }

    componentDidMount() {
        this.getBooking();
    }

    getBooking = async () => {
        try {
            this.setState({ fetching: true });
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/booking/${id}`);
            data.total = data.billings.reduce((total, billing) => {
                return total + billing.amount;
            }, 0);
            data.totalPrice = data.rooms.reduce((totalPrice, room) => {
                if (room.additional_beds > 0) {
                    totalPrice = totalPrice + room.additional_beds * 100 + room.price;
                    return totalPrice;
                } else {
                    return totalPrice + room.price;
                }
            }, 0);
            data.balance = data.totalPrice - data.total;
            this.setState({
                booking: { ...data },
                fetched: true,
                fetching: false,
                failed: false,
                notFound: false
            });
        } catch (err) {
            console.log(err);
            if (err.response.data.status === 404)
                this.setState({
                    fetched: false,
                    fetching: false,
                    failed: true,
                    notFound: true
                });
        }
    };

    getBookingDetails = async params => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/booking/${id}?type=detail`);
            let booking = { ...this.state.booking, ...data };
            console.log(booking);
            this.setState({ booking });
        } catch (err) {
            console.log(err);
        }
    };

    getBillings = async () => {
        try {
            this.setState({ fetchingPayment: true });
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/booking/${id}/billing`);
            let booking = { ...this.state.booking };
            booking.billings = data.billings;

            const total = data.billings.reduce((total, billing) => {
                return total + billing.amount;
            }, 0);
            booking.total = total;
            booking.balance = this.state.booking.totalPrice - total;
            this.setState({ booking, fetchingPayment: false });
        } catch (err) {
            console.log(err);
            this.setState({ fetchingPayment: false });
        }
    };

    onAddBilling = async amount => {
        try {
            let { editBilling } = this.state;
            if (editBilling) {
                let { id, booking_id } = this.state.selectedPayment;
                await axios.put(`/api/billing/${id}`, {
                    amount,
                    booking_id
                });
                this.setState({
                    addBilling: false,
                    editBilling: false,
                    fetchingViewPayment: true,
                    paymentAnchorEl: null,
                    selectedPayment: null,
                    initialPayment: 0
                });
                this.getBillings();
            } else {
                let { id } = this.props.match.params;
                await axios.post(`/api/booking/${id}/billing`, {
                    amount
                });
                this.setState({ initialPayment: 0 });
                this.onCloseAddBilling();
                this.getBillings();
            }
        } catch (err) {
            console.log(err);
        }
    };

    onDeleteBilling = async () => {
        try {
            this.setState({ deletingPayment: true });
            let { id } = this.state.selectedPayment;
            await axios.delete(`/api/billing/${id}`);
            this.onCloseDeleteBilling();
            this.getBillings();

            this.setState({ deletingPayment: false });
        } catch (err) {
            this.setState({ deletingPayment: false });
        }
    };

    //add payment dialog actions

    onExitBilling = () => {
        this.setState({
            addBilling: false,
            paymentAnchorEl: null,
            selectedPayment: null,
            fetchingViewPayment: false,
            initialPayment: 0,
            fetchingPayment: false,
            deletePayment: false,
            deletingPayment: false
        });
    };

    onOpenAddBilling = () => {
        this.setState({ addBilling: true });
    };

    onCloseAddBilling = () => {
        this.setState({ addBilling: false, initialPayment: 0 });
    };

    onOpenEditPayment = async () => {
        this.setState({ addBilling: true, editBilling: true, fetchingViewPayment: true, paymentAnchorEl: null });
        let { id } = this.state.selectedPayment;
        let { data } = await axios.get(`/api/billing/${id}`);
        console.log(data);
        this.setState({ fetchingViewPayment: false, initialPayment: data.amount });
    };

    //delete payment dialog actions
    onOpenDeleteBilling = () => {
        this.setState({ deletePayment: true, paymentAnchorEl: null });
    };

    onCloseDeleteBilling = () => {
        this.setState({ deletePayment: false, selectedPayment: null });
    };

    //guest actions
    onMoreAction = e => {
        this.setState({ guestAnchorEl: e.currentTarget });
    };

    onCloseMoreAction = () => {
        this.setState({ guestAnchorEl: null });
    };

    //payment actions
    onMorePayment = (e, selectedPayment) => {
        this.setState({ paymentAnchorEl: e.currentTarget, selectedPayment });
    };

    onClosePayment = () => {
        this.setState({ paymentAnchorEl: null, selectedPayment: null });
    };

    onChangeStatus = async e => {
        try {
            if (e.target.value === "NOSHOW") {
                //open confirm dialog
                this.setState({ statusPrompt: true, selectedStatus: e.target.value });
            } else if (e.target.value === "CHECKEDOUT") {
                //
                let { balance } = this.state.booking;
                if (balance > 0) {
                    this.setState({ balancePrompt: true });
                } else this.setState({ statusPrompt: true, selectedStatus: e.target.value });
            } else {
                console.log("here");
                this.setState({ changingStatus: true });
                let { billings, rooms, user, ...booking } = this.state.booking;
                booking.status = e.target.value;
                await axios.put("/api/booking/" + booking.id, {
                    ...booking
                });
                // console.log()
                this.setState({ changingStatus: false });
                this.getBookingDetails();
            }
        } catch (err) {
            this.setState({ changingStatus: false });
            console.log(err);
        }
    };

    onClickAddRoom = async () => {
        try {
            if (this.state.addingRooms) {
                this.setState({ addingRooms: false });
            } else {
                this.setState({ addingRooms: true });
                let { from_date, to_date } = this.state.booking;
                let { data } = await axios.get("/api/room/available", {
                    params: {
                        checkin: from_date,
                        checkout: to_date
                    }
                });
                let availableRooms = data.map((room, i) => {
                    room.selected = false;
                    return room;
                });
                this.setState({ availableRooms, fetchingRooms: false });
            }
        } catch (err) {
            console.log(err);
        }
    };

    cancelAddRoom = refresh => {
        if (refresh) {
            this.setState(
                {
                    addingRooms: false
                },
                () => {
                    this.getRooms();
                }
            );
        } else {
            this.setState({
                addingRooms: false
            });
        }
    };

    //get rooms
    getRooms = async () => {
        try {
            this.setState({ fetchingRooms: true });
            let { id } = this.props.match.params;
            let rooms = await axios.get(`/api/booking/${id}/room`);
            let totalPrice = rooms.data.reduce((totalPrice, room) => {
                if (room.additional_beds > 0) {
                    totalPrice = totalPrice + room.additional_beds * 100 + room.price;
                    return totalPrice;
                } else {
                    return totalPrice + room.price;
                }
            }, 0);

            let { booking } = this.state;
            console.log(totalPrice, booking.total);
            booking.balance = totalPrice - booking.total;
            let newBooking = { ...booking, rooms: rooms.data, totalPrice };

            this.setState({ booking: newBooking });
            this.setState({ fetchingRooms: false });
        } catch (err) {
            this.setState({ fetchingRooms: false });
        }
    };

    //handle for the expansion
    handleChangeRoomExpansion = id => {
        if (this.state.selectedRoom === id) this.setState({ selectedRoom: null });
        else this.setState({ selectedRoom: id });
    };

    //=========RESERVATION==============\\
    openEditReservationDates = () => {
        this.setState({ editReservationDates: !this.state.editReservationDates });
    };

    onCloseEditReservationDates = () => {
        this.setState({ editReservationDates: false });
    };

    //=========SNACKBAR==============\\

    openSnackBar = snackBarMessage => {
        this.setState({ snackbar: true, snackBarMessage });
    };

    handleCloseSnackBar = () => this.setState({ snackbar: false, snackBarMessage: null });

    //=========SNACKBAR==============\\
    handleStatusPrompt = () => {
        this.setState({ statusPrompt: !this.state.statusPrompt, selectedStatus: "" });
    };

    handleResultStatusPrompt = async result => {
        try {
            console.log("hello" + result);
            if (result) {
                this.setState({ changingStatus: true });
                let { billings, rooms, user, ...booking } = this.state.booking;
                booking.status = this.state.selectedStatus;
                await axios.put("/api/booking/" + booking.id, {
                    ...booking
                });
                // console.log()

                this.setState({
                    statusPrompt: false,
                    selectedStatus: "",
                    changingStatus: false
                });
                this.getBookingDetails();
            } else {
                this.setState({
                    statusPrompt: false,
                    selectedStatus: "",
                    changingStatus: false
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    //handle balance prompt
    handleBalancePrompt = () => {
        this.setState({ balancePrompt: !this.state.balancePrompt });
    };

    render() {
        let { fetching, booking, guestAnchorEl, paymentAnchorEl, selectedPayment, changingStatus } = this.state;
        let { user, rooms, billings, status } = booking;
        let open = Boolean(guestAnchorEl);
        let openPayment = Boolean(paymentAnchorEl);
        let viewMode = booking.status === "CHECKEDOUT" || booking.status === "NOSHOW" ? true : false;
        return (
            <AdminLayout {...this.props} style={{ padding: "60px 0 0" }}>
                {fetching ? (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <CircularProgress />
                    </div>
                ) : this.state.notFound ? (
                    <div style={{ width: "100%", textAlign: "center", paddingTop: 30 }}>
                        <Typography variant="h3" gutterBottom>
                            Booking not found
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Please try to scan the QR again or find the booking in the reservation page.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => this.props.history.replace("/bookings/reservations")}>
                            Go To Reservation
                        </Button>
                    </div>
                ) : (
                    <div style={{ margin: "10px", padding: "25px" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: 15
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <AccountCircleIcon style={{ marginRight: 10, fontSize: 30 }} />
                                        <Typography variant="h5">Guest Information</Typography>
                                    </div>
                                    {status === "NOSHOW" || status === "CHECKEDOUT" ? (
                                        <div>
                                            <Typography component="span">Status: </Typography>
                                            <Typography component="span">
                                                {status === "NOSHOW" ? "No show" : status === "CHECKEDOUT" ? "Checked-out" : null}
                                            </Typography>
                                        </div>
                                    ) : (
                                        <FormControl style={{ display: "inline-block" }}>
                                            <InputLabel htmlFor="age-simple">
                                                Status
                                                {changingStatus && <CircularProgress size={12} style={{ marginLeft: 10 }} />}
                                            </InputLabel>
                                            <Select
                                                value={booking.status}
                                                onChange={this.onChangeStatus}
                                                inputProps={{
                                                    id: "status"
                                                }}
                                                disabled={changingStatus}
                                            >
                                                <MenuItem value="NOSHOW">Mark as no-show</MenuItem>
                                                <MenuItem value="RESERVED">Reserved</MenuItem>
                                                <MenuItem value="CHECKEDIN">Check-in</MenuItem>
                                                <MenuItem value="CHECKEDOUT">Check-out</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                    {/* <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={this.onMoreAction}
                                        size="small"
                                    >
                                        <MoreVertIcon style={{ fontSize: "1.25em" }} />
                                    </IconButton>

                                    <Menu id="long-menu" anchorEl={guestAnchorEl} open={open} onClose={this.onCloseMoreAction}></Menu> */}
                                </div>

                                <Paper style={{ padding: "15px" }}>
                                    <div>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography variant="h4">{`${user.honorific}. ${user.firstname} ${user.middlename[0]} ${
                                                    user.lastname
                                                }`}</Typography>
                                                <Typography gutterBottom style={{ paddingLeft: 10 }}></Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography>{user.email}</Typography>
                                                <Typography gutterBottom style={{ paddingLeft: 10 }}></Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography gutterBottom>{user.contactno}</Typography>
                                                <Typography gutterBottom style={{ paddingLeft: 10 }}></Typography>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                <Typography gutterBottom>{user.address}</Typography>
                                                <Typography variant="h6" gutterBottom style={{ paddingLeft: 10 }}></Typography>
                                            </div>
                                        </Grid>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: 15
                                    }}
                                >
                                    <PaymentIcon style={{ marginRight: 10, fontSize: 30 }} />
                                    <Typography variant="h5">Payment</Typography>
                                </div>
                                <Paper>
                                    {this.state.fetched && this.state.fetchingPayment && <LinearProgress style={{ height: 2 }} />}
                                    <div style={{ margin: "0 5px 0 5px", padding: "15px" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 10
                                            }}
                                        >
                                            <Typography variant="h6">Paid</Typography>
                                            {!viewMode && (
                                                <Button variant="text" color="primary" onClick={this.onOpenAddBilling} size="small">
                                                    Add
                                                </Button>
                                            )}
                                        </div>
                                        <Divider />
                                        <div>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>#</TableCell>
                                                        <TableCell>Date added</TableCell>
                                                        <TableCell align="right">Amount</TableCell>
                                                        {/* remove */}
                                                        {!viewMode && <TableCell align="right">Action</TableCell>}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {billings.length > 0 ? (
                                                        billings.map((row, i) => (
                                                            <TableRow key={row.name}>
                                                                <TableCell component="th" scope="row">
                                                                    {i + 1}
                                                                </TableCell>
                                                                <TableCell>{moment(row.created_at).format("MMM DD, YYYY hh:mm A")}</TableCell>
                                                                <TableCell align="right" component="th" scope="row">
                                                                    &#8369;
                                                                    <NumeralComponent number={row.amount} />
                                                                </TableCell>
                                                                {!viewMode && (
                                                                    <TableCell align="right" component="th" scope="row">
                                                                        <IconButton
                                                                            aria-label="more"
                                                                            aria-controls="long-menu"
                                                                            aria-haspopup="true"
                                                                            onClick={e => this.onMorePayment(e, row)}
                                                                            size="small"
                                                                        >
                                                                            <MoreVertIcon style={{ fontSize: "1.25em" }} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                )}
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell colSpan={4}>
                                                                <div style={{ padding: "50px 0", display: "flex", justifyContent: "center" }}>
                                                                    <Typography align="center" variant="button">
                                                                        No added payment yet
                                                                    </Typography>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="right">
                                                            Total Due: &#8369;
                                                            <NumeralComponent number={booking.totalPrice} />
                                                        </TableCell>
                                                        {!viewMode && <TableCell align="right"></TableCell>}
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="right">
                                                            Amount Paid: &#8369;
                                                            <NumeralComponent number={booking.total} />
                                                        </TableCell>
                                                        {!viewMode && <TableCell align="right"></TableCell>}
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell colSpan={3} align="right">
                                                            Balance: &#8369;
                                                            <NumeralComponent number={booking.balance} />
                                                            {booking.balance < 0 && " (Change)"}
                                                        </TableCell>
                                                        {!viewMode && <TableCell align="right"></TableCell>}
                                                    </TableRow>
                                                </TableBody>
                                                <Menu id="long-menu" anchorEl={paymentAnchorEl} open={openPayment} onClose={this.onClosePayment}>
                                                    <MenuItem onClick={this.onOpenEditPayment}>Edit</MenuItem>
                                                    <MenuItem onClick={this.onOpenDeleteBilling}>Remove</MenuItem>
                                                </Menu>
                                            </Table>
                                        </div>
                                        {/* <div
                                            style={{
                                                padding: "10px 0",
                                                display: "flex",
                                                justifyContent: "flex-end"
                                            }}
                                        >
                                            <Typography variant="h6">Total Due: &#8369;{booking.total.toFixed(2)}</Typography>
                                        </div> */}
                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item xs={6}>
                                <div
                                    style={{
                                        marginBottom: 15
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <EventAvailableIcon style={{ marginRight: 10, fontSize: 30 }} />
                                            <Typography variant="h5">Reservation</Typography>
                                        </div>
                                        {/* remove */}
                                        {!viewMode && (
                                            <IconButton onClick={this.openEditReservationDates}>
                                                <Icon size="small">edit</Icon>
                                            </IconButton>
                                        )}
                                    </div>
                                </div>

                                {!this.state.editReservationDates || viewMode ? (
                                    <Paper style={{ padding: "15px" }}>
                                        <div style={{ marginBottom: 20 }}>
                                            <br />
                                            <Grid container>
                                                <Grid item xs={12} md={6}>
                                                    <div>
                                                        <Typography align="center" variant="h5" gutterBottom>
                                                            Checked in
                                                        </Typography>
                                                        <Typography align="center" gutterBottom>
                                                            {moment(booking.from_date).format("MMM DD, YYYY")}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <div>
                                                        <Typography align="center" variant="h5" gutterBottom>
                                                            Checked Out
                                                        </Typography>
                                                        <Typography align="center" gutterBottom>
                                                            {moment(booking.to_date).format("MMM DD, YYYY")}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                {/* <Grid item xs={12} md={4}>
                                                    <div>
                                                        <Typography align="center" variant="h5" gutterBottom>
                                                            Arrival
                                                        </Typography>
                                                        <Typography align="center" gutterBottom>
                                                            Sept 19,2019
                                                        </Typography>
                                                    </div>
                                                </Grid> */}
                                            </Grid>
                                        </div>
                                    </Paper>
                                ) : (
                                    <Reservation
                                        checkInDate={booking.from_date}
                                        checkOutDate={booking.to_date}
                                        edit={this.state.editReservationDates}
                                        onCloseEditReservationDates={this.onCloseEditReservationDates}
                                        getBookingDetails={this.getBookingDetails}
                                        bookingId={this.props.match.params.id}
                                        openSnackBar={this.openSnackBar}
                                        getRooms={this.getRooms}
                                    />
                                )}
                                <div style={{ marginTop: 20 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                        <Typography variant="h5">Rooms</Typography>
                                        {/* remove */}
                                        {!viewMode && (
                                            <Button variant="outlined" size="small" color="primary" onClick={this.onClickAddRoom}>
                                                <AddCircleIcon style={{ marginRight: 5 }} />
                                                Add room
                                            </Button>
                                        )}
                                    </div>
                                    {/* remove */}
                                    <Collapse in={this.state.addingRooms}>
                                        <Paper>
                                            <AddRoom
                                                checkInDate={booking.from_date}
                                                checkOutDate={booking.to_date}
                                                bookingId={this.props.match.params.id}
                                                cancelAddRoom={this.cancelAddRoom}
                                                addingRooms={this.state.addingRooms}
                                                getRooms={this.getRooms}
                                                openSnackBar={this.openSnackBar}
                                            />
                                        </Paper>
                                        {/* {this.state.fetchingRooms ? (
                                                <div style={{ padding: "25px 0", textAlign: "center" }}>
                                                    <CircularProgress />
                                                </div>
                                            ) : (
                                                <div style={{ margin: "10px 0", padding: "0 20px", width: "100%" }}>
                                                    <FormControl component="fieldset" style={{ width: "100%" }} error={this.state.errorAddRoom}>
                                                        <FormLabel component="legend">Assign responsibility</FormLabel>
                                                        <FormGroup>
                                                            <Grid container>
                                                                {this.state.availableRooms.map((room, i) => {
                                                                    return (
                                                                        <Grid item xs={12} md={4}>
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Checkbox
                                                                                        checked={room.selected}
                                                                                        onChange={this.onSelectRoom}
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
                                                        </FormGroup>
                                                        {this.state.errorAddRoom && (
                                                            <FormHelperText>You must select one(1) or more rooms.</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            style={{ marginTop: 25 }}
                                                            onClick={this.cancelAddRoom}
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
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </div> */}
                                        {/* )} */}
                                    </Collapse>
                                    <div style={{ marginTop: 20 }}>
                                        {this.state.fetchingRooms && <LinearProgress style={{ height: 2 }} />}
                                        <div>
                                            {rooms.map((room, i) => {
                                                return (
                                                    <ExpansionPanel
                                                        expanded={this.state.selectedRoom === room.id}
                                                        onChange={() => this.handleChangeRoomExpansion(room.id)}
                                                        key={room.id}
                                                    >
                                                        <ExpansionPanelSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography> {room.room.room_number + " " + room.room_type.name}</Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails style={{ backgroundColor: "#dbd2d2" }}>
                                                            <GuestInfo
                                                                room={room}
                                                                guests={room.guests}
                                                                selectedRoom={this.state.selectedRoom}
                                                                id={room.id}
                                                                openSnackBar={this.openSnackBar}
                                                                getRooms={this.getRooms}
                                                                view={this.state.booking.status === "CHECKEDOUT" ? true : false}
                                                            />
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                );
                                            })}
                                            {/* <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Room number</TableCell>
                                                            <TableCell align="left">Room</TableCell>
                                                            <TableCell align="right">Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rooms.map(room => (
                                                            <TableRow key={room.id}>
                                                                <TableCell component="th" scope="row">
                                                                    {room.room.room_number}
                                                                </TableCell>
                                                                <TableCell align="left">{room.room_type.name}</TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton
                                                                        aria-label="more"
                                                                        aria-controls="long-menu"
                                                                        aria-haspopup="true"
                                                                        onClick={e => this.onMorePayment(e, room)}
                                                                        size="small"
                                                                    >
                                                                        <MoreVertIcon style={{ fontSize: "1.25em" }} />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table> */}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: 15
                                    }}
                                >
                                    <LocalOfferIcon style={{ marginRight: 10, fontSize: 30 }} />
                                    <Typography variant="h5">Pricing</Typography>
                                </div>
                                <Paper>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {rooms.map((room, i) => {
                                            return (
                                                <React.Fragment key={room.id}>
                                                    <ListItem>
                                                        <ListItemText>
                                                            {`${room.room.room_number}. ${room.room_type.name} `}
                                                            <i>({room.guest_no} Guest)</i>
                                                        </ListItemText>
                                                        <ListItemSecondaryAction>
                                                            &#8369;
                                                            <NumeralComponent number={room.price} />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                    <Divider />
                                                    {room.additional_beds > 0 && (
                                                        <>
                                                            <ListItem>
                                                                <ListItemText>
                                                                    {`${room.room.room_number}. ${room.room_type.name} `}({room.additional_beds}{" "}
                                                                    Additional bed(s))
                                                                </ListItemText>
                                                                <ListItemSecondaryAction>
                                                                    &#8369;
                                                                    <NumeralComponent number={room.additional_beds * 100} />
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                            <Divider />
                                                        </>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </List>
                                    <div style={{ padding: "10px 20px", display: "flex", justifyContent: "flex-end" }}>
                                        <Typography variant="body1">
                                            &#8369;
                                            <NumeralComponent number={booking.totalPrice} />
                                            {/* {this.state.booking.totalPrice.toFixed(2)} */}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}

                {/* Add Billing Form */}
                <Formik
                    initialValues={{ amount: this.state.initialPayment }}
                    onSubmit={async (values, actions) => {
                        console.log(actions, values);
                        // this.onCloseAddBilling();
                        await this.onAddBilling(values.amount);
                    }}
                    validationSchema={function() {
                        let schema = yup.object().shape({
                            amount: yup
                                .number()
                                .min(1, "Must not be zero(0)")
                                .required("Amount field is required!")
                        });
                        return schema;
                    }}
                    enableReinitialize={true}
                    render={props => {
                        const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

                        const onExit = () => {
                            props.resetForm();
                            this.onExitBilling();
                        };

                        return (
                            <Dialog
                                open={this.state.addBilling}
                                onClose={this.onCloseAddBilling}
                                onExit={onExit}
                                aria-labelledby="form-dialog-title"
                                maxWidth="sm"
                                fullWidth
                            >
                                <DialogTitle id="form-dialog-title">{this.state.editBilling ? "Edit" : "Add"} Billing</DialogTitle>
                                <DialogContent>
                                    {this.state.fetchingViewPayment ? (
                                        <div style={{ textAlign: "center" }}>
                                            <CircularProgress />
                                        </div>
                                    ) : (
                                        <>
                                            <DialogContentText>Please provide the amount of billing you want to add</DialogContentText>
                                            <TextField
                                                autoFocus
                                                variant="outlined"
                                                id="amount"
                                                label="Amount"
                                                type="number"
                                                fullWidth
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.amount}
                                                helperText={touched.amount && errors.amount ? errors.amount : ""}
                                                error={touched.amount && errors.amount ? true : false}
                                            />
                                        </>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.onCloseAddBilling} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} color="primary" disabled={isSubmitting ? true : false}>
                                        add {isSubmitting && <CircularProgress size={12} style={{ marginLeft: 10 }} />}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        );
                    }}
                />

                {/* Confirm delete billing dialog  */}
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={this.state.deletePayment}
                    onClose={this.onCloseDeleteBilling}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete this payment?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Are you really sure you want to delete this payment?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.onCloseDeleteBilling} disabled={changingStatus}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.onDeleteBilling} autoFocus disabled={this.state.deletingPayment ? true : false}>
                            Confirm {this.state.deletingPayment && <CircularProgress size={12} style={{ marginLeft: 10 }} />}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.snackbar}
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

                {/* no show / checkout dialog  */}
                <Dialog
                    open={this.state.statusPrompt}
                    onClose={this.handleStatusPrompt}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to mark {this.state.selectedStatus === "CHECKEDOUT" ? "Check-out" : "No Show"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action is irreversable, Are you sure want to proceed?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleResultStatusPrompt(false)} color="primary" disabled={changingStatus}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleResultStatusPrompt(true)} color="primary" disabled={changingStatus}>
                            Proceed
                            {changingStatus && <CircularProgress size={12} style={{ marginLeft: 10 }} />}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* balance prompt */}
                <Dialog
                    open={this.state.balancePrompt}
                    onClose={this.handleBalancePrompt}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">You still have a balance.</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are not allowed to check-out if you still have a balance.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleBalancePrompt} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleBalancePrompt} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </AdminLayout>
        );
    }
}
