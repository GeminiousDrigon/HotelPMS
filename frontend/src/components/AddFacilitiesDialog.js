import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

//icons
import PersonIcon from "@material-ui/icons/Person";

import axios from "axios";
import makeStyles from "@material-ui/styles/makeStyles";

export default class AddFacilitiesDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            facilities: [],
            selected: []
        };
    }

    onClose = (get) => {
        this.setState({ fetching: true });
        this.props.handleClose()
        if(get)
            this.props.getFacilities()
    };

    onEntered = async () => {
        console.log("entered!");
        let [facilities, roomFacilities] = await Promise.all([axios.get("/api/amenity"), axios.get(`/api/roomtype/${this.props.id}/amenity`)])
        console.log(facilities,roomFacilities)
        //get all facilities of that room
        //use the map function to get the array of the ids
        let selectedIds = roomFacilities.data.map(el =>el.id);
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
            let facilities = this.state.facilities.filter(el => el.selected).map(el=>el.id);
            await axios.post(`/api/roomtype/${this.props.id}/amenity`, {id: facilities});
            this.onClose(true);
        } catch (err) {
            console.log(err)
        }
    }
    

    render() {
        let { facilities } = this.state;
        let filtered = this.state.facilities.filter(el => el.selected);
        let selectedNo = filtered.length;
        console.log(selectedNo);
        let chips = filtered.map((el, i) => {
            return (
                <Chip
                    icon={<Icon>{el.icon}</Icon>}
                    label={el.name}
                    color="primary"
                    onDelete={() => this.handleSelectFacility(el)}
                    deleteIcon={<Icon>close</Icon>}
                    variant="outlined"
                    style={{ margin: 2 }}
                />
            );
        });
        return (
            <Dialog
                onClose={this.onClose}
                onEntered={this.onEntered}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="simple-dialog-title">
                    Select facilities
                </DialogTitle>
                {this.state.fetching ? (
                    <div
                        style={{
                            width: "100%",
                            margin: "10px 0",
                            textAlign: "center"
                        }}
                    >
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div style={{ padding: 20 }}>
                            {selectedNo === 0 ? (
                                <div
                                    style={{
                                        textAlign: "center"
                                    }}
                                >
                                    <Typography variant="subtitle1">
                                        No facilities Added
                                    </Typography>
                                </div>
                            ) : (
                                chips
                            )}
                        </div>
                        <List>
                            {facilities.map(facility => (
                                <ListItem
                                    button
                                    // onClick={() => handleListItemClick(email)}
                                    key={facility.id}
                                    onClick={() =>
                                        this.handleSelectFacility(facility)
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            style={{
                                                backgroundColor: "#3f51b5"
                                            }}
                                        >
                                            <Icon>
                                                {facility.selected
                                                    ? "check"
                                                    : facility.icon}
                                            </Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={facility.name} />
                                </ListItem>
                            ))}

                            {/* <ListItem
                    button
                    onClick={() => handleListItemClick("addAccount")}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="add account" />
                </ListItem> */}
                        </List>
                    </>
                )}
                <DialogActions>
                    <Button color="primary" onClick={this.onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.submitFacilities}>Add</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
