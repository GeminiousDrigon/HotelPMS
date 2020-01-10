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
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PaymentIcon from "@material-ui/icons/Payment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AdminLayout from "../../components/AdminLayout";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Formik } from "formik";

import Slide from "@material-ui/core/Slide";

import axios from "axios";
import * as yup from "yup";
import moment from "moment";
import AddRoom from "../../components/ViewBooking/AddRoom";
import Collapse from "@material-ui/core/Collapse";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GuestInfo from "../../components/ViewBooking/GuestInfo";
import Reservation from "../../components/ViewBooking/Reservation";
import Icon from "@material-ui/core/Icon";
import Snackbar from "@material-ui/core/Snackbar";
import numeral from "numeral";
import { GET, PUT, POST, DELETE } from "../../utils/restUtils";
import QRCode from "qrcode";

const NumeralComponent = React.memo(function Numeral(props) {
	return numeral(props.number).format("0,0.00");
});

export default class DetailsTab extends Component {
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
			paymnetType: "",
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
			tabValue: 0,

			//qr dialog
			showQr: false,

			updatingDetails: false
		};
	}

	componentDidMount() {
		this.getBooking();
		console.log(this.paymentInputLabel);
	}

	getBooking = async () => {
		try {
			this.setState({ fetching: true });
			let { id } = this.props.match.params;
			let { data } = await GET(`/api/booking/${id}`);
			console.log(data);
			data.total = data.billings.reduce((total, billing) => {
				return total + billing.amount;
			}, 0);
			data.totalPrice = data.rooms.reduce((totalPrice, room) => totalPrice + room.price, 0);
			data.totalPrice = data.totalPrice + data.additional_beds * 100;

			data.totalPrice =
				data.totalPrice +
				data.additionals.reduce((totalPrice, additional) => {
					return (totalPrice += additional.pivot.quantity * additional.pivot.price);
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

			data.totalPrice = this.state.booking.totalPrice + data.additional_beds * 100;
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

			if (total >= this.state.booking.totalPrice * 0.1) {
				this.setState({ fetchingPayment: false });
				this.getBooking();
			} else {
				booking.total = total;
				booking.balance = this.state.booking.totalPrice - total;
				this.setState({ booking, fetchingPayment: false });
			}
		} catch (err) {
			console.log(err);
			this.setState({ fetchingPayment: false });
		}
	};

	onAddBilling = async values => {
		try {
			let { editBilling } = this.state;
			let { amount, type } = values;
			if (editBilling) {
				let { id, booking_id } = this.state.selectedPayment;
				await PUT(`/api/billing/${id}`, {
					amount,
					type,
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
					amount,
					type
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
					booking.checkin_date = moment().format("YYYY-MM-DD HH:mm:ss");
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
					totalPrice = totalPrice + room.additional_beds * 100 + room.price;
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
		if (this.state.selectedRoom === id) this.setState({ selectedRoom: null });
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
				if (booking.status === "CHECKEDOUT") booking.checkout_date = moment().format("YYYY-MM-DD HH:mm:ss");
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

	//qr
	handleShowQrCode = () => this.setState({ showQr: !this.state.showQr });

	updateBookingDetails = async (values, actions) => {
		try {
			if (!this.state.updatingDetails) this.setState({ updatingDetails: true });
			let { id } = this.props.match.params;
			let booking = {
				from_date: this.state.booking.from_date,
				to_date: this.state.booking.to_date,
				user_id: this.state.booking.user_id,
				status: this.state.booking.status,
				noOfChild: values.noOfChild,
				additional_beds: values.additional_beds,
				payment_method: values.payment_method,
				checkin_date: this.state.booking.checkin_date,
				checkout_date: this.state.booking.checkout_date
			};
			console.log(booking);
			await PUT(`/api/booking/${id}`, booking);
			this.setState({ updatingDetails: false });
			this.getBookingDetails();
		} catch (err) {
			this.setState({ updatingDetails: false });
		}
	};

	render() {
		let {
			fetching,
			guestAnchorEl,
			paymentAnchorEl,
			selectedPayment,
			changingStatus,
			additionalAnchorEl,
			booking
		} = this.state;
		// let { booking } = this.props;
		let { user, rooms, billings, status, additionals } = booking;
		let open = Boolean(guestAnchorEl);
		let openPayment = Boolean(paymentAnchorEl);
		let openAdditional = Boolean(additionalAnchorEl);
		let viewMode = booking.status === "CHECKEDOUT" || booking.status === "NOSHOW" ? true : false;
		return (
			<>
				<div>
					{fetching ? (
						<div
							style={{
								textAlign: "center",
								padding: "50px 0"
							}}
						>
							<CircularProgress />
						</div>
					) : (
						<div
							style={{
								margin: "10px",
								padding: "25px"
							}}
						>
							<Button variant="contained" color="primary" style={{ marginBottom: 20 }} onClick={this.handleShowQrCode}>
								Show Qr Code
							</Button>
							<br />
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
											<AccountCircleIcon
												style={{
													marginRight: 10,
													fontSize: 30
												}}
											/>
											<Typography variant="h5">Guest Information</Typography>
										</div>
										<div>
											<Typography component="span">Status: </Typography>
											<Typography component="span">{booking.status}</Typography>
										</div>

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

									<Paper
										style={{
											padding: "15px"
										}}
									>
										<div>
											<Grid item xs={12}>
												<div>
													<Typography variant="h4">{`${user.honorific}. ${user.firstname} ${user.middlename[0]} ${user.lastname}`}</Typography>
													<Typography
														gutterBottom
														style={{
															paddingLeft: 10
														}}
													></Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography>{user.email}</Typography>
													<Typography
														gutterBottom
														style={{
															paddingLeft: 10
														}}
													></Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography gutterBottom>{user.contactno}</Typography>
													<Typography
														gutterBottom
														style={{
															paddingLeft: 10
														}}
													></Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography gutterBottom>{user.address}</Typography>
													<Typography
														variant="h6"
														gutterBottom
														style={{
															paddingLeft: 10
														}}
													></Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography component="span">Payment method: </Typography>
													<Typography gutterBottom component="span">
														{booking.payment_method}
													</Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography component="span">Number of Children: </Typography>
													<Typography component="span" gutterBottom>
														{booking.noOfChild}
													</Typography>
												</div>
											</Grid>
											<Grid item xs={12}>
												<div>
													<Typography component="span">Additional beds: </Typography>
													<Typography component="span" gutterBottom>
														{booking.additional_beds}
													</Typography>
												</div>
											</Grid>
										</div>
									</Paper>
									{!viewMode && (
										<div style={{ width: "100%", margin: "10px 0" }}>
											<Grid container spacing={1}>
												<Formik
													initialValues={{
														noOfChild: booking.noOfChild,
														additional_beds: booking.additional_beds,
														payment_method: booking.payment_method
													}}
													onSubmit={async (values, actions) => {
														console.log(actions, values);
														await this.updateBookingDetails(values);
													}}
													validationSchema={function() {
														let schema = yup.object().shape({
															payment_method: yup.string().required("Payment method is required!")
														});
														return schema;
													}}
													enableReinitialize={true}
													render={props => {
														const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = props;
														const handleSelectChange = e => {
															setFieldValue(e.target.name, e.target.value);
														};
														return (
															<>
																<Grid item xs={12} md={6}>
																	<TextField
																		fullWidth
																		margin="dense"
																		id="noOfChild"
																		placeholder="Number of Children"
																		variant="outlined"
																		label="Number of Children"
																		value={values.noOfChild}
																		onChange={handleChange}
																		onBlur={handleBlur}
																		helperText={touched.noOfChild && errors.noOfChild ? errors.noOfChild : ""}
																		error={touched.noOfChild && errors.noOfChild ? true : false}
																		type="number"
																	/>
																</Grid>
																<Grid item xs={12} md={6}>
																	<TextField
																		fullWidth
																		margin="dense"
																		id="additional_beds"
																		placeholder="Additional Beds"
																		variant="outlined"
																		label="Additional Beds"
																		value={values.additional_beds}
																		onChange={handleChange}
																		onBlur={handleBlur}
																		helperText={touched.additional_beds && errors.additional_beds ? errors.additional_beds : ""}
																		error={touched.additional_beds && errors.additional_beds ? true : false}
																		type="number"
																	/>
																</Grid>
																<Grid item xs={12} md={6}>
																	<FormControl
																		variant="outlined"
																		error={touched.payment_method && errors.payment_method ? true : false}
																		fullWidth
																		labelWidth={100}
																		margin="dense"
																	>
																		<InputLabel htmlFor="outlined-age-native-simple">Payment method</InputLabel>
																		<Select
																			name="payment_method"
																			onChange={handleSelectChange}
																			value={values.payment_method}
																			SelectDisplayProps={{
																				style: {
																					display: "flex"
																				}
																			}}
																			input={<OutlinedInput labelWidth={125} />}
																		>
																			<MenuItem value="">none</MenuItem>
																			<MenuItem value={"Pera Padala"}>Pera Padala</MenuItem>
																			<MenuItem value={"Bank"}>Bank</MenuItem>
																		</Select>
																		<FormHelperText>
																			{touched.payment_method && errors.payment_method ? errors.payment_method : ""}
																		</FormHelperText>
																	</FormControl>
																</Grid>
																<Grid item xs={12}>
																	<div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
																		<Button variant="contained" color="primary" onClick={handleSubmit} size="small">
																			Submit
																			{this.state.updatingDetails && (
																				<CircularProgress
																					size={12}
																					style={{
																						marginLeft: 10
																					}}
																				/>
																			)}
																		</Button>
																	</div>
																</Grid>
															</>
														);
													}}
												/>
											</Grid>
										</div>
									)}
								</Grid>
								<Grid item xs={6}>
									<div
										style={{
											marginBottom: 15
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												width: "100%"
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center"
												}}
											>
												<EventAvailableIcon
													style={{
														marginRight: 10,
														fontSize: 30
													}}
												/>
												<Typography variant="h5">Reservation</Typography>
											</div>
											{/* remove */}
											{booking.status === "PENDING" && (
												<IconButton onClick={this.openEditReservationDates} size="small">
													<Icon size="small">edit</Icon>
												</IconButton>
											)}
										</div>
									</div>

									{!this.state.editReservationDates || viewMode ? (
										<Paper
											style={{
												padding: "15px"
											}}
										>
											<div
												style={{
													marginBottom: 20
												}}
											>
												<br />
												<Grid container>
													<Grid item xs={12} md={4}>
														<div>
															<Typography align="center" variant="h5" gutterBottom>
																Check-in Date
															</Typography>
															<Typography align="center" gutterBottom>
																{moment(booking.from_date).format("MMM DD, YYYY")}
															</Typography>
														</div>
													</Grid>
													<Grid item xs={12} md={4}>
														<div>
															<Typography align="center" variant="h5" gutterBottom>
																Check-out Date
															</Typography>
															<Typography align="center" gutterBottom>
																{moment(booking.to_date).format("MMM DD, YYYY")}
															</Typography>
														</div>
													</Grid>
													<Grid item xs={12} md={4}>
														<div>
															<Typography align="center" variant="h5" gutterBottom>
																Arrival
															</Typography>
															<Typography align="center" gutterBottom>
																{booking.status === "NOSHOW" ? "No show" : moment(booking.arrival).format("HH:mm A")}
															</Typography>
														</div>
													</Grid>
												</Grid>
											</div>
											{(booking.checkin_date || booking.checkout_date) && (
												<>
													<Divider />
													<div
														style={{
															marginTop: 20
														}}
													>
														<Grid container>
															{booking.checkin_date && (
																<Grid item xs={12} md={6}>
																	<div>
																		<Typography align="center" variant="h5" gutterBottom>
																			Checked in
																		</Typography>
																		<Typography align="center" gutterBottom>
																			{moment(booking.checkin_date).format("MMM DD, YYYY hh:mm A")}
																		</Typography>
																	</div>
																</Grid>
															)}
															{booking.checkout_date && (
																<Grid item xs={12} md={6}>
																	<div>
																		<Typography align="center" variant="h5" gutterBottom>
																			Checked Out
																		</Typography>
																		<Typography align="center" gutterBottom>
																			{moment(booking.checkout_date).format("MMM DD, YYYY HH:mm A")}
																		</Typography>
																	</div>
																</Grid>
															)}
														</Grid>
													</div>
												</>
											)}
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
								</Grid>

								<Grid item xs={6}>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											marginBottom: 15
										}}
									>
										<PaymentIcon
											style={{
												marginRight: 10,
												fontSize: 30
											}}
										/>
										<Typography variant="h5">Payment</Typography>
									</div>
									<Paper>
										{this.state.fetched && this.state.fetchingPayment && (
											<LinearProgress
												style={{
													height: 2
												}}
											/>
										)}
										<div
											style={{
												margin: "0 5px 0 5px",
												padding: "15px"
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													marginBottom: 10
												}}
											>
												<Typography variant="h6">Paid</Typography>
												{/* {!viewMode && (
													<Button variant="text" color="primary" onClick={this.onOpenAddBilling} size="small">
														Add
													</Button>
												)} */}
											</div>
											<Divider />
											<div>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell>#</TableCell>
															<TableCell>Date added</TableCell>
															<TableCell>Type</TableCell>
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
																	<TableCell>{row.type}</TableCell>
																	<TableCell>{moment(row.created_at).format("MMM DD, YYYY hh:mm A")}</TableCell>
																	<TableCell align="right" component="th" scope="row">
																		&#8369;
																		<NumeralComponent number={row.amount} />
																	</TableCell>
																	{!viewMode && (
																		<TableCell align="right" component="th" scope="row">
																			{row.delete ? (
																				<IconButton
																					aria-label="more"
																					aria-controls="long-menu"
																					aria-haspopup="true"
																					onClick={e => this.onMorePayment(e, row)}
																					size="small"
																				>
																					<MoreVertIcon
																						style={{
																							fontSize: "1.25em"
																						}}
																					/>
																				</IconButton>
																			) : null}
																		</TableCell>
																	)}
																</TableRow>
															))
														) : (
															<TableRow>
																<TableCell colSpan={5}>
																	<div
																		style={{
																			padding: "50px 0",
																			display: "flex",
																			justifyContent: "center"
																		}}
																	>
																		<Typography align="center" variant="button">
																			No added payment yet
																		</Typography>
																	</div>
																</TableCell>
															</TableRow>
														)}
														<TableRow>
															<TableCell colSpan={4} align="right">
																Total Due: &#8369;
																<NumeralComponent number={booking.totalPrice} />
															</TableCell>
															{!viewMode && <TableCell align="right"></TableCell>}
														</TableRow>
														<TableRow>
															<TableCell colSpan={4} align="right">
																Amount Paid: &#8369;
																<NumeralComponent number={booking.total} />
															</TableCell>
															{!viewMode && <TableCell align="right"></TableCell>}
														</TableRow>
														<TableRow>
															<TableCell colSpan={4} align="right">
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
									<div style={{ marginTop: 20 }}>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												marginBottom: 10
											}}
										>
											<Typography variant="h5">Rooms</Typography>
											{/* remove */}
											{booking.status === "PENDING" && (
												<Button variant="outlined" size="small" color="primary" onClick={this.onClickAddRoom}>
													<AddCircleIcon
														style={{
															marginRight: 5
														}}
													/>
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
										<div
											style={{
												marginTop: 20
											}}
										>
											{this.state.fetchingRooms && (
												<LinearProgress
													style={{
														height: 2
													}}
												/>
											)}
											<div>
												<Paper elevation={1}>
													<Table>
														<TableHead>
															<TableRow>
																<TableCell>#</TableCell>
																<TableCell>Room number</TableCell>
																<TableCell>Room</TableCell>
																{/* remove */}
															</TableRow>
														</TableHead>
														<TableBody>
															{rooms.length > 0 ? (
																rooms.map((row, i) => (
																	<TableRow key={row.name}>
																		<TableCell component="th" scope="row">
																			{i + 1}
																		</TableCell>
																		<TableCell>{row.room.room_number}</TableCell>
																		<TableCell>{row.room_type.name}</TableCell>
																	</TableRow>
																))
															) : (
																<TableRow>
																	<TableCell colSpan={5}>
																		<div
																			style={{
																				padding: "50px 0",
																				display: "flex",
																				justifyContent: "center"
																			}}
																		>
																			<Typography align="center" variant="button">
																				No rooms added
																			</Typography>
																		</div>
																	</TableCell>
																</TableRow>
															)}
														</TableBody>
													</Table>
												</Paper>
												{/* {rooms.map((room, i) => {
													return (
														<ExpansionPanel
															expanded={this.state.selectedRoom === room.id}
															onChange={() => this.handleChangeRoomExpansion(room.id)}
															key={room.id}
														>
															<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
																<Typography> {room.room.room_number + " " + room.room_type.name}</Typography>
															</ExpansionPanelSummary>
															<ExpansionPanelDetails
																style={{
																	backgroundColor: "#dbd2d2"
																}}
															>
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
												})} */}
											</div>
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
					)}

					{/* Add Billing Form */}
					<Formik
						initialValues={{
							type: this.state.paymentType,
							amount: this.state.initialPayment
						}}
						onSubmit={async (values, actions) => {
							console.log(actions, values);
							// this.onCloseAddBilling();
							await this.onAddBilling(values);
						}}
						validationSchema={function() {
							let schema = yup.object().shape({
								amount: yup
									.number()
									.min(1, "Must not be zero(0)")
									.required("Amount field is required!"),
								type: yup.string().required("Please select payment type")
							});
							return schema;
						}}
						enableReinitialize={true}
						render={props => {
							const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = props;

							const onExit = () => {
								props.resetForm();
								this.onExitBilling();
							};

							const handleSelectChange = e => {
								console.log(e.target.name, e.target.value);
								setFieldValue(e.target.name, e.target.value);
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
											<div
												style={{
													textAlign: "center"
												}}
											>
												<CircularProgress />
											</div>
										) : (
											<>
												<DialogContentText>Please provide the amount of billing you want to add</DialogContentText>
												<FormControl
													variant="outlined"
													style={{ width: "100%" }}
													error={touched.type && errors.type ? true : false}
													margin="normal"
												>
													<InputLabel ref={el => (this.paymentInputLabel = el)} id="demo-simple-select-outlined-label">
														Type
													</InputLabel>
													<Select
														id="type"
														name="type"
														value={values.type}
														onChange={handleSelectChange}
														onBlur={handleSelectChange}
														fullWidth
														style={{ width: "100%" }}
														margin="normal"
														labelWidth={38}
													>
														<MenuItem value="">
															<em>None</em>
														</MenuItem>
														<MenuItem value={"Advance Payment"}>Advance Payment</MenuItem>
														<MenuItem value={"Cash"}>Cash</MenuItem>
														<MenuItem value={"Bank Transfer"}>Bank Transfer</MenuItem>
														<MenuItem value={"Pera Padala"}>Pera Padala</MenuItem>
													</Select>
													<FormHelperText>{touched.type && errors.type ? errors.type : ""}</FormHelperText>
												</FormControl>
												<TextField
													style={{ marginTop: 10 }}
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
											add{" "}
											{isSubmitting && (
												<CircularProgress
													size={12}
													style={{
														marginLeft: 10
													}}
												/>
											)}
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
							<DialogContentText id="alert-dialog-description">
								Are you really sure you want to delete this payment?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button color="primary" onClick={this.onCloseDeleteBilling} disabled={changingStatus}>
								Cancel
							</Button>
							<Button color="primary" onClick={this.onDeleteBilling} autoFocus disabled={this.state.deletingPayment ? true : false}>
								Confirm{" "}
								{this.state.deletingPayment && (
									<CircularProgress
										size={12}
										style={{
											marginLeft: 10
										}}
									/>
								)}
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
						ClickAwayListenerProps={{
							onClickAway: () => null
						}}
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
								{changingStatus && (
									<CircularProgress
										size={12}
										style={{
											marginLeft: 10
										}}
									/>
								)}
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

					<Dialog
						open={this.state.showQr}
						onClose={this.handleShowQrCode}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						onEnter={() => {
							QRCode.toCanvas(this.qrCodeELement, this.props.match.params.id, {
								width: 400
							});
						}}
					>
						<DialogTitle id="alert-dialog-title">QR Code</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">Show to the receptionist.</DialogContentText>
							<div style={{ width: "100%" }}>
								<canvas ref={el => (this.qrCodeELement = el)} width="100%"></canvas>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleShowQrCode} color="primary">
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</>
		);
	}
}
