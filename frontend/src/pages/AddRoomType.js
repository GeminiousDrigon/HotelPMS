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
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import InfoIcon from "@material-ui/icons/Info";

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
            validateCalled: false,
            snackbar: false,
            snackBarMessage: "",

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
        this.props.setFieldValue(name, e.target.value);
        this.props.setFieldTouched(name, true);
        // this.setState({ [name]: e.target.value });
    };
    openSnackBar = snackBarMessage => {
        this.setState({ snackbar: true, snackBarMessage });
    };

    handleCloseSnackBar = () => this.setState({ snackbar: false });

    onAddRoomType = async e => {
        try {
            this.setState({ validateCalled: true });
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
                        } = this.props.values;
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
                            this.openSnackBar(
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <InfoIcon style={{ marginRight: "5" }} />
                                    {` Successfully Added Guest! `}
                                </span>
                            );
                        } else {
                            await axios.post("/api/roomtype", {
                                ...roomType
                            });
                            this.props.history.push("/property/roomtype");
                            this.openSnackBar(
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <InfoIcon style={{ marginRight: "5" }} />
                                    {` Successfully Added Guest! `}
                                </span>
                            );
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
            this.props.setFieldValue("name", name);
            this.props.setFieldValue("description", description);
            this.props.setFieldValue("room_size", room_size);
            this.props.setFieldValue("room_size_unit", room_size_unit);
            this.props.setFieldValue("bed_no", bed_no);
            this.props.setFieldValue("max_guest", max_guest);
            this.props.setFieldValue("bed_type", bed_type);
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
        let { validateCalled } = this.state;
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
                                    value={values.name}
                                    id="name"
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    helperText={
                                        (validateCalled || touched.name) &&
                                        errors.name
                                            ? errors.name
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.name) &&
                                        errors.name
                                    }
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
                                        (validateCalled ||
                                            touched.description) &&
                                        errors.description
                                            ? errors.description
                                            : ""
                                    }
                                    error={
                                        (validateCalled ||
                                            touched.description) &&
                                        errors.description
                                    }
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
                                        (validateCalled || touched.room_size) &&
                                        errors.room_size
                                            ? errors.room_size
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.room_size) &&
                                        errors.room_size
                                    }
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    error={
                                        (validateCalled ||
                                            touched.room_size_unit) &&
                                        errors.room_size_unit
                                    }
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
                                        {(validateCalled ||
                                            touched.room_size_unit) &&
                                        errors.room_size_unit
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
                                        (validateCalled || touched.bed_no) &&
                                        errors.bed_no
                                            ? errors.bed_no
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.bed_no) &&
                                        errors.bed_no
                                    }
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    error={
                                        (validateCalled || touched.bed_type) &&
                                        errors.bed_type
                                    }
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
                                        {(validateCalled || touched.bed_type) &&
                                        errors.bed_type
                                            ? errors.bed_type
                                            : ""}
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
                                        (validateCalled || touched.max_guest) &&
                                        errors.max_guest
                                            ? errors.max_guest
                                            : ""
                                    }
                                    error={
                                        (validateCalled || touched.max_guest) &&
                                        errors.max_guest
                                    }
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
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={5000}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.handleCloseSnackBar}
                    message={
                        <span
                            id="message-id"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyItems: "center"
                            }}
                        >
                            {this.state.snackBarMessage}
                        </span>
                    }
                    ClickAwayListenerProps={{ onClickAway: () => null }}
                    TransitionComponent={Slide}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            onClick={this.handleCloseSnackBar}
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    ]}
                />
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
