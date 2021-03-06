import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

export default class RoomTypeItem extends Component {
    render() {
        let { roomType, selectedType } = this.props;
        if (roomType.unbookable) {
            return (
                <div
                    style={{
                        marginRight: 10,
                        marginBottom: 10
                    }}
                    key={roomType.id}
                >
                    <Paper
                        style={{
                            padding: 20,
                            backgroundColor:
                                selectedType.id === roomType.id
                                    ? "#3f51b5"
                                    : "#c89553",
                            color: selectedType.id === roomType.id && "white"
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="span"
                            gutterBottom
                            style={{ fontWeight: 500, color: "white" }}
                        >
                            {roomType.name}
                        </Typography>
                        <div>
                            <Typography
                                variant="subtitle1"
                                component="span"
                                gutterBottom
                                style={{
                                    display: "inline-block",
                                    fontWeight: 300,
                                    color: "white"
                                }}
                            >
                                Bed Type:&nbsp;
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="span"
                                style={{
                                    display: "inline-block",
                                    fontWeight: 300,
                                    color: "white"
                                }}
                            >
                                {roomType.name}
                            </Typography>
                        </div>

                        <div style={{ color: "red" }}>
                            <Typography variant="caption" color="inherit">
                                Not available anymore
                            </Typography>
                            <br />
                            <Typography variant="caption" color="inherit">
                                Someone booked last{" "}
                                {moment(roomType.lastBooking).format(
                                    "MM/DD/YYYY"
                                )}
                            </Typography>
                        </div>
                    </Paper>
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        marginRight: 10,
                        marginBottom: 10,
                        cursor: "pointer"
                    }}
                    onClick={() => this.props.onChangeType(roomType)}
                    key={roomType.id}
                >
                    <Paper
                        style={{
                            padding: 20,
                            backgroundColor:
                                selectedType.id === roomType.id
                                    ? "#f9a600"
                                    : "white",
                            color: selectedType.id === roomType.id && "white"
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="span"
                            gutterBottom
                            style={{ fontWeight: 500 }}
                        >
                            {roomType.name}
                        </Typography>
                        <div>
                            <Typography
                                variant="subtitle1"
                                component="span"
                                gutterBottom
                                style={{
                                    display: "inline-block",
                                    fontWeight: 300
                                }}
                            >
                                Bed Type:&nbsp;
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="span"
                                gutterBottom
                                style={{
                                    display: "inline-block",
                                    fontWeight: 300
                                }}
                            >
                                {roomType.name}
                            </Typography>
                        </div>
                    </Paper>
                </div>
            );
        }
    }
}
