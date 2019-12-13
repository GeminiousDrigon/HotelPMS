import React, { useEffect, useRef } from "react";
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
import PieChartIcon from "@material-ui/icons/PieChart";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
    const [anchorEl, setAnchorEl] = React.useState(null);

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
            items: [
                {
                    name: "Summary",
                    icon: <PieChartIcon />,
                    path: "/reports/summary"
                },
                {
                    name: "Yearly Report",
                    icon: <CalendarViewDayIcon />,
                    path: "/reports/yearly"
                }
            ]
        }
    ];

    const receptionistMenu = [
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
        }
    ];

    const onLogout = () => {
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        props.history.push("/sign-in");
    };
    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const openMenu = Boolean(anchorEl);

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <div className="d-print-none">
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
                            <div>
                                {/* <Button color="inherit" onClick={handleOpenMenu}>
                                    Logout
                                </Button> */}
                                <IconButton aria-label="delete">
                                    <AccountCircleIcon
                                        style={{ color: "white" }}
                                        onClick={handleOpenMenu}
                                    />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>

                <Drawer
                    id="drawer"
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                        ["exclude-print"]: true
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
                        {props.user.role.name === "ADMIN"
                            ? menus.map((text, index) => {
                                  if (text.items) {
                                      return text.items.map((item, i) => {
                                          if (i === 0) {
                                              return (
                                                  <React.Fragment
                                                      key={text.name}
                                                  >
                                                      <ListItem key={text.name}>
                                                          <ListItemIcon>
                                                              {text.icon}
                                                          </ListItemIcon>
                                                          <ListItemText
                                                              primary={
                                                                  text.name
                                                              }
                                                          />
                                                      </ListItem>
                                                      <Divider />
                                                      <ListItem
                                                          button
                                                          key={item.name}
                                                          onClick={() =>
                                                              goToPage(
                                                                  item.path
                                                              )
                                                          }
                                                          style={{
                                                              marginLeft: 5
                                                          }}
                                                      >
                                                          <ListItemIcon>
                                                              {item.icon}
                                                          </ListItemIcon>
                                                          <ListItemText
                                                              primary={
                                                                  item.name
                                                              }
                                                          />
                                                      </ListItem>
                                                  </React.Fragment>
                                              );
                                          } else
                                              return (
                                                  <ListItem
                                                      button
                                                      key={item.name}
                                                      onClick={() =>
                                                          goToPage(item.path)
                                                      }
                                                      style={{ marginLeft: 5 }}
                                                  >
                                                      <ListItemIcon>
                                                          {item.icon}
                                                      </ListItemIcon>
                                                      <ListItemText
                                                          primary={item.name}
                                                      />
                                                  </ListItem>
                                              );
                                      });
                                  } else
                                      return (
                                          <ListItem
                                              button
                                              key={text.name}
                                              onClick={() =>
                                                  goToPage(text.path)
                                              }
                                          >
                                              <ListItemIcon>
                                                  {text.icon}
                                              </ListItemIcon>
                                              <ListItemText
                                                  primary={text.name}
                                              />
                                          </ListItem>
                                      );
                              })
                            : receptionistMenu.map((text, index) => {
                                  if (text.items) {
                                      return text.items.map((item, i) => {
                                          if (i === 0) {
                                              return (
                                                  <React.Fragment
                                                      key={text.name}
                                                  >
                                                      <ListItem key={text.name}>
                                                          <ListItemIcon>
                                                              {text.icon}
                                                          </ListItemIcon>
                                                          <ListItemText
                                                              primary={
                                                                  text.name
                                                              }
                                                          />
                                                      </ListItem>
                                                      <Divider />
                                                      <ListItem
                                                          button
                                                          key={item.name}
                                                          onClick={() =>
                                                              goToPage(
                                                                  item.path
                                                              )
                                                          }
                                                          style={{
                                                              marginLeft: 5
                                                          }}
                                                      >
                                                          <ListItemIcon>
                                                              {item.icon}
                                                          </ListItemIcon>
                                                          <ListItemText
                                                              primary={
                                                                  item.name
                                                              }
                                                          />
                                                      </ListItem>
                                                  </React.Fragment>
                                              );
                                          } else
                                              return (
                                                  <ListItem
                                                      button
                                                      key={item.name}
                                                      onClick={() =>
                                                          goToPage(item.path)
                                                      }
                                                      style={{ marginLeft: 5 }}
                                                  >
                                                      <ListItemIcon>
                                                          {item.icon}
                                                      </ListItemIcon>
                                                      <ListItemText
                                                          primary={item.name}
                                                      />
                                                  </ListItem>
                                              );
                                      });
                                  } else
                                      return (
                                          <ListItem
                                              button
                                              key={text.name}
                                              onClick={() =>
                                                  goToPage(text.path)
                                              }
                                          >
                                              <ListItemIcon>
                                                  {text.icon}
                                              </ListItemIcon>
                                              <ListItemText
                                                  primary={text.name}
                                              />
                                          </ListItem>
                                      );
                              })}
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
            <Popover
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <div
                    style={{
                        padding: 30,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        style={{
                            width: 80,
                            height: 80,
                            fontSize: "2.2em",
                            marginBottom: 10,
                            backgroundColor: "#3f51b5"
                        }}
                    >{`${props.user.firstname[0] +
                        props.user.lastname[0]}`}</Avatar>
                    <Typography variant="h5">{`${props.user.firstname} ${props.user.middlename[0]}. ${props.user.lastname}`}</Typography>
                    <Typography>{props.user.role.name}</Typography>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: 30
                        }}
                    >
                        {/* <Button color="primary" onClick={onLogout} variant="text">
                            Change Password
                        </Button> */}
                        <Button
                            color="primary"
                            onClick={onLogout}
                            variant="text"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </Popover>
        </>
    );
}
