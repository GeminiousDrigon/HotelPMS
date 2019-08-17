import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export default class AddRoom extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <div>
                    <h3
                        style={{
                            width: "100%",
                            backgroundColor: "yellow",
                            height: "50px",
                            marginTop: "-5px",
                            paddingTop: "11px",
                            paddingLeft: "20px",
                            float: "left"
                        }}
                    >
                        Rooms/Add Room
                    </h3>
                    <FormControl
                        variant="outlined"
                        id="outlined-with-placeholder"
                        margin="normal"
                        style={{ width: "25%" }}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Room Type
                        </InputLabel>
                        <Select
                            native
                            input={
                                <OutlinedInput
                                    name="roomtype"
                                    id="outlined-age-native-simple"
                                />
                            }
                        >
                            <option value="" />
                            <option value={10}>Regular</option>
                            <option value={20}>Deluxe</option>
                            <option value={30}>Payag</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        id="outlined-with-placeholder"
                        margin="normal"
                        style={{ marginLeft: 20, width: "25%" }}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Room Number
                        </InputLabel>
                        <Select
                            native
                            input={
                                <OutlinedInput
                                    name="roomno"
                                    id="outlined-age-native-simple"
                                />
                            }
                        >
                            <option value="" />
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </Select>
                    </FormControl>
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Description"
                        placeholder="Description"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "51.6%" }}
                    />
                    <br />
                    <TextField
                        id="outlined-with-placeholder"
                        label="Price"
                        placeholder="Price"
                        margin="normal"
                        variant="outlined"
                        style={{ width: "25%" }}
                    />

                    <br />
                    <br />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "green" }}
                        color="primary"
                    >
                        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                        <SaveIcon style={{ marginRight: "10px" }} />
                        Save
                    </Button>
                </div>
            </AdminLayout>
        );
    }
}
