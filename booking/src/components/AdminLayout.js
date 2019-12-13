import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import HotelTwoToneIcon from "@material-ui/icons/HotelTwoTone";
import EventTwoToneIcon from "@material-ui/icons/EventTwoTone";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import MeetingRoomTwoToneIcon from "@material-ui/icons/MeetingRoomTwoTone";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import TodayIcon from "@material-ui/icons/Today";

import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { GET } from "../utils/restUtils";
import { useState } from "react";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		height: "100%"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 5
		// transition: theme.transitions.create(["width", "margin"], {
		//     easing: theme.transitions.easing.sharp,
		//     duration: theme.transitions.duration.leavingScreen
		// })
	},
	appBarShift: {
		marginLeft: drawerWidth
		// width: `calc(100% - ${drawerWidth}px)`,
		// transition: theme.transitions.create(["width", "margin"], {
		//     easing: theme.transitions.easing.sharp,
		//     duration: theme.transitions.duration.enteringScreen
		// })
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap"
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		}),
		zIndex: "20 !important"
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1
		},
		zIndex: "20 !important"
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		overflow: "auto"
	},
	title: {
		flexGrow: 1
	}
}));

export default function AdminLayout(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);

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

	function handleDrawerOpen() {
		setOpen(!open);
	}

	function handleDrawerClose() {
		setOpen(false);
	}

	const goToPage = path => {
		props.history.push(path);
	};

	const handleClickOpen = () => {
		setOpenDialog(true);
	};

	const handleClose = () => {
		setOpenDialog(false);
	};

	const menus = [
		{
			name: "Calendar",
			icon: <HomeIcon />,
			path: "/home"
		},
		{
			name: "Booking",
			icon: <TodayIcon />,
			path: "/booking"
		},

	];

	const onLogout = () => {
		localStorage.removeItem("login");
		localStorage.removeItem("user");
		props.history.push("/sign-in");
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
				elevation={1}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						className={classes.title}
						onClick={() => props.history.push("/")}
						style={{ cursor: "pointer" }}
					>
						Bluepool Garden
					</Typography>
					<div style={{ display: "flex", flexDirection: "row" }}>
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
					</div>
				</Toolbar>
			</AppBar>
			<Dialog
				style={{ margin: "10px" }}
				fullWidth={true}
				maxWidth="xl"
				open={openDialog}
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
							<TextField style={{ width: "100%" }} id="standard-name" label="Contact Number" value="09361180320" margin="normal" />
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
			<Drawer
				id="drawer"
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
				open={open}
			>
				<Divider />
				<List style={{ marginTop: 70 }}>
					{menus.map((text, index) => (
						<ListItem button key={text.name} onClick={() => goToPage(text.path)}>
							<ListItemIcon>{text.icon}</ListItemIcon>
							<ListItemText primary={text.name} />
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>

			<div
				id="content-container"
				className={classes.content}
				style={Object.assign(
					{},
					{
						overlow: "auto",
						padding: props.noPadding ? "0" : "84px 24px 24px",
						backgroundColor: "#f7f7f7",
						flex: 1
					},
					props.style
				)}
			>
				{props.children}
			</div>
		</div>
	);
}
