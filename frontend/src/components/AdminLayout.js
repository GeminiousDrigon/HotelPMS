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
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Badge } from "@material-ui/core";
import { GET, POST } from "../utils/restUtils";
import moment from "moment";
import Fab from "@material-ui/core/Fab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";

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

const DateComponent = React.memo(function DateFormatter(props) {
  return moment(new Date(props.date)).format("ddd, MMM D, YYYY hA");
});

export default function AdminLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState(false);
  const [appBarRef, setAppBarRef] = React.useState(null);
  const [notif, setNotif] = React.useState({
    notifications: [],
    unreadNotifications: 0
  });

  function handleDrawerOpen() {
    setOpen(!open);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const goToPage = path => {
    props.history.push(path);
  };

  const handleNotification = e => {
    setAppBarRef(notification ? null : e.currentTarget);
    setNotification(!notification);
  };

  const onExitNotification = async () => {
    if (notif.unreadNotifications > 0) {
      let { id } = props.user;
      await POST(`/api/user/${id}/notifications`);
    }
    setAppBarRef(null);
    setNotification(!notification);
  };

  useEffect(() => {
    getNotifications();
    let id = setInterval(() => {
      getNotifications();
    }, 4500);
    return () => {
      clearInterval(id);
    };
  }, []);

  const getNotifications = async paras => {
    try {
      let { data } = await GET(`/api/user/${props.user.id}/notifications`);
      setNotif(data);
    } catch (err) {
      console.log(err);
    }
  };

  const notificationGoToPage = async (path, notificationId) => {
    try {
      let { id } = props.user;
      await POST(`/api/user/${id}/notifications/${notificationId}`);
      props.history.push(path);
    } catch (err) {
      props.history.push(path);
    }
  };

  const menus = [
    {
      name: <Typography style={{ color: "#1093bd" }}>Calendar</Typography>,
      icon: <CalendarTodayOutlinedIcon style={{ color: "c89553" }} />,
      path: "/calendar"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Walk-in</Typography>,
      icon: <HotelTwoToneIcon style={{ color: "c89553" }} />,
      path: "/walkin"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Bookings</Typography>,
      icon: <EventTwoToneIcon style={{ color: "c89553" }} />,
      path: "/bookings"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Accounts</Typography>,
      icon: <GroupTwoToneIcon style={{ color: "c89553" }} />,
      path: "/account"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Property</Typography>,
      icon: <ApartmentOutlinedIcon style={{ color: "c89553" }} />,
      path: "/property"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Reports</Typography>,
      icon: <DescriptionTwoToneIcon style={{ color: "c89553" }} />,
      items: [
        {
          name: <Typography style={{ color: "#1093bd" }}>Summary</Typography>,
          icon: <PieChartIcon style={{ color: "c89553" }} />,
          path: "/reports/summary"
        },
        {
          name: <Typography style={{ color: "#1093bd" }}>Monthly Report</Typography>,
          icon: <CalendarViewDayIcon style={{ color: "c89553" }} />,
          path: "/reports/yearly"
        }
      ]
    }
  ];

  const receptionistMenu = [
    {
      name: <Typography style={{ color: "#1093bd" }}>Calendar</Typography>,
      icon: <CalendarTodayOutlinedIcon style={{ color: "c89553" }} />,
      path: "/calendar"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Walk-in</Typography>,
      icon: <HotelTwoToneIcon style={{ color: "c89553" }} />,
      path: "/walkin"
    },
    {
      name: <Typography style={{ color: "#1093bd" }}>Bookings</Typography>,
      icon: <EventTwoToneIcon style={{ color: "c89553" }} />,
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
              <div ref={appBarRef}>
                {/* <Button color="inherit" onClick={handleOpenMenu}>
                                    Logout
                                </Button> */}
                <IconButton aria-label="delete" onClick={handleNotification}>
                  <Badge badgeContent={notif.unreadNotifications} color="secondary">
                    <NotificationsIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </div>
              <div>
                {/* <Button color="inherit" onClick={handleOpenMenu}>
                                    Logout
                                </Button> */}
                <IconButton aria-label="delete" onClick={handleOpenMenu}>
                  <AccountCircleIcon style={{ color: "white" }} />
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
                          <React.Fragment key={text.name}>
                            <ListItem key={text.name}>
                              <ListItemIcon>{text.icon}</ListItemIcon>
                              <ListItemText primary={text.name} />
                            </ListItem>
                            <Divider />
                            <ListItem
                              button
                              key={item.name}
                              onClick={() => goToPage(item.path)}
                              style={{
                                marginLeft: 5
                              }}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.name} />
                            </ListItem>
                          </React.Fragment>
                        );
                      } else
                        return (
                          <ListItem button key={item.name} onClick={() => goToPage(item.path)} style={{ marginLeft: 5 }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        );
                    });
                  } else
                    return (
                      <ListItem button key={text.name} onClick={() => goToPage(text.path)}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
                      </ListItem>
                    );
                })
              : receptionistMenu.map((text, index) => {
                  if (text.items) {
                    return text.items.map((item, i) => {
                      if (i === 0) {
                        return (
                          <React.Fragment key={text.name}>
                            <ListItem key={text.name}>
                              <ListItemIcon>{text.icon}</ListItemIcon>
                              <ListItemText primary={text.name} />
                            </ListItem>
                            <Divider />
                            <ListItem
                              button
                              key={item.name}
                              onClick={() => goToPage(item.path)}
                              style={{
                                marginLeft: 5
                              }}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.name} />
                            </ListItem>
                          </React.Fragment>
                        );
                      } else
                        return (
                          <ListItem button key={item.name} onClick={() => goToPage(item.path)} style={{ marginLeft: 5 }}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                          </ListItem>
                        );
                    });
                  } else
                    return (
                      <ListItem button key={text.name} onClick={() => goToPage(text.path)}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
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
              backgroundColor: "#c89553"
            }}
          >{`${props.user.firstname[0] + props.user.lastname[0]}`}</Avatar>
          <Typography>{props.user.role.name}</Typography>
          <Typography
            style={{ fontSize: "20px", fontStretch: "100%", color: "#1093bd" }}
          >{`${props.user.firstname} ${props.user.middlename[0]}. ${props.user.lastname}`}</Typography>
          <Typography style={{ color: "#5f6368" }}>{props.user.email}</Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 30
            }}
          >
            {/* <Button color="primary" onClick={onLogout} variant="text">
                            Change Password
                        </Button> */}

            <Fab
              onClick={onLogout}
              variant="text"
              style={{
                width: "200px",
                height: "30px",
                marginBottom: "4px"
              }}
            >
              SIGN OUT
            </Fab>
            <Fab
              // onClick={onLogout}
              href="../add/account"
              variant="text"
              style={{
                width: "200px",
                height: "30px"
              }}
            >
              {/* <PersonAddOutlinedIcon style={{ color: "#c89553" }} /> */}
              ADD ACCOUNT
            </Fab>
          </div>
        </div>
      </Popover>
      <Popover
        open={notification}
        anchorEl={appBarRef}
        onClose={onExitNotification}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div
          style={{
            width: 450
          }}
        >
          <List>
            {notif.notifications.map(item => {
              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    onClick={item.data.action_url ? () => notificationGoToPage(item.data.action_url, item.id) : () => {}}
                    button={item.data.action_url ? true : false}
                  >
                    <ListItemText
                      primary={item.data.title}
                      secondary={
                        <React.Fragment>
                          {item.data.message}
                          <Typography component="div" variant="caption" className={classes.inline} color="textPrimary">
                            <DateComponent date={item.created_at} />
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </>
              );
            })}
          </List>
        </div>
      </Popover>
    </>
  );
}
