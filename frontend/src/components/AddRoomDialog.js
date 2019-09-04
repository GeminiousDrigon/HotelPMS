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

import axios from "axios";

export default class AddRoomDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_type: "",
            quantity: 0,
            roomTypes: [],
            room_number: "",
            submitting: false,
            roomTypeLabelWidth: 0
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
            this.setState({
                room_type: data.room_type_id,
                room_number: data.room_number
            });
            console.log(data);
        }
    };

    onChangeSelect = e => this.setState({ room_type: e.target.value });

    onChange = e => this.setState({ [e.target.id]: e.target.value });

    onSubmit = () => {
        this.setState({ submitting: true }, async () => {
            try {
                if (this.props.edit) {
                    await axios.put(`/api/room/${this.props.id}`, {
                        room_number: this.state.room_number,
                        room_type_id: this.state.room_type
                    });
                } else {
                    await axios.post("/api/room", {
                        room_type_id: this.state.room_type,
                        quantity: this.state.quantity
                    });
                }
                this.props.handleClose(true);
            } catch (err) {
                console.log(err);
            }
        });
    };

    handleClose = () => this.props.handleClose(false);

    onExit = () =>
        this.setState({
            room_type: "",
            quantity: 0,
            roomTypes: [],
            room_number: "",
            submitting: false,
            roomTypeLabelWidth: 0
        });

    render() {
        let { open } = this.props;
        let { room_type, quantity, roomTypes, room_number } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                onEntered={this.onEntered}
                onExit={this.onExit}
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    {this.props.edit && (
                        <TextField
                            id="room_number"
                            label="Room Number"
                            variant="outlined"
                            onChange={this.onChange}
                            value={room_number}
                            fullWidth
                        />
                    )}
                    <FormControl
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        style={{ marginBottom: 20 }}
                    >
                        <InputLabel
                            htmlFor="outlined-age-native-simple"
                            ref={el => (this.roomTypeInput = el)}
                        >
                            Room Type
                        </InputLabel>
                        <Select
                            value={room_type}
                            input={
                                <OutlinedInput
                                    onChange={e =>
                                        this.onChangeSelect(e, "bed_type")
                                    }
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
                    </FormControl>
                    {!this.props.edit && (
                        <TextField
                            id="quantity"
                            label="Quantity"
                            type="number"
                            variant="outlined"
                            onChange={this.onChange}
                            value={quantity}
                            fullWidth
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.onSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
