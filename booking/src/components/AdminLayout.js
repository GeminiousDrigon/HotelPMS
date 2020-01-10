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
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import TodayIcon from "@material-ui/icons/Today";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { GET, POST, PUT } from "../utils/restUtils";
import { useState } from "react";
import moment from "moment";
import * as yup from "yup";
import { Formik } from "formik";

const drawerWidth = 240;

const DateComponent = React.memo(function DateFormatter(props) {
  return moment(new Date(props.date)).format("ddd, MMM D, YYYY hA");
});

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
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [noUser, setNoUser] = React.useState(false);
  const [user, setUser] = useState({});
  const [notification, setNotification] = React.useState(false);
  const [appBarRef, setAppBarRef] = React.useState(null);
  const [notif, setNotif] = React.useState({
    notifications: [],
    unreadNotifications: 0
  });
  const [failedUpdate, setFailedUpdate] = React.useState(false);
  const [successPassword, setSuccessPassword] = React.useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const handleNotification = e => {
    setAppBarRef(notification ? null : e.currentTarget);
    setNotification(!notification);
  };

  const onExitNotification = async () => {
    if (notif.unreadNotifications > 0) {
      let { data } = await GET("/api/user");
      let { id } = data;
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
      let account;
      account = await GET("/api/user");
      account = account.data;
      console.log(noUser, account);
      let { data } = await GET(`/api/user/${account.id}/notifications`);
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
      name: "Booking",
      icon: <HomeIcon />,
      path: "/home"
    },
    {
      name: "Book Room",
      icon: <TodayIcon />,
      path: "/booking"
    }
  ];

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
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <Tooltip title="Asia/Manila Dec. 02, 2019 10:10:10">
                <Button color="inherit">Local Timezone</Button>
              </Tooltip> */}
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

              {!noUser && (
                <IconButton aria-label="delete" onClick={handleNotification} style={{ marginLeft: 5 }}>
                  <Badge badgeContent={notif.unreadNotifications} color="secondary">
                    <NotificationsIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>{" "}
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
            [classes.drawerClose]: !open,
            ["d-print-none"]: true
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
