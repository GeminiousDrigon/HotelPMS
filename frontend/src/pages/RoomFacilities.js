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

import axios from "axios";

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1)
    },
    extendedIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default class RoomFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facilities: [],
            anchorEl: null,
            facilityId: null
        };
    }

    componentDidMount() {
        this.getAllFacilities();
    }

    getAllFacilities = async () => {
        try {
            let { data } = await axios.get("/api/amenity");
            console.log(data);
            this.setState({ facilities: data });
        } catch (err) {
            console.log(err);
        }
    };

    deleteFacility = async () => {
        try {
            let id = this.state.facilityId;
            await axios.delete(`/api/amenity/${id}`);
            this.getAllFacilities();
        } catch (err) {
            console.log(err);
        }
    };

    handleClick = (e, id) =>
        this.setState({
            anchorEl: e.currentTarget,
            facilityId: id
        });

    handleClose = () => {
        this.setState({ anchorEl: null, facilityId: null });
    };

    editFacility = () =>
        this.props.history.push(`/roomfacilities/${this.state.facilityId}`);

    addFacilities = () => this.props.history.push("/addfacilities");

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
                            <Typography variant="h4">Facilities</Typography>
                            <Tooltip title="Add Facility">
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.addFacilities}
                                >
                                    <Icon>add</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div style={{ width: "100%" }}>
                            <div>
                                <InputBase
                                    placeholder="Search icon"
                                    classes={{}}
                                    inputProps={{
                                        "aria-label": "search"
                                    }}
                                />
                                <div
                                    style={{
                                        marginTop: "-30px",
                                        marginLeft: "32%"
                                    }}
                                >
                                    <SearchIcon />
                                </div>
                            </div>
                            <List>
                                {this.state.facilities.map(
                                    (el, i, collection) => {
                                        return (
                                            <>
                                                <ListItem>
                                                    <Icon
                                                        color="primary"
                                                        style={{
                                                            marginRight: 10
                                                        }}
                                                    >
                                                        {el.icon}
                                                    </Icon>
                                                    <ListItemText
                                                        id={""}
                                                        primary={el.name}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            onClick={e =>
                                                                this.handleClick(
                                                                    e,
                                                                    el.id
                                                                )
                                                            }
                                                            size="small"
                                                        >
                                                            <Icon fontSize="inherit">
                                                                more_vert
                                                            </Icon>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {collection.length > i+1 && (
                                                    <Divider />
                                                )}
                                            </>
                                        );
                                    }
                                )}
                            </List>
                        </div>
                        {/* <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Icon</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.facilities.map((data, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="left">
                                                {data.id}
                                            </TableCell>
                                            <TableCell align="left">
                                                {data.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {data.icon}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Fab
                                                    style={{
                                                        marginRight: "10px"
                                                    }}
                                                    size="small"
                                                    aria-label="add"
                                                    onClick={() =>
                                                        this.props.history.push(
                                                            `/roomfacilities/${data.id}`
                                                        )
                                                    }
                                                >
                                                    <EditIcon />
                                                </Fab>
                                                <Fab
                                                    size="small"
                                                    aria-label="delete"
                                                    color="secondary"
                                                    onClick={() =>
                                                        this.deleteFacility(
                                                            data.id
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </Fab>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table> */}
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.editFacility}>
                                Edit
                            </MenuItem>
                            <MenuItem onClick={this.deleteFacility}>
                                Delete
                            </MenuItem>
                        </Menu>
                    </Paper>
                </div>
            </>
        );
    }
}
