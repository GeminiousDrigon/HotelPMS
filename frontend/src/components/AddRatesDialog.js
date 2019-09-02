import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

//icons
import PersonIcon from "@material-ui/icons/Person";

import axios from "axios";
import makeStyles from "@material-ui/styles/makeStyles";

export default class AddRatesDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            facilities: [],
            selected: []
        };
    }

    onClose = get => {
        this.setState({ fetching: true });
        this.props.handleClose();
        if (get) this.props.getFacilities();
    };

    onEntered = async () => {
        console.log("entered!");
        let [facilities, roomFacilities] = await Promise.all([
            axios.get("/api/amenity"),
            axios.get(`/api/room/${this.props.id}/amenity`)
        ]);
        console.log(facilities, roomFacilities);
        //get all facilities of that room
        //use the map function to get the array of the ids
        let selectedIds = roomFacilities.data.map(el => el.id);
        let output = facilities.data.map((el, i) => {
            if (selectedIds.includes(el.id)) {
                el.selected = true;
            } else {
                el.selected = false;
            }
            return el;
        });
        console.log(output);
        this.setState({ facilities: output, fetching: false });
    };

    handleSelectFacility = facility => {
        let facilities = this.state.facilities.map((el, i) => {
            if (el.id === facility.id) {
                el.selected = !facility.selected;
                return el;
            } else return el;
        });
        console.log(facilities);
        this.setState({ facilities });
    };

    submitFacilities = async () => {
        try {
            let facilities = this.state.facilities
                .filter(el => el.selected)
                .map(el => el.id);
            await axios.post(`/api/room/${this.props.id}/amenity`, {
                id: facilities
            });
            this.onClose(true);
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        let { facilities } = this.state;
        let filtered = this.state.facilities.filter(el => el.selected);
        let selectedNo = filtered.length;
        console.log(selectedNo);
        return (
            <Dialog
                onClose={this.onClose}
                onEntered={this.onEntered}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="simple-dialog-title">
                    Select facilities
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="name"
                        label="Number of Sleeps"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        autoFocus
                        id="name"
                        label="Price per night"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={state.checkedB}
                                // onChange={handleChange("checkedB")}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="With breakfast"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.submitFacilities}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
