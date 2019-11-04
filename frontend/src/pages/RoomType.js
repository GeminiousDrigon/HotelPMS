import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "axios";
import { GET, DELETE } from "../utils/restUtils";

export default class RoomType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
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
        this.getAllRoomType();
    }

    getAllRoomType = async () => {
        try {
            let { data } = await GET("/api/roomtype");
            this.setState({
                rooms: data
            });
        } catch (err) {
            console.log(err);
        }
    };

    deleteRoom = async () => {
        try {
            let id = this.state.selectedRoom;
            await DELETE(`/api/roomtype/${id}`);
            this.handleClose();
            this.getAllRooms();
        } catch (err) {
            console.log(err);
        }
    };

    viewRoom = () =>
        this.props.history.push(`/roomtype/${this.state.selectedRoom}/view`);

    editRoom = () =>
        this.props.history.push(`/roomtype/${this.state.selectedRoom}/edit`);

    addRoom = () => this.props.history.push("/roomtype/add");

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
                            <Typography variant="h5">Room Type(s)</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addRoom}
                            >
                                Add <Icon style={{ marginLeft: 5 }}>add</Icon>
                            </Button>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">
                                        room_size
                                    </TableCell>
                                    <TableCell align="left">bed_no</TableCell>
                                    <TableCell align="left">bed_type</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rooms.map((room, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="left">
                                                {room.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {`${room.room_size +
                                                    room.room_size_unit}`}
                                                <sup>2</sup>
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.bed_no}
                                            </TableCell>
                                            <TableCell align="left">
                                                {room.bed_type}
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
                                                    <MoreVertIcon size="inherit" />
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
                            <MenuItem onClick={this.viewRoom}>View</MenuItem>
                            <MenuItem onClick={this.editRoom}>Edit</MenuItem>
                            <MenuItem onClick={this.deleteRoom}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </Paper>
                </div>
            </>
        );
    }
}
