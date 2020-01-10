import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import AdminLayout from "../components/AdminLayout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import { GET } from "../utils/restUtils";

const MemoMonthComponent = React.memo(function MonthComponent(props) {
	return `${moment(props.from).format("MM/DD/YYYY")} - ${moment(props.to).format("MM/DD/YYYY")}`;
});

const NumeralComponent = React.memo(function Numeral(props) {
	let number = props.additional * 100 + props.price;
	return numeral(number).format("0,0.00");
});

const StatusComponent = React.memo(function Status({ status }) {
	switch (status) {
		case "NOSHOW":
			return "No Show";
		case "RESERVED":
			return "Reserved";
		case "CHECKEDIN":
			return "Checked-in";
		case "CHECKEDOUT":
			return "Checked-out";
		default:
			return "";
	}
});

export default class YearReport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fetching: true,
			failed: false,
			month: "",
			data: []
		};
	}

	componentDidMount() {
		this.getReport(this.state.month);
	}

	handleMonthChange = e => {
		this.setState({ month: e.target.value }, () => {
			this.getReport(this.state.month);
		});
	};

	getReport = async month => {
		try {
			if (!this.state.fetching) this.setState({ fetching: true });
			let config = {};
			console.log(month);
			if (month > 0) {
				config.params = {
					month
				};
			}
			let { data } = await GET("/api/reports/yearly", config);
			this.setState({ fetching: false, fetched: true, data });
		} catch (err) {
			if (err.response.status === 404) {
				this.setState({ fetching: false, data: [] });
			} else this.setState({ fetching: false, failed: true });
		}
	};

	months = [
		{
			value: 1,
			name: "January"
		},
		{
			value: 2,
			name: "February"
		},
		{
			value: 3,
			name: "March"
		},
		{
			value: 4,
			name: "April"
		},
		{
			value: 5,
			name: "May"
		},
		{
			value: 6,
			name: "June"
		},
		{
			value: 7,
			name: "July"
		},
		{
			value: 8,
			name: "August"
		},
		{
			value: 9,
			name: "September"
		},
		{
			value: 10,
			name: "October"
		},
		{
			value: 11,
			name: "November"
		},
		{
			value: 12,
			name: "December"
		}
	];
	render() {
		let { fetching, month } = this.state;
		return (
			<AdminLayout {...this.props}>
				<div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
					<Typography variant="h5">Reports</Typography>
					<Button variant="contained" size="small" color="primary" onClick={window.print} className="d-print-none">
						Print
					</Button>
				</div>
				<FormControl style={{ minWidth: 200 }} className="d-print-none">
					<InputLabel>Month</InputLabel>
					<Select MenuProps={{ style: { maxHeight: 300 } }} value={month} onChange={this.handleMonthChange}>
						<MenuItem value={-1}>All months</MenuItem>;
						{this.months.map(month => {
							return (
								<MenuItem key={month.value} value={month.value}>
									{month.name}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<div style={{ marginTop: 30 }}>
					{fetching ? (
						<div style={{ padding: 20, textAlign: "center" }}>
							<CircularProgress />
						</div>
					) : this.state.data.length === 0 ? (
						<div style={{ textAlign: "center" }}>
							<Typography variant="h5" color="textPrimary">
								No data found
							</Typography>
						</div>
					) : (
						this.state.data.map((month, i) => {
							if (month.data.length === 0) return null;
							else
								return (
									<div key={month.name} style={{ marginBottom: 50 }}>
										<Typography variant="h5" color="textSecondary" gutterBottom>
											{month.name}
										</Typography>
										<Paper style={{ textAlign: "center" }}>
											<Table aria-label="simple table">
												<TableHead>
													<TableRow>
														<TableCell>Name</TableCell>
														<TableCell>Dates</TableCell>
														<TableCell>Room no.</TableCell>
														<TableCell>Room type</TableCell>
														<TableCell>Additional Bed</TableCell>
														<TableCell>Status</TableCell>
														<TableCell align="right">Price</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{month.data.map((data, i) => {
														let { booking, room, room_type } = data;
														let { user } = booking;
														return (
															<TableRow key={data.id}>
																<TableCell>{`${user.firstname} ${user.middlename} ${user.lastname}`}</TableCell>
																<TableCell>
																	<MemoMonthComponent from={booking.from_date} to={booking.to_date} />
																</TableCell>
																<TableCell>{room.room_number}</TableCell>
																<TableCell>{room_type.name}</TableCell>
																<TableCell>{data.booking.additional_beds}</TableCell>
																<TableCell>
																	<StatusComponent status={booking.status} />
																</TableCell>
																<TableCell align="right">
																	&#8369;
																	<NumeralComponent additional={data.booking.additional_beds} price={data.price} />
																</TableCell>
															</TableRow>
														);
													})}
												</TableBody>
											</Table>
										</Paper>
									</div>
								);
						})
					)}
				</div>
			</AdminLayout>
		);
	}
}
