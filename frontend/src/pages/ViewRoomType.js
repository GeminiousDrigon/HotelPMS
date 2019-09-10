import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";


import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "axios";
import AddFacilitiesDialog from "../components/AddFacilitiesDialog";
import AddRatesDialog from "../components/AddRatesDialog";

export default class ViewRoomType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            description: "",
            roomSize: 0,
            roomUnit: "",
            quantity: 0,
            price: 0,
            max_guest: 0,
            maxAddGuest: 0,
            facilities: [],
            rates: [],
            rooms: [],
            addFacilitiesDialog: false,
            rateDialog: false,
            editRate: false,
            rateId: null,
            anchorEl: null
        };
    }

    componentDidMount() {
        this.getRoom();
    }

    getRoom = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/roomtype/${id}`);
            let {
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                bed_type,
                amenities,
                max_guest,
                rates,
                rooms
            } = data;
            this.setState({
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                bed_type,
                max_guest,
                facilities: amenities,
                rates,
                rooms
            });
        } catch (err) {
            console.log(err);
        }
    };

    addFacility = () => {
        this.setState({ addFacilitiesDialog: !this.state.addFacilitiesDialog });
    };

    addRate = () => this.setState({ rateDialog: !this.state.rateDialog });

    getFacilities = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/roomtype/${id}/amenity`);
            this.setState({ facilities: data });
        } catch (err) {
            console.log(err);
        }
    };

    getRates = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/roomtype/${id}/rate`);
            this.setState({ rates: data });
        } catch (err) {
            console.log(err);
        }
    };

    handleClickRate = (e, id) => {
        this.setState({ anchorEl: e.currentTarget, rateId: id });
    };

    handleCloseRate = () => {
        this.setState({ anchorEl: null, selectedRoom: null });
    };

    getAllRates = async () => {
        try {
            let { data } = await axios.get(
                `/api/roomtype/${this.props.match.params.id}/rate`
            );
            console.log(data);
            this.setState({ rates: data });
        } catch (err) {
            console.log(err);
        }
    };

    deleteRate = async () => {
        try {
            let id = this.state.rateId;
            await axios.delete(`/api/rate/${id}`);
            this.handleCloseRate();
            this.getAllRates();
        } catch (err) {
            console.log(err);
        }
    };

    editRate = () => this.setState({ rateDialog: true, editRate: true, anchorEl: null });

    render() {
        let {
            name,
            description,
            room_size,
            room_size_unit,
            bed_no,
            bed_type,
            max_guest,
            facilities,
            rates,
            anchorEl
        } = this.state;
        let open = Boolean(anchorEl);
        return (
            <AdminLayout {...this.props}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                wordBreak: "break-word"
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Room Type Details
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            Name
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        >
                                            {name}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            Description
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                            component="p"
                                        >
                                            {description}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            Room Size
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        >
                                            {room_size + room_size_unit}
                                            <sup>2</sup>
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>
                                        <Typography variant="h5" gutterBottom>
                                            Number of Beds
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            style={{ paddingLeft: 10 }}
                                        >
                                            {bed_no}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" gutterBottom>
                                        Bed Type
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        style={{ paddingLeft: 10 }}
                                    >
                                        {bed_type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" gutterBottom>
                                        Max Guest
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        style={{ paddingLeft: 10 }}
                                    >
                                        {max_guest}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Paper
                            style={{
                                padding: "20px 0 0 0"
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        alignContent: "center",
                                        margin: "15px 0",
                                        padding: "0 20px"
                                    }}
                                >
                                    <Typography variant="h4">
                                        Facilities
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ marginLeft: 10 }}
                                        onClick={this.addFacility}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <Divider />
                                <div
                                    style={{
                                        padding: "20px",
                                        minHeight: 265,
                                        maxHeight: 265,
                                        overflow: "auto"
                                    }}
                                >
                                    {/* <div
                                    style={{
                                        margin: "50px 0",
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        No facilities Added
                                    </Typography>
                                </div> */}
                                    <div
                                        style={{
                                            padding: "20px 0",
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        {facilities.map((el, i) => {
                                            return (
                                                <div
                                                    key={el.id}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignContent: "center",
                                                        alignItems: "center",
                                                        margin:
                                                            "3px 10px 3px 0px"
                                                    }}
                                                >
                                                    <Icon color="primary">
                                                        {el.icon}
                                                    </Icon>
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            marginLeft: 10
                                                        }}
                                                    >
                                                        {el.name}
                                                    </Typography>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Paper
                            style={{
                                padding: "20px 0 0 0"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                    margin: "15px 0",
                                    padding: "0 20px"
                                }}
                            >
                                <Typography variant="h4">Rates</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginLeft: 10 }}
                                    onClick={this.addRate}
                                >
                                    Add
                                </Button>
                            </div>
                            <Divider />
                            <div
                                style={{
                                    minHeight: 265,
                                    maxHeight: 265,
                                    overflow: "auto"
                                }}
                            >
                                {/* <div
                                    style={{
                                        margin: "50px 0",
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        No facilities Added
                                    </Typography>
                                </div> */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell align="right">
                                                Sleep
                                            </TableCell>
                                            <TableCell align="center">
                                                With breakfast
                                            </TableCell>
                                            <TableCell align="right">
                                                Price
                                            </TableCell>
                                            <TableCell align="right">
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rates.map(rate => (
                                            <TableRow key={rate.id}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {rate.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {rate.sleep}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {rate.breakfast
                                                        ? "Yes"
                                                        : "No"}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {rate.price}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        onClick={e =>
                                                            this.handleClickRate(
                                                                e,
                                                                rate.id
                                                            )
                                                        }
                                                        size="small"
                                                    >
                                                        <Icon fontSize="inherit">
                                                            more_vert
                                                        </Icon>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            style={{
                                padding: "20px 0 0 0"
                            }}
                        >
                            <div
                                style={{
                                    margin: "15px 0",
                                    padding: "0 20px"
                                }}
                            >
                                <Typography variant="h4">Rooms</Typography>
                            </div>
                            <Divider />
                            <div
                                style={{
                                    minHeight: 425,
                                    maxHeight: 425,
                                    overflow: "auto"
                                }}
                            >
                                {/* <div
                                    style={{
                                        margin: "50px 0",
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        No facilities Added
                                    </Typography>
                                </div> */}
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
                                            <TableCell align="left">
                                                Bed Type
                                            </TableCell>
                                            <TableCell align="left">
                                                Number of Beds
                                            </TableCell>
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
                                                        {room.room_type
                                                            .room_size +
                                                            " " +
                                                            room.room_type
                                                                .room_size_unit}
                                                        <sup>2</sup>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {room.room_type.name}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {
                                                            room.room_type
                                                                .bed_type
                                                        }
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {room.room_type.bed_no}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleCloseRate}
                >
                    <MenuItem onClick={this.editRate}>Edit</MenuItem>
                    <MenuItem onClick={this.deleteRate}>Delete</MenuItem>
                </Menu>
                <AddFacilitiesDialog
                    open={this.state.addFacilitiesDialog}
                    handleClose={this.addFacility}
                    id={this.props.match.params.id}
                    getFacilities={this.getFacilities}
                />
                <AddRatesDialog
                    open={this.state.rateDialog}
                    handleClose={this.addRate}
                    id={this.props.match.params.id}
                    getRates={this.getRates}
                    maxGuest={max_guest}
                    edit={this.state.editRate}
                    rateId={this.state.rateId}
                />
            </AdminLayout>
        );
    }
}
