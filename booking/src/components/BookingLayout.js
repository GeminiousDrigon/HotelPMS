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
import { GET } from "../utils/restUtils";
import { useState, useEffect } from "react";

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
	const [user, setUser] = useState({});
	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		try {
			let { data } = await GET("/api/user");
			setUser(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const classes = useStyles();

	const onLogout = () => {
		localStorage.removeItem("login");
		localStorage.removeItem("user");
		props.history.push("/sign-in");
	};

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
					<Button color="inherit" onClick={handleClickOpen}>
						{/* Mr. Dominic Anuta Vega */}
						{user.honorific}{" "}
						{` ${user.firstname ? user.firstname : null} ${user.middlename ? user.middlename : null} ${
							user.lastname ? user.lastname : null
						}`}
					</Button>

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
							<Grid container spacing={3}>
								<Grid item xs={12} sm={2}>
									<TextField style={{ marginRight: "5px" }} id="standard-name" label="Salutation" value="Mr" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField style={{ width: "100%" }} id="standard-name" label="First Name" value="Dominic" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField style={{ width: "100%" }} id="standard-name" label="Middle Name" value="Anuta" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField style={{ width: "100%" }} id="standard-name" label="Last Name" value="Vega" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField style={{ width: "100%" }} id="standard-name" label="Country" value="Philippines" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField style={{ width: "100%" }} id="standard-name" label="Address" value="Clarin, Bohol" margin="normal" />
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										style={{ width: "100%" }}
										id="standard-name"
										label="Contact Number"
										value="09361180320"
										margin="normal"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										style={{ width: "100%" }}
										id="standard-name"
										label="Gmail Address"
										value="davega12.dv@gmail.com"
										margin="normal"
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
										>
											Save &amp; Update
										</Button>
										<Button
											style={{
												marginLeft: 10
											}}
											variant="contained"
											color="secondary"
											onClick={onLogout}
										>
											logout
										</Button>
									</div>
								</Grid>
							</Grid>
						</DialogContent>{" "}
					</Dialog>
				</Toolbar>
			</AppBar>

			<main className={classes.content} style={{ padding: 25 }}>
				{props.children}
			</main>
		</div>
	);
}
