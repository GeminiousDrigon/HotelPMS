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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#1093bd" }}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Bluepool Garden
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Typography variant="h2" style={{ fontWeight: "200" }}>
                        I
                    </Typography>
                    <Tooltip title="Asia/Manila Dec. 02, 2019 10:10:10">
                        <Button color="inherit">Local Timezone</Button>
                    </Tooltip>
                    <Typography variant="h2" style={{ fontWeight: "200" }}>
                        I
                    </Typography>
                    <Tooltip title="My Profile/Bookings/Accounts">
                        <Button color="inherit" onClick={handleClickOpen}>
                            Mr. Dominic Anuta Vega
                        </Button>
                    </Tooltip>

                    <Dialog
                        style={{ margin: "10px", backgroundColor: "#1093bd" }}
                        fullWidth={true}
                        maxWidth="xl"
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        {/* .........................PROFILE................................ */}
                        <DialogTitle id="form-dialog-title">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </DialogTitle>
                        <DialogContent>
                            <DialogTitle id="form-dialog-title">
                                <h4>Update Personal Information</h4>
                            </DialogTitle>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        style={{ marginRight: "5px" }}
                                        id="standard-name"
                                        label="Salutation"
                                        value="Mr"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-name"
                                        label="First Name"
                                        value="Dominic"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-name"
                                        label="Middle Name"
                                        value="Anuta"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-name"
                                        label="Last Name"
                                        value="Vega"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-name"
                                        label="Country"
                                        value="Philippines"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        id="standard-name"
                                        label="Address"
                                        value="Clarin, Bohol"
                                        margin="normal"
                                    />
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
                                <Grid item xs={12} sm={3}>
                                    <Button
                                        style={{
                                            marginBottom: "10px",
                                            width: "100%"
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        size="medium"
                                    >
                                        Save & Update
                                    </Button>
                                </Grid>
                            </Grid>
                            <DialogTitle id="form-dialog-title">
                                <h4>My Bookings</h4>
                            </DialogTitle>
                            <Paper className={classes.paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Book Date</TableCell>
                                            <TableCell>
                                                Number of Rooms
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Pending</TableCell>
                                            <TableCell>
                                                12/02/2019 - 12/04/2019
                                            </TableCell>
                                            <TableCell>2</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <DialogTitle id="form-dialog-title">
                                <h4>My Rooms</h4>
                            </DialogTitle>
                            <Paper className={classes.paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Room Number</TableCell>
                                            <TableCell>Room Type</TableCell>
                                            <TableCell>
                                                Number of Children
                                            </TableCell>
                                            <TableCell>
                                                Number of Adults
                                            </TableCell>
                                            <TableCell>
                                                Number of Infants
                                            </TableCell>
                                            <TableCell>Number of Bed</TableCell>

                                            <TableCell>Breakfast</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>RM 210</TableCell>
                                            <TableCell>Native Room</TableCell>
                                            <TableCell>10</TableCell>
                                            <TableCell>3</TableCell>
                                            <TableCell>1</TableCell>
                                            <TableCell>4</TableCell>

                                            <TableCell>Yes</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                            <DialogTitle id="form-dialog-title">
                                <h4>My Accounts</h4>
                            </DialogTitle>
                            <Paper className={classes.paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Payment Date/Added
                                            </TableCell>
                                            <TableCell>
                                                Payment Description
                                            </TableCell>
                                            <TableCell>Payment</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                12/02/2019 - 12/04/2019
                                            </TableCell>
                                            <TableCell>Downpayment</TableCell>
                                            <TableCell>P 2,000.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                12/02/2019 - 12/04/2019
                                            </TableCell>
                                            <TableCell>
                                                Advance Payment
                                            </TableCell>
                                            <TableCell>P 2,000.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Total Due</TableCell>
                                            <TableCell>P 10,000.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Balance</TableCell>
                                            <TableCell>P 6,000.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </DialogContent>

                        <DialogActions>
                            <Button
                                style={{
                                    marginBottom: "10px",
                                    width: "15%"
                                }}
                                variant="contained"
                                color="secondary"
                                size="medium"
                            >
                                Logout
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                <CloseIcon />
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
