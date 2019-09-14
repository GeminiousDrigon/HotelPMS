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

import * as yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import { Typography } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

class AddRoomType extends Component {
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
            await this.props.validateForm();
            if (this.props.isValid) {
                this.setState({ submitting: true }, async () => {
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
                });
            } else {
                console.log("not valid");
            }
        } catch (error) {
            console.log(error);
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
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
        } = this.props;
        let {
            name,
            description,
            room_size,
            room_size_unit,
            bed_no,
            bed_type,
            max_guest
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
                        <Typography variant="h5">Add Room Type</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    value={name}
                                    id="name"
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    helperText={errors.name ? errors.name : ""}
                                    error={errors.name}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    helperText={
                                        errors.description
                                            ? errors.description
                                            : ""
                                    }
                                    error={errors.description}
                                    multiline
                                    rows={5}
                                    rowsMax={5}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="room_size"
                                    label="Room Size"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.room_size}
                                    helperText={
                                        errors.room_size ? errors.room_size : ""
                                    }
                                    error={errors.room_size}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    error={errors.room_size_unit}
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
                                        value={values.room_size_unit}
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
                                    <FormHelperText>
                                        {errors.room_size_unit
                                            ? errors.room_size_unit
                                            : ""}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="bed_no"
                                    label="Number of Beds"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.bed_no}
                                    helperText={
                                        errors.bed_no ? errors.bed_no : ""
                                    }
                                    error={errors.bed_no}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    error={errors.bed_type}
                                    fullWidth
                                >
                                    <InputLabel
                                        htmlFor="outlined-age-native-simple"
                                        ref={el => (this.bedTypeInput = el)}
                                    >
                                        Bed Type
                                    </InputLabel>
                                    <Select
                                        value={values.bed_type}
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
                                    <FormHelperText>
                                        {errors.bed_type ? errors.bed_type : ""}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="max_guest"
                                    label="Max Guest"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.max_guest}
                                    helperText={
                                        errors.max_guest ? errors.max_guest : ""
                                    }
                                    error={errors.max_guest}
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

const WithFormik = withFormik({
    mapPropsToValues: props => {
        console.log(props);
        return {
            name: "",
            description: "",
            room_size: "",
            room_size_unit: "",
            bed_no: "",
            max_guest: "",
            bed_type: ""
        };
    },
    validationSchema: function() {
        let schema = yup.object().shape({
            name: yup.string("Name").required("Name is required!"),
            description: yup
                .string("Description")
                .required("Description is required!"),
            room_size: yup.string("").required("Room size is required!"),
            room_size_unit: yup
                .string("")
                .required("Room size unit is required!"),
            bed_no: yup.string("").required("Number of bed is required!"),
            max_guest: yup.string("").required("Max guest is required!"),
            bed_type: yup.string("").required("Type of bed is required!")
        });
        return schema;
    }
})(AddRoomType);

export default WithFormik;
