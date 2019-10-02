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

import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PaymentIcon from "@material-ui/icons/Payment";
import AdminLayout from "../components/AdminLayout";
import { Formik } from "formik";

import axios from "axios";
import * as yup from "yup";

export default class ViewBooking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            fetched: false,
            failed: false,
            notFound: false,
            booking: {},
            addBilling: false
        };
    }

    componentDidMount() {
        this.getBookingDetails();
    }

    getBookingDetails = async () => {
        try {
            this.setState({ fetching: true });
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/booking/${id}`);
            data.total = data.billings.reduce((total, billing) => {
                return total + billing.amount;
            }, 0);
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
                    notFound: false
                });
        }
    };

    getBillings = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/booking/${id}/billing`);
            let { booking } = this.state;
            booking.billings = data;
            this.setState({ booking });
        } catch (err) {
            console.log(err);
        }
    };

    onAddBilling = async amount => {
        try {
            let { id } = this.props.match.params;
            await axios.post(`/api/booking/${id}/billing`, {
                amount
            });
            this.onCloseAddBilling();
            this.getBillings();
        } catch (err) {
            console.log(err);
        }
    };

    onOpenAddBilling = () => {
        this.setState({ addBilling: true });
    };

    onCloseAddBilling = () => {
        this.setState({ addBilling: false });
    };

    render() {
        let { fetching, booking } = this.state;
        let { user, rooms, billings } = booking;
        return (
            <AdminLayout {...this.props} style={{ padding: "60px 0 0" }}>
                {fetching ? (
                    <div style={{ textAlign: "center", padding: "50px 0" }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <div style={{ margin: "10px", padding: "25px" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: 15
                                    }}
                                >
                                    <AccountCircleIcon style={{ marginRight: 10, fontSize: 30 }} />
                                    <Typography variant="h5">Guest Information</Typography>
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
                                    <LocalOfferIcon style={{ marginRight: 10, fontSize: 30 }} />
                                    <Typography variant="h5">Pricing</Typography>
                                </div>
                                <Paper>
                                    <List component="nav" aria-label="secondary mailbox folders">
                                        {rooms.map((room, i) => {
                                            return (
                                                <ListItem button>
                                                    <ListItemText>
                                                        {`${room.room.room_number}. ${room.room_type.name} `}
                                                        <i>({room.guest_no} Guest)</i>
                                                    </ListItemText>
                                                    <ListItemSecondaryAction>P{room.price.toFixed(2)}</ListItemSecondaryAction>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
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
                                    <EventAvailableIcon style={{ marginRight: 10, fontSize: 30 }} />
                                    <Typography variant="h5">Reservation</Typography>
                                </div>
                                <Paper style={{ padding: "15px" }}>
                                    <div style={{ marginBottom: 20 }}>
                                        <br />
                                        <Grid container>
                                            <Grid item xs={12} md={4}>
                                                <div>
                                                    <Typography align="center" variant="h5" gutterBottom>
                                                        Checked in
                                                    </Typography>
                                                    <Typography align="center" gutterBottom>
                                                        Sept 19,2019
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <div>
                                                    <Typography align="center" variant="h5" gutterBottom>
                                                        Checked Out
                                                    </Typography>
                                                    <Typography align="center" gutterBottom>
                                                        Sept 19,2019
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <div>
                                                    <Typography align="center" variant="h5">
                                                        Arrival
                                                    </Typography>
                                                    <Typography align="center" gutterBottom>
                                                        Sept 19,2019
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <Divider />
                                    <div style={{ marginTop: 20 }}>
                                        <Typography variant="h5" gutterBottom>
                                            Rooms
                                        </Typography>
                                        <div style={{ padding: "0 20px" }}>
                                            {rooms.map((room, i) => {
                                                return (
                                                    <Typography variant="button" gutterBottom>
                                                        {`#${room.room.room_number} ${room.room_type.name}`}
                                                    </Typography>
                                                );
                                            })}
                                        </div>
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
                                <Paper style={{ padding: "15px" }}>
                                    <div style={{ margin: "0 5px 0 5px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                            <Typography variant="h6">Paid</Typography>
                                            <Button variant="text" color="primary" onClick={this.onOpenAddBilling} size="small">
                                                Add
                                            </Button>
                                        </div>
                                        <Divider />
                                        <div>
                                            {billings.length > 0 ? (
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>#</TableCell>
                                                            <TableCell>Amount</TableCell>
                                                            <TableCell align="right">Date added</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {billings.map((row, i) => (
                                                            <TableRow key={row.name}>
                                                                <TableCell component="th" scope="row">
                                                                    {i + 1}
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {row.amount}
                                                                </TableCell>
                                                                <TableCell align="right">{row.created_at}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ) : (
                                                <div style={{ padding: "50px 0", display: "flex", justifyContent: "center" }}>
                                                    <Typography align="center" variant="button">
                                                        No added billing yet
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end"
                                            }}
                                        >
                                            <Typography variant="h6">Total Due: P{booking.total.toFixed(2)}</Typography>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                )}
                <Formik
                    initialValues={{ amount: 0 }}
                    onSubmit={(values, actions) => {
                        console.log(actions, values);
                        // this.onCloseAddBilling();
                        this.onAddBilling(values.amount);
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
                    render={props => {
                        const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
                        return (
                            <Dialog open={this.state.addBilling} onClose={this.onCloseAddBilling} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add Billing</DialogTitle>
                                <DialogContent>
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
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.onCloseAddBilling} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} color="primary">
                                        add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        );
                    }}
                />
            </AdminLayout>
        );
    }
}
