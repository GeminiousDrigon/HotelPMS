import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FolderIcon from "@material-ui/icons/Folder";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as yup from "yup";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "axios";
import { GET, DELETE, POST, PUT } from "../utils/restUtils";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class Additionals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            additionals: [],
            anchorEl: null,
            additionalId: null,
            additionalDialog: false,

            //field
            name: "",
            price: 0
        };
    }

    componentDidMount() {
        this.getAllAdditionals();
    }

    getAllAdditionals = async () => {
        try {
            let { data } = await GET("/api/additional");
            console.log(data);
            this.setState({ additionals: data });
        } catch (err) {
            console.log(err);
        }
    };

    deleteAdditional = async () => {
        try {
            this.setState({ anchorEl: null });
            let id = this.state.additionalId;
            await DELETE(`/api/additional/${id}`);

            this.setState({ additionalId: null });
            this.getAllAdditionals();
        } catch (err) {
            console.log(err);
        }
    };

    handleClick = (e, id) =>
        this.setState({
            anchorEl: e.currentTarget,
            additionalId: id
        });

    handleClose = () => {
        this.setState({ anchorEl: null, additionalId: null });
    };

    editAdditional = async () => {
        let id = this.state.additionalId;
        let { data } = await GET(`/api/additional/${id}`);
        console.log(data);
        this.setState(
            {
                anchorEl: null,
                name: data.name,
                price: data.price
            },
            () => this.handleAdditionalDialog()
        );
    };

    addAdditionals = async values => {
        try {
            let { name, price } = values;
            if (this.state.additionalId) {
                //edit
                let id = this.state.additionalId;
                await PUT(`/api/additional/${id}`, {
                    name,
                    price
                });
                this.handleAdditionalDialog();
                this.getAllAdditionals();
            } else {
                //add
                await POST(`/api/additional`, {
                    name,
                    price
                });
                this.handleAdditionalDialog();
                this.getAllAdditionals();
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleAdditionalDialog = () => {
        if (this.state.additionalDialog) {
            this.setState({
                additionalDialog: false,
                name: "",
                price: 0,
                additionalId: ""
            });
        } else {
            this.setState({ additionalDialog: true });
        }
    };

    render() {
        let { anchorEl } = this.state;
        let open = Boolean(anchorEl);
        return (
            <>
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "50%"
                    }}
                >
                    <Paper
                        style={{
                            backgroundColor: "white",
                            padding: 20
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Typography variant="h5">Additionals</Typography>
                            <Tooltip title="Add Additional">
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleAdditionalDialog}
                                >
                                    <Icon>add</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ width: "100%" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">
                                            Price
                                        </TableCell>
                                        <TableCell align="left">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.additionals.map((data, i) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="left">
                                                    {data.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {data.price}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton
                                                        aria-label="more"
                                                        aria-controls="long-menu"
                                                        aria-haspopup="true"
                                                        size="small"
                                                        onClick={e =>
                                                            this.handleClick(
                                                                e,
                                                                data.id
                                                            )
                                                        }
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>

                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.editAdditional}>
                                Edit
                            </MenuItem>
                            <MenuItem onClick={this.deleteAdditional}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </Paper>
                </div>
                <Dialog
                    open={this.state.additionalDialog}
                    // onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                    fullWidth
                >
                    <Formik
                        initialValues={{
                            name: this.state.name,
                            price: this.state.price
                        }}
                        onSubmit={values => this.addAdditionals(values)}
                        enableReinitialize
                        validationSchema={() =>
                            yup.object().shape({
                                name: yup
                                    .string("Name must be a word!")
                                    .required("Name is required!"),
                                price: yup
                                    .number("Price must be a number!")
                                    .min(1, "Price must have a value!")
                                    .required("Price is required!")
                            })
                        }
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <>
                                <DialogTitle id="form-dialog-title">
                                    {this.state.additionalId ? "Edit" : "Add"}{" "}
                                    Additional
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Fill up the form to{" "}
                                        {this.state.additionalId
                                            ? "edit"
                                            : "add"}{" "}
                                        additional.
                                    </DialogContentText>

                                    <TextField
                                        autoFocus
                                        id="name"
                                        label="Name"
                                        fullWidth
                                        margin="normal"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        helperText={
                                            touched.name && errors.name
                                                ? errors.name
                                                : ""
                                        }
                                        error={
                                            touched.name && errors.name
                                                ? true
                                                : false
                                        }
                                    />
                                    <TextField
                                        id="price"
                                        margin="normal"
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        helperText={
                                            touched.price && errors.price
                                                ? errors.price
                                                : ""
                                        }
                                        error={
                                            touched.price && errors.price
                                                ? true
                                                : false
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        color="primary"
                                        onClick={this.handleAdditionalDialog}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </DialogActions>
                            </>
                        )}
                    </Formik>
                </Dialog>
            </>
        );
    }
}
