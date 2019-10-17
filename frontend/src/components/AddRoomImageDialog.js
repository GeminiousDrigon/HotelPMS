import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { LinearProgress, CircularProgress } from "@material-ui/core";

export default class AddRoomImageDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            selectedFiles: [],
            uploading: false,
            uploadStatus: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let stateLength = this.state.uploadStatus.filter(el => el);
        let prevLength = prevState.uploadStatus.filter(el => el);
        let length = this.state.uploadStatus.length;
        // console.log(prevLength.length, prevLength.length, length);
        if (prevLength.length === length && stateLength.length === length && this.state.uploading && this.props.open) {
            // console.log("close dialog");
            this.props.handleCloseImage(true);
        }
    }

    handleFileChange = e => {
        console.log(Array.from(e.target.files));
        let allFiles = [...e.target.files];
        let selectedFiles = Array.from(allFiles);
        let files = Array.from(e.target.files);
        files = files.map(el => {
            el.src = URL.createObjectURL(el);
            return el;
        });
        this.setState({ selectedFiles, files });
    };

    submitFile = () => {
        let uploadStatus = this.state.files.map(() => {
            return false;
        });
        this.setState({ uploading: true, uploadStatus });
    };

    updateStatus = index => {
        let { uploadStatus } = this.state;
        uploadStatus[index] = true;
        this.setState({ uploadStatus });
    };

    render() {
        let { open } = this.props;
        return (
            <Dialog open={open} maxWidth="md" fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Add Image</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Please select the images that you want to upload.</DialogContentText>
                    <Button variant="contained" color="primary" onClick={() => this.fileInput.click()} disabled={this.state.uploading}>
                        Choose image
                    </Button>
                    <input
                        onChange={this.handleFileChange}
                        type="file"
                        style={{ display: "none" }}
                        ref={el => (this.fileInput = el)}
                        accept="image/x-png,image/jpeg"
                        multiple="multiple"
                    />
                    <div style={{ display: "flex", flexDirection: "row", marginTop: 30, flexWrap: "wrap" }}>
                        {this.state.files.map((el, i) => {
                            return (
                                <Image
                                    el={el}
                                    roomId={this.props.roomId}
                                    uploading={this.state.uploading}
                                    index={i}
                                    updateStatus={this.updateStatus}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={this.state.uploading} onClick={this.props.handleImage}>
                        Close
                    </Button>
                    <Button color="primary" autoFocus onClick={this.submitFile} disabled={this.state.uploading || this.state.files.length == 0}>
                        Upload
                        {this.state.uploading && <CircularProgress size={10} style={{ marginLeft: 10 }} />}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.uploading && this.props.uploading) {
            console.log("upload");
            this.submitFile();
        }
    }

    submitFile = async () => {
        try {
            this.setState({ uploading: true });
            let file = this.props.el;
            let form = new FormData();
            form.append("image", file, file.name);
            await axios.post(`/api/roomtype/${this.props.roomId}/file`, form, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                onUploadProgress: progressEvent => {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // console.log(percentCompleted);
                    this.setState({ progress: percentCompleted });
                    if (percentCompleted === 100) this.props.updateStatus(this.props.index);
                }
            });
            // console.log(file);
            // await axios.post(`/api/roomtype/${this.props.roomId}/file`, file, { headers: { "X-Requested-With": "XMLHttpRequest" } });
        } catch (err) {
            this.props.updateStatus(this.props.index);
        }
    };

    render() {
        let { el, uploading } = this.props;
        return (
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        backgroundColor: "red",
                        height: 188,
                        width: 250,
                        backgroundImage: `url(${el.src})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        display: "inline-block",
                        margin: 2
                    }}
                    key={el.name}
                />
                {this.props.uploading && (
                    <div
                        style={{
                            height: 188,
                            width: 250,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0,0,0,0.6)"
                        }}
                    >
                        <CircularProgress size={80} value={this.state.progress} variant="static" />
                    </div>
                )}
            </div>
        );
    }
}
