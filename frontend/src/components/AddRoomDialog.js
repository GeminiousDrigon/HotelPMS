import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
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
import { FormHelperText } from "@material-ui/core";

class AddRoomDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomTypes: [],
            submitting: false,
            roomTypeLabelWidth: 0,
            validateCalled: false,
            snackbar: false,
            snackBarMessage: ""
        };
    }

    onEntered = async () => {
        this.setState({
            roomTypeLabelWidth: this.roomTypeInput.offsetWidth
        });
        let { data } = await axios.get(`/api/roomtype`);
        console.log(data);
        this.setState({ roomTypes: data });
        if (this.props.edit) {
            let { data } = await axios.get(`/api/room/${this.props.id}`);
            this.props.setFieldValue("room_type", data.room_type_id);
            this.props.setFieldValue(
                "room_number",
                data.room_number === null ? "" : data.room_number
            );
            this.props.setFieldValue("edit", this.props.edit);
            console.log(data);
        }
    };

    onChangeSelect = e => {
        this.props.setTouched({
            room_type: true
        });
        this.props.setFieldValue("room_type", e.target.value);
    };

    onChange = e => this.setState({ [e.target.id]: e.target.value });

    openSnackBar = snackBarMessage => {
        this.setState({ snackbar: true, snackBarMessage });
    };

    handleCloseSnackBar = () => this.setState({ snackbar: false });

    onSubmit = async () => {
        try {
            await this.props.validateForm();
            if (this.props.isValid) {
                this.setState({ submitting: true }, async () => {
                    try {
                        let { values } = this.props;
                        if (this.props.edit) {
                            await axios.put(`/api/room/${this.props.id}`, {
                                room_number: values.room_number,
                                room_type_id: values.room_type
                            });
                        } else {
                            await axios.post("/api/room", {
                                room_type_id: values.room_type,
                                quantity: values.quantity
                            });
                            // this.openSnackBar(
                            //     <span
                            //         style={{
                            //             display: "flex",
                            //             alignItems: "center"
                            //         }}
                            //     >
                            //         <InfoIcon style={{ marginRight: "5" }} />
                            //         {` Successfully Added Guest! `}
                            //     </span>
                            // );
                        }
                        this.props.handleClose(true);
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

    handleClose = () => this.props.handleClose(false);

    onExit = () => {
        this.setState({
            room_type: "",
            quantity: 0,
            roomTypes: [],
            room_number: "",
            submitting: false,
            roomTypeLabelWidth: 0
        });

        this.props.resetForm();
    };

    render() {
        let { open } = this.props;
        let { room_type, quantity, roomTypes, room_number } = this.state;
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
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                onEntered={this.onEntered}
                onExit={this.onExit}
            >
                <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                    Add Room
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add room this dialog, please choose your room type
                        and enter your number of rooms.
                    </DialogContentText>
                    {this.props.edit && (
                        <TextField
                            id="room_number"
                            label="Room Number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.room_number}
                            helperText={
                                errors.room_number ? errors.room_number : ""
                            }
                            error={errors.room_number}
                            fullWidth
                        />
                    )}
                    <FormControl
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        style={{ marginBottom: 20 }}
                        error={errors.room_type}
                    >
                        <InputLabel
                            htmlFor="outlined-age-native-simple"
                            ref={el => (this.roomTypeInput = el)}
                        >
                            Room Type
                        </InputLabel>
                        <Select
                            value={values.room_type}
                            input={
                                <OutlinedInput
                                    onChange={this.onChangeSelect}
                                    labelWidth={this.state.roomTypeLabelWidth}
                                />
                            }
                            SelectDisplayProps={{
                                style: { display: "flex" }
                            }}
                        >
                            {roomTypes.map((el, i) => {
                                return (
                                    <MenuItem value={el.id} key={el.id}>
                                        {el.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <FormHelperText>
                            {errors.room_type ? errors.room_type : ""}
                        </FormHelperText>
                    </FormControl>
                    {!this.props.edit && (
                        <TextField
                            id="quantity"
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.quantity}
                            onBlur={handleBlur}
                            helperText={errors.quantity ? errors.quantity : ""}
                            error={errors.quantity}
                            fullWidth
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </DialogActions>
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
            </Dialog>
        );
    }
}

const WithFormik = withFormik({
    mapPropsToValues: props => {
        console.log(props);
        return {
            edit: props.edit,
            room_type: "",
            quantity: 0,
            room_number: ""
        };
    },

    validationSchema: function() {
        let schema = yup.object().shape({
            room_type: yup
                .string("Firstname ")
                .required("Room type is required!"),
            quantity: yup.number().when("edit", {
                is: true,
                otherwise: yup
                    .number()
                    .min(1, "Quantity must be equal or greater than 1!")
                    .required("Quantity is required!"),
                then: yup.number().notRequired()
            }),
            room_number: yup.string().when("edit", {
                is: true,
                then: yup.string().required("Room number is required!"),
                otherwise: yup.string().notRequired()
            })
        });
        return schema;
    }
})(AddRoomDialog);

export default WithFormik;
