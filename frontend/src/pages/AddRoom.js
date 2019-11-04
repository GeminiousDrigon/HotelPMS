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

import axios from "axios";
import { GET, PUT, POST, DELETE } from '../utils/restUtils'

export default class AddRoom extends Component {
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

            roomSizeUnitLabelWidth: 0
        };
    }

    componentDidMount() {
        this.setState({
            roomSizeUnitLabelWidth: this.roomSizeUnitInput.offsetWidth
        });
        if (this.props.match.params.id) {
            this.getRoom();
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeSelect = (e, name) => {
        this.setState({ [name]: e.target.value });
    };

    onChangeCheckBox = e => {
        let value = !this.state[e.target.id];
        this.setState({ [e.target.id]: value });
    };

    onAddRoom = async e => {
        try {
            if (this.props.match.params.id) {
                let { id } = this.props.match.params;
                let {
                    type,
                    description,
                    roomSize,
                    roomUnit,
                    quantity,
                    price,
                    maxGuest,
                    maxAddGuest,
                    privateBath,
                    freeParking,
                    nonRefundable
                } = this.state;
                await PUT(`/api/room/${id}`, {
                    private_bath: privateBath,
                    free_parking: freeParking,
                    room_size: roomSize,
                    room_size_unit: roomUnit,
                    description: description,
                    price: price,
                    non_refundable: nonRefundable,
                    quantity: quantity,
                    type: type,
                    max_guest: maxGuest,
                    max_add_guest: maxAddGuest
                });
                this.props.history.push("/room");
            } else {
                let {
                    type,
                    description,
                    roomSize,
                    roomUnit,
                    quantity,
                    price,
                    maxGuest,
                    maxAddGuest,
                    privateBath,
                    freeParking,
                    nonRefundable
                } = this.state;
                let room = await POST("/api/room", {
                    private_bath: privateBath,
                    free_parking: freeParking,
                    room_size: roomSize,
                    room_size_unit: roomUnit,
                    description: description,
                    price: price,
                    non_refundable: nonRefundable,
                    quantity: quantity,
                    type: type,
                    max_guest: maxGuest,
                    max_add_guest: maxAddGuest
                });
                this.props.history.push("/room");
            }
        } catch (err) {
            console.log(err);
        }
    };

    getRoom = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await GET(`/api/room/${id}`);
            let {
                private_bath,
                free_parking,
                room_size,
                room_size_unit,
                description,
                price,
                non_refundable,
                quantity,
                type,
                max_guest,
                max_add_guest
            } = data;
            this.setState({
                type,
                description,
                roomSize: room_size,
                roomUnit: room_size_unit,
                quantity,
                price,
                maxGuest: max_guest,
                maxAddGuest: max_add_guest,
                privateBath: private_bath,
                freeParking: free_parking,
                nonRefundable: non_refundable
            });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        let {
            type,
            description,
            roomSize,
            roomUnit,
            quantity,
            price,
            maxGuest,
            maxAddGuest,
            privateBath,
            freeParking,
            nonRefundable
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
                            padding: 20
                        }}
                    >
                        <h1>Add Room</h1>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    value={type}
                                    id="type"
                                    label="Type"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={description}
                                    id="description"
                                    label="Description"
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                    rowsMax={5}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={roomSize}
                                    id="roomSize"
                                    label="Room Size"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="outlined-age-native-simple"
                                        ref={el =>
                                            (this.roomSizeUnitInput = el)
                                        }
                                    >
                                        Room Size Unit
                                    </InputLabel>
                                    <Select
                                        value={roomUnit}
                                        input={
                                            <OutlinedInput
                                                id="roomUnit"
                                                onChange={e =>
                                                    this.onChangeSelect(
                                                        e,
                                                        "roomUnit"
                                                    )
                                                }
                                                labelWidth={
                                                    this.state
                                                        .roomSizeUnitLabelWidth
                                                }
                                            />
                                        }
                                        SelectDisplayProps={{
                                            style: { display: "flex" }
                                        }}
                                    >
                                        <MenuItem value={"m"}>Meter</MenuItem>
                                        <MenuItem value={"cm"}>
                                            Centimeter
                                        </MenuItem>
                                        <MenuItem value={"mm"}>
                                            Millimeter
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={quantity}
                                    id="quantity"
                                    label="Quantity"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={price}
                                    id="price"
                                    label="Price"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={maxGuest}
                                    id="maxGuest"
                                    label="Max Guest"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={maxAddGuest}
                                    id="maxAddGuest"
                                    label="Max Additional Guest"
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={privateBath}
                                            onChange={this.onChangeCheckBox}
                                            id="privateBath"
                                        />
                                    }
                                    label="Private Bath"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={freeParking}
                                            onChange={this.onChangeCheckBox}
                                            id="freeParking"
                                            color="primary"
                                        />
                                    }
                                    label="Free parking"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={nonRefundable}
                                            color="primary"
                                            id="nonRefundable"
                                            onChange={this.onChangeCheckBox}
                                        />
                                    }
                                    label="Non-refundable"
                                />
                            </Grid>
                        </Grid>
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
            </AdminLayout>
        );
    }
}
