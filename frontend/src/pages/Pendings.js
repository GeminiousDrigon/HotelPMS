import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import axios from "axios";
import moment from "moment";
import { Menu, MenuItem } from "@material-ui/core";
import ConfirmDialog from "../Dialog/ConfirmDialog";
import { GET, POST, PUT, DELETE } from "../utils/restUtils";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default class Pendings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      reservations: [],
      anchorEl: null,
      selectedReservation: null,
      checkInStatus: false,
      noShowStatus: false,
      updating: false
    };
  }

  componentDidMount() {
    this.getReservedBookings();
  }

  getReservedBookings = async () => {
    try {
      if (!this.state.fetching) this.setState({ fetching: true });
      let { data } = await GET("/api/booking?status=PENDING");
      data = data.map(reservation => {
        reservation.total = reservation.billings.reduce((total, billing) => {
          return total + billing.amount;
        }, 0);
        reservation.totalPrice = reservation.rooms.reduce((totalPrice, room) => {
          if (room.additional_beds > 0) {
            totalPrice = totalPrice + room.additional_beds * 100 + room.price;
            return totalPrice;
          } else {
            return totalPrice + room.price;
          }
        }, 0);
        return reservation;
      });
      console.log(data);
      this.setState({
        fetching: false,
        reservations: data
      });
    } catch (err) {
      console.log(err);
      this.setState({ fetching: false });
    }
  };

  // onMoreAction = (e, id) => {
  //     this.setState({ anchorEl: e.currentTarget, selectedReservation: id });
  // };

  // onCloseMoreAction = () => this.setState({ anchorEl: null, selectedReservation: null });

  // handleCloseCheckin = () => this.setState({ checkInStatus: false });

  // handleOpenCheckin = () => {
  //     this.setState({ checkInStatus: true, anchorEl: null });
  // };

  // handleCloseNoShow = () => this.setState({ noShowStatus: false });

  // onConfirmCheckin = async () => {
  //     //update the status of reservation
  //     try {
  //         let { selectedReservation } = this.state;
  //         let { booking, room, room_type, ...allReservation } = selectedReservation;
  //         await axios.put(`/api/bookroom/${selectedReservation.id}`, {
  //             ...allReservation,
  //             status: "CHECKEDIN"
  //         });
  //         this.setState({ selectedReservation: null, anchorEl: null, checkInStatus: false });
  //         this.getReservedBookings();
  //     } catch (err) {
  //         console.log(err);
  //     }
  // };

  // onConfirmNoShow = () => {
  //     //update the status of reservation
  // };

  viewReservation = id => {
    console.log(id);
    let hostname = window.location.hostname;
    let port = window.location.port;
    window.open(`http://${hostname}:${port}/bookings/view/${id}`);
  };

  render() {
    const { anchorEl, checkInStatus, noShowStatus, updating } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: 25
          }}
        >
          <Paper style={{ backgroundColor: "white", padding: 20 }}>
            {updating && <LinearProgress />}
            <Typography variant="h5">Pending(s)</Typography>
            {this.state.fetching ? (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "50px 0"
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Reserve Date</TableCell>
                      {/* <TableCell align="left">
                                                Date
                                            </TableCell> */}
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="right">Contact No</TableCell>
                      <TableCell align="right">Number of Rooms</TableCell>
                      <TableCell align="right">Total Price</TableCell>
                      <TableCell align="right">Amount Paid</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.reservations.map((reservation, i, array) => {
                      const { user, rooms, id } = reservation;
                      return (
                        <TableRow key={reservation.id}>
                          <TableCell align="left">
                            {moment(reservation.from_date).format("MM/DD/YYYY") +
                              " - " +
                              moment(reservation.to_date).format("MM/DD/YYYY")}
                          </TableCell>
                          {/* <TableCell align="left">
                                                            {moment(
                                                                reservation.created_at
                                                            ).format(
                                                                "MM/DD/YYYY hh:mm A"
                                                            )}
                                                        </TableCell> */}
                          <TableCell align="left">{`${user.honorific}. ${user.firstname} ${user.middlename[0]}. ${user.lastname}`}</TableCell>
                          <TableCell align="left">{user.email}</TableCell>
                          <TableCell align="right">{user.contactno}</TableCell>
                          <TableCell align="right">{rooms.length}</TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: "blue"
                            }}
                          >
                            P{reservation.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: "blue"
                            }}
                          >
                            P{reservation.total.toFixed(2)}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              // onClick={e => this.onMoreAction(e, reservation)}
                              onClick={e => this.viewReservation(id)}
                              size="small"
                            >
                              <OpenInNewIcon
                                style={{
                                  fontSize: "1.25em"
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {/* <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={this.onCloseMoreAction}>
                                    <MenuItem onClick={this.handleOpenCheckin}>Check-in</MenuItem>
                                    <MenuItem>Mark as no-show</MenuItem>
                                </Menu> */}
              </>
            )}
          </Paper>
        </div>
        {/* <ConfirmDialog
                    title="Are you sure?"
                    content="Are you sure you want to check in this reservation?"
                    open={checkInStatus}
                    onConfirm={this.onConfirmCheckin}
                    handleClose={this.handleCloseCheckin}
                />
                <ConfirmDialog
                    title="Are you sure?"
                    content="Are you sure you want to mark this reservation as no-show?"
                    open={noShowStatus}
                    onConfirm={this.onConfirmNoShow}
                    handleClose={this.handleCloseNoShow}
                /> */}
      </>
    );
  }
}

//checkin
//noshow
