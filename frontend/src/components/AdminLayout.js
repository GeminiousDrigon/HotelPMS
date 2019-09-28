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

    function handleDrawerOpen() {
        setOpen(!open);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    const goToPage = path => {
        props.history.push(path);
    };

    const menus = [
        {
            name: "Calendar",
            icon: <Icon>calendar_today</Icon>,
            path: "/calendar"
        },
        {
            name: "Walk-in",
            icon: <HotelTwoToneIcon />,
            path: "/walkin"
        },
        {
            name: "Bookings",
            icon: <EventTwoToneIcon />,
            path: "/bookings"
        },
        {
            name: "Accounts",
            icon: <GroupTwoToneIcon />,
            path: "/account"
        },
        {
            name: "Property",
            icon: <Icon>apartment</Icon>,
            path: "/property"
        },
        {
            name: "Reports",
            icon: <DescriptionTwoToneIcon />,
            path: "/reports"
        }
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
                    <Typography variant="h6" className={classes.title}>
                        Bluepool Garden
                    </Typography>
                    <div>
                        <Button color="inherit" onClick={onLogout}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
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
                        <ListItem
                            button
                            key={text.name}
                            onClick={() => goToPage(text.path)}
                        >
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
