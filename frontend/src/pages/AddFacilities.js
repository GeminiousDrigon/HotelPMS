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
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import icons from "../icons.json";
import IconsItem from "../components/IconsItem";

export default class AddFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            icon: "",
            featured: false,
            iconLabelWidth: 0
        };
    }

    onChange = e => {
        console.log(e.target.id, e.target.value);
        this.setState({ [e.target.id]: e.target.value });
    };

    onChangeFeature = () => {
        this.setState({ featured: !this.state.featured });
    };

    componentDidMount() {
        // this.setState({ iconLabelWidth: this.inputLabel.offsetWidth });
        if (this.props.match.params.id) {
            this.getFacilities(this.props.match.params.id);
        }
    }

    onChangeSelect = e => {
        this.setState({ icon: e.target.value });
    };

    onSave = async () => {
        try {
            if (this.props.match.params.id) {
                console.log("here");
                let { id } = this.props.match.params;
                let facility = await axios.put(`/api/amenity/${id}`, {
                    name: this.state.name,
                    icon: this.state.icon
                });
                this.props.history.goBack();
            } else {
                let facility = await axios.post("/api/amenity", {
                    name: this.state.name,
                    icon: this.state.icon
                });
                this.props.history.push("/roomfacilities");
                console.log(facility);
            }
        } catch (err) {
            console.log(err);
        }
    };

    getFacilities = async id => {
        try {
            let { data } = await axios.get(`/api/amenity/${id}`);
            this.setState({
                name: data.name,
                icon: data.icon
            });
        } catch (err) {
            console.log(err);
        }
    };

    onSelectIcon = (value) => {
        this.setState({icon: value})
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
                    <Paper style={{ padding: 20 }}>
                        <h2>Add Room Facilities</h2>
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            {this.state.icon !== "" && <Icon fontSize="large">{this.state.icon}</Icon>}
                            <h1 style={{ margin: 0, marginLeft: 5 }}>{this.state.name}</h1>
                        </div>
                        <TextField
                            id="name"
                            label="Name"
                            placeholder="Name"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onChange}
                            value={this.state.name}
                            fullWidth
                        />
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onSave}
                                fullWidth
                                size="large"
                            >
                                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                                <SaveIcon style={{ marginRight: "10px" }} />
                                Save
                            </Button>
                        </div>
                        <h1>Select Icon</h1>
                        {icons.map((icon, i) => {
                            return (
                                <IconsItem {...icon} onSelectIcon={this.onSelectIcon} />
                            );
                        })}
                        
                    </Paper>
                </div>
            </AdminLayout>
        );
    }
}
