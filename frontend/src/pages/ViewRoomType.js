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
            maxGuest: 0,
            maxAddGuest: 0,
            privateBath: false,
            freeParking: false,
            nonRefundable: false,
            facilities: [],
            rates: [],
            addFacilitiesDialog: false,
            rateDialog: true
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
                rates
            } = data;
            this.setState({
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                bed_type,
                facilities: amenities,
                rates
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

    render() {
        let {
            name,
            description,
            room_size,
            room_size_unit,
            bed_no,
            bed_type,
            facilities
        } = this.state;
        return (
            <AdminLayout {...this.props}>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
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
                        </Grid>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                    margin: "15px 0"
                                }}
                            >
                                <Typography variant="h4">Facilities</Typography>
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
                            <div>
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
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                    margin: "3px 10px 3px 0px"
                                                }}
                                            >
                                                <Icon color="primary">
                                                    {el.icon}
                                                </Icon>
                                                <Typography
                                                    variant="h6"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    {el.name}
                                                </Typography>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "center",
                                    margin: "15px 0"
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
                            <div>
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
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignContent: "center",
                                                    alignItems: "center",
                                                    margin: "3px 10px 3px 0px"
                                                }}
                                            >
                                                <Icon color="primary">
                                                    {el.icon}
                                                </Icon>
                                                <Typography
                                                    variant="h6"
                                                    style={{ marginLeft: 10 }}
                                                >
                                                    {el.name}
                                                </Typography>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onAddRoom}
                            >
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <SaveIcon style={{ marginRight: "10px" }} />
                                Save
                            </Button>
                        </div>
                    </Paper>
                </div>
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
                    getFacilities={this.getRates}
                />
            </AdminLayout>
        );
    }
}
