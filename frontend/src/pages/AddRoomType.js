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

export default class AddRoomType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            room_size: 0,
            room_size_unit: "",
            max_guest: 0,
            bed_no: 0,
            bed_type: "",

            roomSizeUnitLabelWidth: 0,
            bedTypeLabelWidth: 0
        };
    }

    componentDidMount() {
        this.setState({
            roomSizeUnitLabelWidth: this.roomSizeUnitInput.offsetWidth,
            bedTypeLabelWidth: this.bedTypeInput.offsetWidth
        });
        if (this.props.match.params.id) {
            this.getRoomType();
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeSelect = (e, name) => {
        this.setState({ [name]: e.target.value });
    };

    onAddRoomType = async e => {
        try {
            let {
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                max_guest,
                bed_type
            } = this.state;
            let roomType = {
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                max_guest,
                bed_type
            };
            if (this.props.match.params.id) {
                let { id } = this.props.match.params;
                await axios.put(`/api/roomtype/${id}`, {
                    ...roomType
                });
                this.props.history.push("/property/roomtype");
            } else {
                await axios.post("/api/roomtype", {
                    ...roomType
                });
                this.props.history.push("/property/roomtype");
            }
        } catch (err) {
            console.log(err);
        }
    };

    getRoomType = async () => {
        try {
            let { id } = this.props.match.params;
            let { data } = await axios.get(`/api/roomtype/${id}`);
            let {
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                max_guest,
                bed_type
            } = data;
            this.setState({
                name,
                description,
                room_size,
                room_size_unit,
                bed_no,
                max_guest,
                bed_type
            });
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
            max_guest,
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
                                    value={name}
                                    id="name"
                                    label="Name"
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
                                    value={room_size}
                                    id="room_size"
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
                                        value={room_size_unit}
                                        input={
                                            <OutlinedInput
                                                id="room_size_unit"
                                                onChange={e =>
                                                    this.onChangeSelect(
                                                        e,
                                                        "room_size_unit"
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
                                    value={bed_no}
                                    id="bed_no"
                                    label="Number of Beds"
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
                                        ref={el => (this.bedTypeInput = el)}
                                    >
                                        Bed Type
                                    </InputLabel>
                                    <Select
                                        value={bed_type}
                                        input={
                                            <OutlinedInput
                                                id="room_size_unit"
                                                onChange={e =>
                                                    this.onChangeSelect(
                                                        e,
                                                        "bed_type"
                                                    )
                                                }
                                                labelWidth={
                                                    this.state.bedTypeLabelWidth
                                                }
                                            />
                                        }
                                        SelectDisplayProps={{
                                            style: { display: "flex" }
                                        }}
                                    >
                                        <MenuItem value={"SINGLE"}>
                                            Single
                                        </MenuItem>
                                        <MenuItem value={"DOUBLE"}>
                                            Double
                                        </MenuItem>
                                        <MenuItem value={"QUEEN"}>
                                            Queen
                                        </MenuItem>
                                        <MenuItem value={"KING"}>King</MenuItem>
                                        <MenuItem value={"DOUBLE_DECK"}>
                                            Double-deck
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    value={max_guest}
                                    id="maxGuest"
                                    label="Max Guest"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    type="number"
                                    fullWidth
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
                                onClick={this.onAddRoomType}
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
