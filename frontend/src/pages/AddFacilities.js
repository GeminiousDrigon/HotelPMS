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

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUtensils} from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

export default class AddFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
          name: '',
          icon: '',
            iconLabelWidth: 0
        };
    }

    onChange= (e) => {
      this.setState({[e.target.id]: e.target.value})
    }
    

    componentDidMount() {
        this.setState({ iconLabelWidth: this.inputLabel.offsetWidth });
    }

    onSave = async () => {
      try {
        let facility = await axios.post('/api/amenity',{
          name: this.state.name,
          icon: this.state.icon,
          featured: true
        })
        console.log(facility)
      } catch (err) {
        console.log(err)        
      }
    }
    

    render() {
        return (
            <AdminLayout {...this.props}>
                <div
                    style={{
                        width: "60%",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                        
                    <h2>Add Room Facilities</h2>

                    <Paper style={{ padding: 20 }}>
                        <TextField
                            id="name"
                            label="Name"
                            placeholder="Name"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onChange}
                            fullWidth
                        />
                        <FormControl
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        >
                            <InputLabel
                                htmlFor="outlined-age-native-simple"
                                ref={el => (this.inputLabel = el)}
                            >
                                Icon
                            </InputLabel>
                            <Select
                                native
                                input={
                                    <OutlinedInput
                                        onChange={this.onChange}
                                        id="icon"
                                        labelWidth={this.state.iconLabelWidth}
                                    />
                                }
                            >
                                <option value="" />
                                <option value={"test-icon"}>test-icon</option>
                                <option value={"test-icon"}>test-icon</option>
                                <option value={"test-icon"}>test-icon</option>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button variant="contained" color="primary" onClick={this.onSave}>
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
