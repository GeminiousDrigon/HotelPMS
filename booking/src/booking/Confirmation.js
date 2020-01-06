import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Typography, ListItemSecondaryAction, Divider } from "@material-ui/core";
import moment from "moment";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PaymentIcon from "@material-ui/icons/Payment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import numeral from "numeral";

const NumeralComponent = React.memo(function Numeral(props) {
	return numeral(props.number).format("0,0.00");
});

export default class Confirmation extends Component {
	render() {
		let room = {
			rate: {}
		};
		let { values } = this.props;

		let { checkInDate, checkOutDate } = this.props.values;
		let numberOfDays = checkOutDate.diff(checkInDate, "days");
		return (
			<div
				style={{
					margin: "10px",
					padding: "25px"
				}}
			>
				<Grid
					container
					spacing={3}
					direction="column"
					justify="center"
					xs={12}
					md={7}
					style={{ margin: "0 auto" }}
					className="print"
				>
					<Grid alignItems="stretch" item xs={12} className="print">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 15
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<AccountCircleIcon
									style={{
										marginRight: 10,
										fontSize: 30
									}}
								/>
								<Typography variant="h5">Guest Information</Typography>
							</div>
						</div>

						<Paper
							style={{
								padding: "15px"
							}}
						>
							<div>
								<Grid item xs={12}>
									<div>
										<Typography variant="h4">{`${values.honorific}. ${values.firstname} ${values.middlename[0]} ${values.lastname}`}</Typography>
										<Typography
											gutterBottom
											style={{
												paddingLeft: 10
											}}
										></Typography>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div>
										<Typography>{values.email}</Typography>
										<Typography
											gutterBottom
											style={{
												paddingLeft: 10
											}}
										></Typography>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div>
										<Typography gutterBottom>{values.contactno}</Typography>
										<Typography
											gutterBottom
											style={{
												paddingLeft: 10
											}}
										></Typography>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div>
										<Typography gutterBottom>{values.country}</Typography>
										<Typography
											gutterBottom
											style={{
												paddingLeft: 10
											}}
										></Typography>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div>
										<Typography gutterBottom>{values.address}</Typography>
										<Typography
											variant="h6"
											gutterBottom
											style={{
												paddingLeft: 10
											}}
										></Typography>
									</div>
								</Grid>
							</div>
						</Paper>
					</Grid>
					<Grid alignItems="stretch" item xs={12}>
						<div
							style={{
								marginBottom: 15
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%"
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<EventAvailableIcon
										style={{
											marginRight: 10,
											fontSize: 30
										}}
									/>
									<Typography variant="h5">Booking Information</Typography>
								</div>
							</div>
						</div>

						<Paper
							style={{
								padding: "15px"
							}}
						>
							<div
								style={{
									marginBottom: 20
								}}
							>
								<br />
								<Grid container xs={12}>
									<Grid item xs={4} sm={4} md={4}>
										<div>
											<Typography align="center" variant="h5" gutterBottom>
												Check-in Date
											</Typography>
											<Typography align="center" gutterBottom>
												{moment(values.checkInDate).format("MMM DD, YYYY")}
											</Typography>
										</div>
									</Grid>
									<Grid item xs={4} md={4}>
										<div>
											<Typography align="center" variant="h5" gutterBottom>
												Check-out Date
											</Typography>
											<Typography align="center" gutterBottom>
												{moment(values.checkOutDate).format("MMM DD, YYYY")}
											</Typography>
										</div>
									</Grid>
									<Grid item xs={4} md={4}>
										<div>
											<Typography align="center" variant="h5" gutterBottom>
												Arrival
											</Typography>
											<Typography align="center" gutterBottom>
												{moment(values.timeArrival).format("HH:mm A")}
											</Typography>
										</div>
									</Grid>
								</Grid>
							</div>
						</Paper>
					</Grid>
					<Grid alignItems="stretch" item xs={12}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								marginBottom: 15
							}}
						>
							<LocalOfferIcon
								style={{
									marginRight: 10,
									fontSize: 30
								}}
							/>
							<Typography variant="h5">Selected Rooms</Typography>
						</div>
						<Paper style={{ padding: 10 }}>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									justifyContent: "flex-start",
									padding: 5
								}}
							>
								{values.selectedRooms.map((room, i) => {
									return (
										<Paper
											style={{
												padding: 10,
												margin: 5,
												minWidth: 200
											}}
										>
											<div>
												<Typography variant="h5" style={{ fontWeight: 300 }}>
													{room.name}
												</Typography>
												<Typography variant="subtitle2" style={{ fontWeight: 300 }}>
													{room.rate.adult} Adult(s)
												</Typography>
												<Typography variant="subtitle2" style={{ fontWeight: 300 }}>
													{room.rate.name}
												</Typography>
												<Typography variant="subtitle2" style={{ fontWeight: 300 }}>
													Price: &#8369;
													<NumeralComponent number={room.rate.price} />
												</Typography>
											</div>
										</Paper>
									);
								})}
							</div>
							<Typography variant="h6" style={{ marginTop: 20, marginLeft: 10 }}>
								Total:&#8369;
								<NumeralComponent number={this.props.totalCharge} />
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</div>

			// <>
			//     <Paper
			//         style={{
			//             padding: 25,
			//             marginBottom: 25,
			//             backgroundColor: "#E6E6E6"
			//         }}
			//     >
			//         <Typography variant="h4" gutterBottom>
			//             Guest Information
			//         </Typography>
			//         <Grid container spacing={2}>
			//             <Grid item xs={12} md={3}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Honorifics
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.honorific}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={3}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     First name
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.firstname}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={3}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Middle name
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.middlename}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={3}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Last name
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.lastname}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Address
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.address}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={4}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Country
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.country}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={4}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Contact number
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     +63{values.contactno}
			//                 </Typography>
			//             </Grid>
			//             <Grid item xs={12} md={4}>
			//                 <Typography
			//                     variant="h6"
			//                     style={{ fontWeight: 300 }}
			//                 >
			//                     Email address
			//                 </Typography>
			//                 <Typography
			//                     variant="subtitle1"
			//                     style={{ fontWeight: 300, paddingLeft: 25 }}
			//                 >
			//                     {values.email}
			//                 </Typography>
			//             </Grid>
			//         </Grid>
			//     </Paper>
			//     <Paper style={{ padding: 25, backgroundColor: "#E6E6E6" }}>
			//         <Typography variant="h4" gutterBottom>
			//             Booking Information
			//         </Typography>
			//         <Grid
			//             container
			//             spacing={2}
			//             style={{ paddingTop: 25, paddingBottom: 25 }}
			//         >
			//             <Grid container justify="space-around">
			//                 <Grid
			//                     item
			//                     xs={12}
			//                     md={3}
			//                     style={{
			//                         display: "flex",
			//                         justifyContent: "space-around",
			//                         alignItems: "center",
			//                         flexDirection: "column"
			//                     }}
			//                 >
			//                     <Typography
			//                         variant="h5"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         Check-in Date
			//                     </Typography>
			//                     <Typography
			//                         variant="subtitle1"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         {moment(values.checkInDate).format(
			//                             "MMMM D, YYYY"
			//                         )}
			//                     </Typography>
			//                 </Grid>
			//                 <Grid
			//                     item
			//                     xs={12}
			//                     md={3}
			//                     style={{
			//                         display: "flex",
			//                         justifyContent: "space-around",
			//                         alignItems: "center",
			//                         flexDirection: "column"
			//                     }}
			//                 >
			//                     <Typography
			//                         variant="h5"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         Check-out Date
			//                     </Typography>
			//                     <Typography
			//                         variant="subtitle1"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         {moment(values.checkOutDate).format(
			//                             "MMMM D, YYYY"
			//                         )}
			//                     </Typography>
			//                 </Grid>
			//                 <Grid
			//                     item
			//                     xs={12}
			//                     md={3}
			//                     style={{
			//                         display: "flex",
			//                         justifyContent: "space-around",
			//                         alignItems: "center",
			//                         flexDirection: "column"
			//                     }}
			//                 >
			//                     <Typography
			//                         variant="h5"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         Time Arrival
			//                     </Typography>
			//                     <Typography
			//                         variant="subtitle1"
			//                         style={{ fontWeight: 300 }}
			//                         component="span"
			//                     >
			//                         {moment(values.timeArrival).format(
			//                             "hh:mm A"
			//                         )}
			//                     </Typography>
			//                 </Grid>
			//             </Grid>
			//         </Grid>
			//         <div style={{ marginTop: 25 }}>
			//             <Typography variant="h4" gutterBottom>
			//                 Selected Room(s)
			//             </Typography>
			//         </div>
			//         <div
			//             style={{
			//                 display: "flex",
			//                 flexWrap: "wrap",
			//                 justifyContent: "flex-start"
			//             }}
			//         >
			//             {values.selectedRooms.map((room, i) => {
			//                 return (
			//                     <Paper
			//                         style={{
			//                             padding: 10,
			//                             margin: 5,
			//                             minWidth: 200
			//                         }}
			//                     >
			//                         <div>
			//                             <Typography
			//                                 variant="h5"
			//                                 style={{ fontWeight: 300 }}
			//                             >
			//                                 {room.name}
			//                             </Typography>
			//                             <Typography
			//                                 variant="subtitle2"
			//                                 style={{ fontWeight: 300 }}
			//                             >
			//                                 {room.rate.adult} Adult(s)
			//                             </Typography>
			//                             <Typography
			//                                 variant="subtitle2"
			//                                 style={{ fontWeight: 300 }}
			//                             >
			//                                 {room.rate.name}
			//                             </Typography>
			//                             <Typography
			//                                 variant="subtitle2"
			//                                 style={{ fontWeight: 300 }}
			//                             >
			//                                 Price: PHP{room.rate.price}
			//                             </Typography>
			//                         </div>
			//                     </Paper>
			//                 );
			//             })}
			//         </div>
			//     </Paper>
			// </>
		);
	}
}
