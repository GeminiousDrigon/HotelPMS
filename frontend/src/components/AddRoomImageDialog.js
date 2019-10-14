import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default class AddRoomImageDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    handleFileChange = e => {
        console.log(Array.from(e.target.files));
        let files = Array.from(e.target.files);
        files = files.map(el => {
            el.src = URL.createObjectURL(el);
            return el;
        });
        this.setState({ files });
    };

    render() {
        let { open } = this.props;
        return (
            <Dialog open={open} maxWidth="md" fullWidth aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Add Image</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Please select the images that you want to upload.</DialogContentText>
                    <Button variant="contained" color="primary" onClick={() => this.fileInput.click()}>
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
                        {this.state.files.map(el => {
                            return (
                                <div
                                    style={{
                                        backgroundColor: "red",
                                        height: 127,
                                        width: 170,
                                        margin: 2,
                                        backgroundImage: `url(${el.src})`,
                                        backgroundPosition: "center",
                                        backgroundSize: 'cover'
                                    }}
                                    key={el.name}
                                />
                            );
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary">Disagree</Button>
                    <Button color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
