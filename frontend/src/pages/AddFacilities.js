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

import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import InfoIcon from "@material-ui/icons/Info";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";

import * as yup from "yup";
import axios from "axios";
import { withFormik } from "formik";
import { FormHelperText } from "@material-ui/core";

import icons from "../icons.json";
import IconsItem from "../components/IconsItem";
import { GET, PUT, POST, DELETE } from '../utils/restUtils'

class AddFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            icon: "",
            validateCalled: false,
            featured: false,
            iconLabelWidth: 0,
            snackbar: false,
            snackBarMessage: ""
        };
    }

    onChange = e => {
        console.log(e.target.id, e.target.value);
        this.props.setFieldValue(e.target.id, e.target.value);
        // this.setState({ [e.target.id]: e.target.value });
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
    openSnackBar = snackBarMessage => {
        this.setState({ snackbar: true, snackBarMessage });
    };
    handleCloseSnackBar = () => this.setState({ snackbar: false });
    onSave = async () => {
        try {
            this.setState({ validateCalled: true });
            await this.props.validateForm();
            if (this.props.isValid) {
                this.setState({ submitting: true }, async () => {
                    try {
                        let { values } = this.props;
                        if (this.props.match.params.id) {
                            console.log("here");
                            let { id } = this.props.match.params;
                            let facility = await PUT(
                                `/api/amenity/${id}`,
                                {
                                    name: values.name,
                                    icon: values.icon
                                }
                            );
                            this.props.history.goBack();
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
                            let facility = await POST("/api/amenity", {
                                name: values.name,
                                icon: values.icon
                            });
                            this.props.history.push("/property/facilities");
                            console.log(facility);
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

    getFacilities = async id => {
        try {
            let { data } = await GET(`/api/amenity/${id}`);
            this.props.setFieldValue("name", data.name);
            this.props.setFieldValue("icon", data.icon);
        } catch (err) {
            console.log(err);
        }
    };

    onSelectIcon = value => {
        this.props.setFieldValue("icon", value);
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
                        width: "60%",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Paper style={{ padding: 20 }}>
                        <h2>Add Room Facilities</h2>
                        <div
                            style={{
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"
                            }}
                        >
                            {values.icon !== "" && (
                                <Icon fontSize="large" color="primary">
                                    {values.icon}
                                </Icon>
                            )}
                            <h1 style={{ margin: 0, marginLeft: 5 }}>
                                {values.name}
                            </h1>
                        </div>
                        <TextField
                            id="name"
                            label="Name"
                            placeholder="Name"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            helperText={
                                (validateCalled || touched.name) && errors.name
                                    ? errors.name
                                    : ""
                            }
                            error={
                                (validateCalled || touched.name) && errors.name
                            }
                            fullWidth
                        />
                        <div
                            style={{
                                width: "100%"
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
                                <IconsItem
                                    {...icon}
                                    onSelectIcon={this.onSelectIcon}
                                />
                            );
                        })}
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
            icon: "",
            name: ""
        };
    },
    validationSchema: function() {
        let schema = yup.object().shape({
            name: yup.string("Name").required("Name is required!")
        });
        return schema;
    }
})(AddFacilities);

export default WithFormik;
