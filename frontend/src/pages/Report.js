import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    Typography,
    Divider,
    CircularProgress,
    Button,
    LinearProgress
} from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Chart from "chart.js";
import axios from "axios";
import { GET } from "../utils/restUtils";

export default class Report extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            bookingMonth: [],
            monthlyRoomtype: [],
            roomTypes: [],
            selectedRoomType: 0,
            fetchingMonthlyRoomType: false
        };
    }

    daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    componentDidMount() {
        const monthlyBookingRef = this.monthlyBookingRef.getContext("2d");
        const monthlyRoomTypeRef = this.monthlyRoomTypeRef.getContext("2d");

        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        let daysInMonth = this.daysInMonth(month, year);
        let daysInMonthArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysInMonthArray.push(i);
        }
        console.log(daysInMonthArray);

        this.monthlyBooking = new Chart(monthlyBookingRef, {
            type: "line",
            data: {
                //Bring in data
                labels: daysInMonthArray,
                datasets: [
                    {
                        label: "Booking",
                        data: [],
                        backgroundColor: "#3f51b5"
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        this.monthlyRoomType = new Chart(monthlyRoomTypeRef, {
            type: "line",
            data: {
                //Bring in data
                labels: daysInMonthArray,
                datasets: [
                    {
                        data: [],
                        backgroundColor: "#3f51b5"
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
        this.fetchingReports()
            .then(({ data }) => {
                // let { dailyBookings, monthlyBookings, monthlyIncome, yearlyIncome, daysInMonth, monthlyRoomtype}
                this.setState(
                    { ...data, fetching: false, selectedRoomType: 0 },
                    () => {
                        this.monthlyBooking.data.datasets[0].data =
                            data.bookingMonth;
                        this.monthlyBooking.update();
                        this.monthlyRoomType.data.datasets[0].data =
                            data.monthlyRoomtype;
                        this.monthlyRoomType.data.datasets[0].label = this.state.roomTypes[
                            this.state.selectedRoomType
                        ].name;
                        this.monthlyRoomType.update();
                    }
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchingReports = () => {
        return GET("/api/reports");
    };

    handleChange = e => {
        this.setState({ selectedRoomType: e.target.value });
        this.getRoomTypeReport(
            this.state.roomTypes[e.target.value].id,
            this.state.roomTypes[e.target.value].name
        );
    };

    getRoomTypeReport = async (id, name) => {
        try {
            this.setState({ fetchingMonthlyRoomType: true });
            let { data } = await GET(`/api/reports/roomtype/${id}`);
            this.setState({
                fetchingMonthlyRoomType: false,
                monthlyRoomtype: data
            });

            this.monthlyRoomType.data.datasets[0].data = data;
            this.monthlyRoomType.data.datasets[0].label = name;
            this.monthlyRoomType.update();
        } catch (error) {
            this.setState({ fetchingMonthlyRoomType: false });
        }
    };

    render() {
        let {
            fetching,
            dailyBookings,
            monthlyBookings,
            monthlyIncome,
            yearlyIncome
        } = this.state;

        // if (fetching) {
        //     return (
        //         <AdminLayout {...this.props}>
        //             <Typography variant="h5" style={{ marginBottom: 20 }}>
        //                 Reports
        //             </Typography>
        //             <div style={{ width: "100%", textAlign: "center", padding: '20px 0' }}>
        //                 <CircularProgress />
        //             </div>
        //         </AdminLayout>
        //     );
        // }
        return (
            <AdminLayout {...this.props}>
                <Typography variant="h5" style={{ marginBottom: 20 }}>
                    Reports
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #27ae60"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Daily Rooms
                            </Typography>
                            <Typography
                                variant="h4"
                                component="div"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                {dailyBookings}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #3498db"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Monthly Reservation
                            </Typography>
                            <Typography
                                variant="h4"
                                component="div"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                {monthlyBookings}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #e74c3c"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Monthly Income
                            </Typography>
                            <Typography
                                variant="h4"
                                component="div"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                &#8369;{monthlyIncome}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Paper
                            style={{
                                padding: 10,
                                borderLeft: "10px solid #f1c40f"
                            }}
                        >
                            <Typography variant="h5" component="div">
                                Yearly Income
                            </Typography>
                            <Typography
                                variant="h4"
                                component="div"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                &#8369;{yearlyIncome}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                        <Paper
                            style={{
                                padding: 10
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                gutterBottom
                            >
                                Bookings for the month
                            </Typography>
                            <Divider />
                            <div
                                style={{
                                    width: "100%",
                                    minHeight: 400,
                                    position: "relative"
                                }}
                            >
                                <canvas
                                    id="testChart"
                                    ref={el => (this.monthlyBookingRef = el)}
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sm={12}>
                        <Paper
                            style={{
                                padding: 10
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 10,
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant="h5" component="div">
                                    Room type Monthly Bookings
                                </Typography>
                                <FormControl
                                    style={{ minWidth: 150 }}
                                    margin="dense"
                                >
                                    <Select
                                        value={this.state.selectedRoomType}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                        margin="dense"
                                    >
                                        {this.state.roomTypes.map((el, i) => {
                                            return (
                                                <MenuItem value={i} key={el.id}>
                                                    {el.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            {this.state.fetchingMonthlyRoomType && (
                                <LinearProgress style={{ height: 2 }} />
                            )}
                            <Divider />
                            <div
                                style={{
                                    width: "100%",
                                    minHeight: 400,
                                    position: "relative"
                                }}
                            >
                                <canvas
                                    id="testChart"
                                    ref={el => (this.monthlyRoomTypeRef = el)}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </AdminLayout>
        );
    }
}
