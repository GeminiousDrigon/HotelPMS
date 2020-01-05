import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { GET, PUT } from "../utils/restUtils";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import axios from "axios";
import {
	InputAdornment,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	CircularProgress
} from "@material-ui/core";
import * as yup from "yup";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 2
	}
}));

export default function BookingLayout(props) {
	const [open, setOpen] = React.useState(false);
	const [failedUpdate, setFailedUpdate] = React.useState(false);
	const [noUser, setNoUser] = React.useState(false);
	const [successPassword, setSuccessPassword] = React.useState(false);
	const [user, setUser] = useState({
		honorific: "",
		firstname: "",
		lastname: "",
		middlename: "",
		country: "",
		address: "",
		contactno: "",
		email: "",
		id: ""
	});
	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		try {
			let { data } = await GET("/api/user");
			data.contactno = parseInt(data.contactno.substring(3));
			setUser(data);
		} catch (err) {
			setNoUser(true);
			console.log(err);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setSuccessPassword(false);
		setOpen(false);
	};
	const classes = useStyles();

	const onLogout = () => {
		localStorage.removeItem("login");
		localStorage.removeItem("user");
		props.history.push("/sign-in");
	};

	const updateUserDetails = async values => {
		try {
			values.contactno = "+63" + values.contactno;
			await PUT(`/api/user/${values.id}`, {
				...values
			});
			window.location.reload(true);
		} catch (err) {
			setFailedUpdate(true);
		}
	};

	const updateUserPassword = async (values, actions) => {
		try {
			let { data } = await GET("/api/user");
			await PUT(`/api/user/${data.id}/password`, {
				oldPassword: values.oldPassword,
				newPassword: values.newPassword,
				email: data.email
			});
			setSuccessPassword(true);
			actions.resetForm();
		} catch (err) {
			console.log("error", err);
		}
	};
	const goToLogin = () => props.history.push("/sign-in");

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Bluepool Garden
					</Typography>
					<Button color="inherit" onClick={() => props.history.push("/home")}>
						Home
					</Button>
					<Typography variant="h2" style={{ fontWeight: "200" }}>
						I
					</Typography>
					<Tooltip title="Asia/Manila Dec. 02, 2019 10:10:10">
						<Button color="inherit">Local Timezone</Button>
					</Tooltip>
					<Typography variant="h2" style={{ fontWeight: "200" }}>
						I
					</Typography>
					{noUser ? (
						<Button color="inherit" onClick={goToLogin}>
							Login
						</Button>
					) : (
						<Button color="inherit" onClick={handleClickOpen}>
							{/* Mr. Dominic Anuta Vega */}
							{user.honorific}{" "}
							{` ${user.firstname ? user.firstname : ""} ${user.middlename ? user.middlename : ""} ${
								user.lastname ? user.lastname : ""
							}`}
						</Button>
					)}

					<Dialog
						style={{ margin: "10px" }}
						fullWidth={true}
						maxWidth="xl"
						open={open}
						onClose={handleClose}
						aria-labelledby="form-dialog-title"
					>
						{/* .........................PROFILE................................ */}
						<DialogTitle id="form-dialog-title">Profile</DialogTitle>
						<DialogContent>
							<DialogTitle id="form-dialog-title">
								<Typography variant="h5">Update Personal Information</Typography>
							</DialogTitle>
							{failedUpdate && (
								<Typography variant="h6" color="error">
									{" "}
									Failed to update please try again.
								</Typography>
							)}
							<Formik
								initialValues={{
									...user
								}}
								onSubmit={async (values, actions) => {
									console.log(actions, values);
									// this.onCloseAddBilling();
									await updateUserDetails(values);
								}}
								validationSchema={function() {
									let schema = yup.object().shape({
										honorific: yup.string("Honorific must be a word!").required("Honorific is required!"),
										firstname: yup.string("Name must be a word!").required("First Name is required!"),
										middlename: yup.string("Name must be a word!").required("Middle Name is required!"),
										lastname: yup.string("Name must be a word!").required("Last Name is required!"),
										address: yup.string("Name must be a word!").required("Address is required!"),
										country: yup.string("Name must be a word!").required("Country is required!"),
										email: yup.string("Name must be a word!").required("Gmail is required!"),
										contactno: yup
											.string("Name must be a word!")
											.length(10, "Contact number must be 10 digits")
											.required("Contact number is required!")
									});
									return schema;
								}}
								enableReinitialize={true}
								render={props => {
									const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = props;

									const onChangeNumber = e => {
										if (e.target.value.length > 10) {
											props.setFieldValue("contactno", e.target.value.substring(0, 10));
										} else {
											props.setFieldValue("contactno", e.target.value);
										}
									};
									const handleSelectChange = e => {
										setFieldValue(e.target.name, e.target.value);
									};

									return (
										<Grid container spacing={3}>
											<Grid item xs={12} sm={3}>
												<FormControl
													name="honorific"
													id="honorific"
													margin="normal"
													fullWidth
													style={{ marginBottom: 20 }}
													error={errors.honorific}
												>
													<InputLabel htmlFor="outlined-age-native-simple">Honorific</InputLabel>
													<Select
														value={values.honorific}
														onChange={handleSelectChange}
														SelectDisplayProps={{
															style: { display: "flex" }
														}}
														name="honorific"
														id="honorific"
													>
														<MenuItem value={"Mr"}>Mr</MenuItem>
														<MenuItem value={"Ms"}>Ms</MenuItem>
														<MenuItem value={"Dr"}>Dr</MenuItem>
														<MenuItem value={"Atty"}>Atty</MenuItem>
													</Select>
													<FormHelperText>{errors.room_type ? errors.room_type : ""}</FormHelperText>
												</FormControl>
											</Grid>
											<Grid item xs={12} sm={3}>
												<TextField
													style={{ width: "100%" }}
													label="First Name"
													margin="normal"
													id="firstname"
													name="firstname"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.firstname}
													helperText={touched.firstname && errors.firstname ? errors.firstname : ""}
													error={touched.firstname && errors.firstname ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={3}>
												<TextField
													style={{ width: "100%" }}
													label="Middle Name"
													margin="normal"
													id="middlename"
													name="middlename"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.middlename}
													helperText={touched.middlename && errors.middlename ? errors.middlename : ""}
													error={touched.middlename && errors.middlename ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={3}>
												<TextField
													style={{ width: "100%" }}
													id="standard-name"
													label="Last Name"
													value="Vega"
													margin="normal"
													id="lastname"
													name="lastname"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.lastname}
													helperText={touched.lastname && errors.lastname ? errors.lastname : ""}
													error={touched.lastname && errors.lastname ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													style={{ width: "100%" }}
													label="Country"
													value="Philippines"
													margin="normal"
													id="country"
													name="country"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.country}
													helperText={touched.country && errors.country ? errors.country : ""}
													error={touched.country && errors.country ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													style={{ width: "100%" }}
													label="Address"
													value="Clarin, Bohol"
													margin="normal"
													id="address"
													name="address"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.address}
													helperText={touched.address && errors.address ? errors.address : ""}
													error={touched.address && errors.address ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													style={{ width: "100%" }}
													label="Contact Number"
													type="number"
													margin="normal"
													InputProps={{
														startAdornment: <InputAdornment position="start">+63</InputAdornment>
													}}
													id="contactno"
													name="contactno"
													onChange={onChangeNumber}
													onBlur={handleBlur}
													value={values.contactno}
													helperText={touched.contactno && errors.contactno ? errors.contactno : ""}
													error={touched.contactno && errors.contactno ? true : false}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													style={{ width: "100%" }}
													label="Gmail Address"
													margin="normal"
													id="email"
													name="email"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.email}
													helperText={touched.email && errors.email ? errors.email : ""}
													error={touched.email && errors.email ? true : false}
												/>
											</Grid>
											<Grid item xs={12}>
												<div style={{ display: "flex", flexDirection: "row" }}>
													<Button
														style={{
															marginRight: 10
														}}
														variant="contained"
														color="secondary"
														onClick={handleSubmit}
														disabled={isSubmitting}
														color="primary"
													>
														Save &amp; Update{" "}
														{isSubmitting && (
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
										</Grid>
									);
								}}
							/>

							{successPassword && (
								<Typography variant="h6" color="error">
									{" "}
									Failed to update please try again.
								</Typography>
							)}
							<Formik
								initialValues={{
									...user
								}}
								onSubmit={async (values, actions) => {
									console.log(actions, values);
									// this.onCloseAddBilling();
									await updateUserPassword(values, actions);
								}}
								validationSchema={function() {
									let schema = yup.object().shape({
										oldPassword: yup.string("Old password must be a word!").required("Old password is required!"),
										newPassword: yup
											.string()
											.required("Password is required!")
											.matches(
												/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/,
												"Password must be at least 8 letters, uppercase, lowercase and numbers."
											),
										confirmPassword: yup
											.string()
											.required("Password confirmation is required!")
											.oneOf([yup.ref("newPassword"), null], "Password does not match!")
									});
									return schema;
								}}
								enableReinitialize={true}
								render={props => {
									const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue } = props;
									return (
										<>
											<Grid container spacing={3}>
												<Grid item xs={12} sm={4}>
													<TextField
														type="password"
														style={{ width: "100%" }}
														label="Old Password"
														margin="normal"
														id="oldPassword"
														name="oldPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.oldPassword}
														helperText={touched.oldPassword && errors.oldPassword ? errors.oldPassword : ""}
														error={touched.oldPassword && errors.oldPassword ? true : false}
													/>
												</Grid>
												<Grid item xs={12} sm={4}>
													<TextField
														type="password"
														style={{ width: "100%" }}
														label="New Password"
														margin="normal"
														id="newPassword"
														name="newPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.newPassword}
														helperText={touched.newPassword && errors.newPassword ? errors.newPassword : ""}
														error={touched.newPassword && errors.newPassword ? true : false}
													/>
												</Grid>
												<Grid item xs={12} sm={4}>
													<TextField
														type="password"
														style={{ width: "100%" }}
														label="Confirm Password"
														margin="normal"
														id="confirmPassword"
														name="confirmPassword"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirmPassword}
														helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
														error={touched.confirmPassword && errors.confirmPassword ? true : false}
													/>
												</Grid>
											</Grid>
											<Button
												style={{
													marginRight: 10
												}}
												variant="contained"
												color="secondary"
												onClick={handleSubmit}
												disabled={isSubmitting}
												color="primary"
											>
												Update Password{" "}
												{isSubmitting && (
													<CircularProgress
														size={12}
														style={{
															marginLeft: 10
														}}
													/>
												)}
											</Button>
										</>
									);
								}}
							/>
						</DialogContent>{" "}
						<DialogActions>
							<Button
								style={{
									marginLeft: 10
								}}
								variant="contained"
								color="primary"
								onClick={onLogout}
							>
								logout
							</Button>
						</DialogActions>
					</Dialog>
				</Toolbar>
			</AppBar>

			<main className={classes.content} style={{ padding: 25 }}>
				{props.children}
			</main>
		</div>
	);
}
