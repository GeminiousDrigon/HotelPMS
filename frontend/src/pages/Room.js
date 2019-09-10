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
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "axios";
import { Typography } from "@material-ui/core";
import AddRoomDialog from "../components/AddRoomDialog";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            addDialog: false,
            editRoom: false,
            roomId: null,

            anchorEl: null,
            selectedRoom: null
        };
    }

    handleClick = (e, id) => {
        this.setState({ anchorEl: e.currentTarget, selectedRoom: id });
    };

    handleClose = e => {
        this.setState({ anchorEl: null, selectedRoom: null });
    };

    componentDidMount() {
        this.getAllRooms();
    }

    getAllRooms = async () => {
        try {
            let { data } = await axios.get("/api/room");
            this.setState({
                rooms: data
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    deleteRoom = async () => {
        try {
            let id = this.state.selectedRoom;
            await axios.delete(`/api/room/${id}`);
            this.handleClose();
            this.getAllRooms();
        } catch (err) {
            console.log(err);
        }
    };

    viewRoom = () =>
        this.props.history.push(`/room/${this.state.selectedRoom}/view`);

    editRoom = () => {
        this.setState(
            {
                addDialog: true,
                roomId: this.state.selectedRoom,
                editRoom: true
            },
            this.handleClose
        );
    };

    handleRoomDialog = value => {
        if (value) this.getAllRooms();
        this.setState({
            addDialog: !this.state.addDialog,
            editRoom: false,
            roomId: null
        });
    };

    render() {
        let { anchorEl } = this.state;
        let open = Boolean(anchorEl);
        return (
            <>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Paper style={{ backgroundColor: "white", padding: 20 }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="h4">Room(s)</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handleRoomDialog(true)}
                            >
                                Add <Icon style={{ marginLeft: 5 }}>add</Icon>
                            </Button>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        Room Number
                                    </TableCell>
                                    <TableCell align="left">
                                        Room Size
                                    </TableCell>
                                    <TableCell align="left">
                                        Room type
                                    </TableCell>
                                    <TableCell align="left">Bed Type</TableCell>
                                    <TableCell align="left">
                                        Number of Beds
                                    </TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rooms.map((room, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="left">
                                                {!room.room_number
                                                    ? "Unassigned"
                                                    : room.room_number}
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.room_type.room_size +
                                                    " " +
                                                    room.room_type
                                                        .room_size_unit}
                                                <sup>2</sup>
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.room_type.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.room_type.bed_type}
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.room_type.bed_no}
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={e =>
                                                        this.handleClick(
                                                            e,
                                                            room.id
                                                        )
                                                    }
                                                    size="small"
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.editRoom}>Edit</MenuItem>
                            <MenuItem onClick={this.deleteRoom}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </Paper>
                </div>
                <AddRoomDialog
                    open={this.state.addDialog}
                    handleClose={this.handleRoomDialog}
                    edit={this.state.editRoom}
                    id={this.state.roomId}
                />
            </>
        );
    }
}
