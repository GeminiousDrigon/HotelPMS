import React from "react";
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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 5,
        // transition: theme.transitions.create(["width", "margin"], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen
        // })
    },
    appBarShift: {
        marginLeft: drawerWidth,
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
        })
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
        }
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
        padding: theme.spacing(3)
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

    const goToPage = (path) => {
        props.history.push(path)
    }
    

    const menus = [
        {
            name: "Walk-in",
            icon: <InboxIcon />,
            path: "/walkin",
        },
        {
            name: "Reservation",
            icon: <MailIcon />,
            path: "/reservation",
        },
        {
            name: "Rooms",
            icon: <InboxIcon />,
            path: "/room",
        },
        {
            name: "Room Facilities",
            icon: <InboxIcon />,
            path: "/roomfacilities",
        },
        {
            name: "Settings",
            icon: <MailIcon />,
            path: "/settings",
        },
    ]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
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
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
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
                    {menus.map(
                        (text, index) => (
                            <ListItem button key={text.name} onClick={()=>goToPage(text.path)}>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
            </Drawer>

            <main className={classes.content} style={{ marginTop: 50 }}>
                {props.children}
            </main>
        </div>
    );
}
