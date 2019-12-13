import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import moment from "moment";
import numeral from "numeral";
import { GET, PUT, POST, DELETE } from "../utils/restUtils";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import DetailsTab from "./ViewBooking/DetailsTab";
import BillingTab from "./ViewBooking/BillingTab";

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
            selectedRoom: "",

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
            balancePrompt: false,
            tabValue: 0
        };
    }

    componentDidMount() {
        this.getBooking();
    }

    getBooking = async () => {
        try {
            this.setState({ fetching: true });
            let { id } = this.props.match.params;
            let { data } = await GET(`/api/booking/${id}`);
            data.total = data.billings.reduce((total, billing) => {
                return total + billing.amount;
            }, 0);
            data.totalPrice = data.rooms.reduce((totalPrice, room) => {
                if (room.additional_beds > 0) {
                    totalPrice =
                        totalPrice + room.additional_beds * 100 + room.price;
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
            let { data } = await GET(`/api/booking/${id}?type=detail`);
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
            let { data } = await GET(`/api/booking/${id}/billing`);
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
                await PUT(`/api/billing/${id}`, {
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
                await POST(`/api/booking/${id}/billing`, {
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
            await DELETE(`/api/billing/${id}`);
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
        this.setState({
            addBilling: true,
            editBilling: true,
            fetchingViewPayment: true,
            paymentAnchorEl: null
        });
        let { id } = this.state.selectedPayment;
        let { data } = await GET(`/api/billing/${id}`);
        console.log(data);
        this.setState({
            fetchingViewPayment: false,
            initialPayment: data.amount
        });
    };

    //delete payment dialog actions
    onOpenDeleteBilling = () => {
        this.setState({
            deletePayment: true,
            paymentAnchorEl: null
        });
    };

    onCloseDeleteBilling = () => {
        this.setState({
            deletePayment: false,
            selectedPayment: null
        });
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
        this.setState({
            paymentAnchorEl: e.currentTarget,
            selectedPayment
        });
    };

    onClosePayment = () => {
        this.setState({
            paymentAnchorEl: null,
            selectedPayment: null
        });
    };

    onChangeStatus = async e => {
        try {
            if (e.target.value === "NOSHOW") {
                //open confirm dialog
                this.setState({
                    statusPrompt: true,
                    selectedStatus: e.target.value
                });
            } else if (e.target.value === "CHECKEDOUT") {
                //
                let { balance } = this.state.booking;
                if (balance > 0) {
                    this.setState({ balancePrompt: true });
                } else
                    this.setState({
                        statusPrompt: true,
                        selectedStatus: e.target.value
                    });
            } else {
                console.log("here");
                this.setState({ changingStatus: true });
                let { billings, rooms, user, ...booking } = this.state.booking;
                if (e.target.value === "CHECKEDIN") {
                    booking.checkin_date = moment().format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                } else if (e.target.value === "RESERVED") {
                    booking.checkin_date = null;
                }
                booking.status = e.target.value;
                await PUT("/api/booking/" + booking.id, {
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
                let { data } = await GET("/api/room/available", {
                    params: {
                        checkin: from_date,
                        checkout: to_date
                    }
                });
                let availableRooms = data.map((room, i) => {
                    room.selected = false;
                    return room;
                });
                this.setState({
                    availableRooms,
                    fetchingRooms: false
                });
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
            let rooms = await GET(`/api/booking/${id}/room`);
            let totalPrice = rooms.data.reduce((totalPrice, room) => {
                if (room.additional_beds > 0) {
                    totalPrice =
                        totalPrice + room.additional_beds * 100 + room.price;
                    return totalPrice;
                } else {
                    return totalPrice + room.price;
                }
            }, 0);

            let { booking } = this.state;
            console.log(totalPrice, booking.total);
            booking.balance = totalPrice - booking.total;
            let newBooking = {
                ...booking,
                rooms: rooms.data,
                totalPrice
            };

            this.setState({ booking: newBooking });
            this.setState({ fetchingRooms: false });
        } catch (err) {
            this.setState({ fetchingRooms: false });
        }
    };

    //handle for the expansion
    handleChangeRoomExpansion = id => {
        if (this.state.selectedRoom === id)
            this.setState({ selectedRoom: null });
        else this.setState({ selectedRoom: id });
    };

    //=========RESERVATION==============\\
    openEditReservationDates = () => {
        this.setState({
            editReservationDates: !this.state.editReservationDates
        });
    };

    onCloseEditReservationDates = () => {
        this.setState({ editReservationDates: false });
    };

    //=========SNACKBAR==============\\

    openSnackBar = snackBarMessage => {
        this.setState({ snackbar: true, snackBarMessage });
    };

    handleCloseSnackBar = () =>
        this.setState({
            snackbar: false,
            snackBarMessage: null
        });

    //=========SNACKBAR==============\\
    handleStatusPrompt = () => {
        this.setState({
            statusPrompt: !this.state.statusPrompt,
            selectedStatus: ""
        });
    };

    handleResultStatusPrompt = async result => {
        try {
            console.log("hello" + result);
            if (result) {
                this.setState({ changingStatus: true });
                let { billings, rooms, user, ...booking } = this.state.booking;
                booking.status = this.state.selectedStatus;
                if (booking.status === "CHECKEDOUT")
                    booking.checkout_date = moment().format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                await PUT("/api/booking/" + booking.id, {
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
        this.setState({
            balancePrompt: !this.state.balancePrompt
        });
    };

    handleChangeTabs = (e, tabValue) => {
        this.setState({ tabValue });
    };

    getTabContent = value => {
        switch (value) {
            case 0:
                return <DetailsTab {...this.props} {...this.state} />;
            case 1:
                return <BillingTab {...this.props} {...this.state} />;
            default:
                break;
        }
    };

    render() {
        let {
            fetching,
            booking,
            guestAnchorEl,
            paymentAnchorEl,
            selectedPayment,
            changingStatus
        } = this.state;
        let { user, rooms, billings, status } = booking;
        let open = Boolean(guestAnchorEl);
        let openPayment = Boolean(paymentAnchorEl);
        let viewMode =
            booking.status === "CHECKEDOUT" || booking.status === "NOSHOW"
                ? true
                : false;
        return (
            <AdminLayout {...this.props} style={{ padding: "60px 0 0" }}>
                <AppBar position="static">
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleChangeTabs}
                        aria-label="simple tabs example"
                    >
                        <Tab label="Detail" />
                        <Tab label="Billing" />
                    </Tabs>
                </AppBar>
                {this.getTabContent(this.state.tabValue)}
            </AdminLayout>
        );
    }
}
