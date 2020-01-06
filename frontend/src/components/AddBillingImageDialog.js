import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { LinearProgress, CircularProgress, Typography } from "@material-ui/core";
import { GET, POST, PUT, DELETE } from "../utils/restUtils";
import Fab from "@material-ui/core/Fab";

import CloseIcon from "@material-ui/icons/Close";

export default class AddBillingImageDialog extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			selectedFiles: [],
			uploading: false,
			uploadStatus: [],
			photos: [],
			deleteImage: false,
			selectedImage: null,
			viewImage: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		let stateLength = this.state.uploadStatus.filter(el => el);
		let prevLength = prevState.uploadStatus.filter(el => el);
		let length = this.state.uploadStatus.length;
		// console.log(prevLength.length, prevLength.length, length);
		if (prevLength.length === length && stateLength.length === length && this.state.uploading && this.props.open) {
			// console.log("close dialog");
			this.setState(
				{
					files: [],
					selectedFiles: [],
					uploading: false,
					uploadStatus: []
				},
				() => {
					this.getPaymentPhotos();
				}
			);
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

	getPaymentPhotos = async () => {
		try {
			let id = this.props.paymentId;
			let { data } = await GET(`/api/billing/${id}/file`);
			this.setState({ photos: data });
		} catch (err) {
			console.log(err);
		}
	};

	openDeleteImage = image => {
		this.setState({ deleteImage: !this.state.deleteImage, selectedImage: image });
	};

	handleDeleteImage = () => {
		this.setState({ deleteImage: !this.state.deleteImage });
	};

	handleCloseDeleteImage = () => this.setState({ deleteImage: false });

	onDeleteImage = async () => {
		try {
			let id = this.props.paymentId;
			await DELETE(`/api/billing/${id}/file?filename=${this.state.selectedImage}`);
			this.handleCloseDeleteImage();
			this.getPaymentPhotos();
		} catch (err) {
			console.log(err);
		}
	};

	openViewImage = image => {
		this.setState({ selectedImage: image, viewImage: true });
	};

	closeViewImage = () => this.setState({ selectedImage: null, viewImage: false });

	render() {
		let { open } = this.props;
		return (
			<>
				<Dialog
					open={open}
					maxWidth="md"
					fullWidth
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					onEnter={this.getPaymentPhotos}
					onExit={() => {
						this.setState({
							files: [],
							selectedFiles: [],
							uploading: false,
							uploadStatus: [],
							photos: []
						});
					}}
				>
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
							{this.state.files.length > 0 ? (
								this.state.files.map((el, i) => {
									return (
										<Image
											el={el}
											paymentId={this.props.paymentId}
											uploading={this.state.uploading}
											index={i}
											updateStatus={this.updateStatus}
										/>
									);
								})
							) : (
								<div style={{ width: "100%", textAlign: "center" }}>
									<Typography variant="subtitle1" style={{ marginTop: 10 }}>
										No image
									</Typography>
								</div>
							)}
						</div>
						<div>
							<Typography variant="h6" gutterBottom>
								Uploaded
							</Typography>
							<div style={{ display: "flex", flexDirection: "row", marginTop: 30, flexWrap: "wrap", padding: "0 20px" }}>
								{this.state.photos.map((el, i) => {
									return (
										<div
											style={{
												position: "relative"
											}}
										>
											<div
												style={{
													backgroundColor: "#ecf0f1",
													height: 188,
													width: 250,
													backgroundImage: `url(${el.src})`,
													backgroundPosition: "center",
													backgroundSize: "cover",
													display: "inline-block",
													margin: 5
												}}
												key={el.filename}
												onClick={() => this.openViewImage(el.src)}
											></div>
											<Fab
												size="small"
												style={{ position: "absolute", top: 5, right: 5, zIndex: 10000 }}
												color="primary"
												onClick={() => this.openDeleteImage(el.filename)}
											>
												<CloseIcon style={{ color: "white" }} />
											</Fab>
										</div>
									);
								})}
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button color="primary" disabled={this.state.uploading} onClick={this.props.handleImage}>
							Close
						</Button>
						<Button
							color="primary"
							autoFocus
							onClick={this.submitFile}
							disabled={this.state.uploading || this.state.files.length == 0}
						>
							Upload
							{this.state.uploading && <CircularProgress size={10} style={{ marginLeft: 10 }} />}
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.deleteImage}
					onClose={this.handleCloseDeleteImage}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">Are you sure you want to delete this image?</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseDeleteImage} color="primary">
							Disagree
						</Button>
						<Button onClick={this.onDeleteImage} color="primary" autoFocus>
							Agree
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.viewImage}
					onClose={this.closeViewImage}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
					PaperProps={{ style: { margin: 10, width: "auto", maxWidth: "none" } }}
				>
					<div style={{ position: "relative" }}>
						<DialogContent style={{ padding: 0 }}>
							<img src={this.state.selectedImage} style={{ height: "100%" }} />
						</DialogContent>

						<IconButton
							aria-label="delete"
							size="small"
							style={{ backgroundColor: "#fff", position: "absolute", top: 10, right: 10, zIndex: 10000 }}
							onClick={this.closeViewImage}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					</div>
				</Dialog>
			</>
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
			await POST(`/api/billing/${this.props.paymentId}/file`, form, {
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
