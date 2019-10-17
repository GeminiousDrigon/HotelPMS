import * as React from "react";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import AdminLayout from "../components/AdminLayout";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import moment from "moment";
import Calendar from "../components/Calendar";

import QrReader from "react-qr-scanner";

export default class Component extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            //.....currentDate: "",
            currentViewName: "Day",

            delay: 3000,
            result: "No result",
            qrDialog: false
        };
    }

    handleScan = result => {
        console.log(result);
        if (result !== null) {
            // window.open(result);
            let hostname = window.location.hostname;
            let port = window.location.port;
            window.open(`http://${hostname}:${port}/bookings/view/${result}`);
        }
        this.setState({ result });
    };
    handleError = err => {
        console.error(err);
    };
    handleQrDialog = () => this.setState({ qrDialog: !this.state.qrDialog });

    render() {
        const previewStyle = {
            width: '100%'
        };
        return (
            <AdminLayout {...this.props} style={{ padding: 0, overflow: "unset" }}>
                <Paper style={{ display: "flex", padding: "84px 24px 24px 24px", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" color="primary" onClick={this.handleQrDialog}>
                            Scan QR
                        </Button>
                    </div>
                    <Calendar />
                </Paper>
                <Dialog
                    open={this.state.qrDialog}
                    onClose={this.handleQrDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">Scan QR Code</DialogTitle>
                    <DialogContent>
                        <QrReader delay={this.state.delay} style={previewStyle} onError={this.handleError} onScan={this.handleScan} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" autoFocus onClick={this.handleQrDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </AdminLayout>
        );
    }
}
