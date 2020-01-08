import React, { Component } from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import BookingLayout from "../components/BookingLayout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import DatePicker from "../components/DatePicker";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";

import countries from "../country.json";

import cebuana from "../images/cebuana.png";
import bpi from "../images/bpi.png";
import mlhuillier from "../images/mlhuillier.png";
import palawan from "../images/palawan.png";
import { GET } from "../utils/restUtils";
import numeral from "numeral";

const NumeralComponent = React.memo(function Numeral(props) {
  return numeral(props.number).format("0,0.00");
});

export default class GuestInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryWidth: 0,
      user: {},
      fetching: true,
      hasUser: false
    };
  }

  componentDidMount() {
    // let { data } = await GET('/api/user');
    // this.setState({user: data})
    this.getUserDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.countryWidth === 0) {
    // 	this.setState({
    // 		countryWidth: this.countryInput.offsetWidth
    // 	});
    // }
  }

  handleSelectChange = e => {
    this.props.setFieldValue(e.target.name, e.target.value);
  };

  onChangeNumber = e => {
    if (e.target.value.length > 10) {
      this.props.setFieldValue("contactno", e.target.value.substring(0, 10));
    } else {
      this.props.setFieldValue("contactno", e.target.value);
    }
  };

  getUserDetails = async () => {
    try {
      let { data } = await GET(`/api/user`);
      this.setState({ fetching: false, hasUser: true });
      this.props.setFieldValue("honorific", data.honorific);
      this.props.setFieldValue("firstname", data.firstname);
      this.props.setFieldValue("lastname", data.lastname);
      this.props.setFieldValue("middlename", data.middlename);
      this.props.setFieldValue("address", data.address);
      this.props.setFieldValue("contactno", parseInt(data.contactno.substring(3)));
      this.props.setFieldValue("country", data.country);
      this.props.setFieldValue("email", data.email);
      this.props.setFieldValue("confirmEmail", data.email);
      console.log(data);
    } catch (err) {
      this.setState({ fetching: false });
      console.log(err);
    }
  };

  // handleClickOpen = () => {
  //     setOpen(true);
  // };

  // handleClose = () => {
  //     setOpen(false);
  // };
  render() {
    const { values, touched, errors, handleChange, handleBlur, handleSubmit, validateCalled } = this.props;
    if (this.state.fetching)
      return (
        <div style={{ width: "100%", textAlign: "center", marginTop: 20 }}>
          <CircularProgress />
        </div>
      );
    else
      return (
        <Paper style={{ padding: 25 }}>
          <Typography variant="h5" style={{ fontWeight: 300 }} gutterBottom>
            Personal Information
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    error={(validateCalled || touched.honorific) && errors.honorific ? true : false}
                  >
                    <FormLabel component="legend">Honorifics</FormLabel>
                    <RadioGroup
                      value={values.honorific}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <FormControlLabel
                        value="Mr"
                        control={<Radio color="primary" id="honorific" disabled={this.state.hasUser} />}
                        label="Mr"
                        disabled={this.state.hasUser}
                      />
                      <FormControlLabel
                        value="Ms"
                        control={<Radio color="primary" id="honorific" disabled={this.state.hasUser} />}
                        label="Ms"
                        disabled={this.state.hasUser}
                      />
                      <FormControlLabel
                        value="Dr"
                        control={<Radio color="primary" id="honorific" disabled={this.state.hasUser} />}
                        label="Dr"
                        disabled={this.state.hasUser}
                      />
                      <FormControlLabel
                        value="Atty"
                        control={<Radio color="primary" id="honorific" disabled={this.state.hasUser} />}
                        label="Atty"
                        disabled={this.state.hasUser}
                      />
                    </RadioGroup>
                    <FormHelperText>
                      {(validateCalled || touched.honorific) && errors.honorific ? errors.honorific : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="firstname"
                    placeholder="First Name"
                    variant="outlined"
                    label="First name"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.firstname) && errors.firstname ? errors.firstname : ""}
                    error={(validateCalled || touched.firstname) && errors.firstname ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="middlename"
                    placeholder="Middle Name"
                    variant="outlined"
                    label="Middle name"
                    value={values.middlename}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.middlename) && errors.middlename ? errors.middlename : ""}
                    error={(validateCalled || touched.middlename) && errors.middlename ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="lastname"
                    placeholder="Lastname Name"
                    variant="outlined"
                    label="Last name"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.lastname) && errors.lastname ? errors.lastname : ""}
                    error={(validateCalled || touched.lastname) && errors.lastname ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    placeholder="Address"
                    variant="outlined"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.address) && errors.address ? errors.address : ""}
                    error={(validateCalled || touched.address) && errors.address ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    variant="outlined"
                    error={(validateCalled || touched.country) && errors.country ? true : false}
                    fullWidth
                    disabled={this.state.hasUser}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.countryInput = el)}>
                      Country
                    </InputLabel>
                    <Select
                      name="country"
                      onChange={this.handleSelectChange}
                      value={values.country}
                      SelectDisplayProps={{
                        style: {
                          display: "flex"
                        }
                      }}
                      input={<OutlinedInput labelWidth={this.state.countryWidth} />}
                      // disabled={!newGuest}
                    >
                      {countries.map((c, i) => {
                        return (
                          <MenuItem value={c} key={c}>
                            {c}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {(validateCalled || touched.country) && errors.country ? errors.country : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="contactno"
                    placeholder="Contact number"
                    variant="outlined"
                    label="Contact number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+63</InputAdornment>
                    }}
                    value={values.contactno}
                    onChange={this.onChangeNumber}
                    onBlur={handleBlur}
                    type="number"
                    helperText={(validateCalled || touched.contactno) && errors.contactno ? errors.contactno : ""}
                    error={(validateCalled || touched.contactno) && errors.contactno ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="email"
                    placeholder="Gmail address"
                    variant="outlined"
                    label="Gmail address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.email) && errors.email ? errors.email : ""}
                    error={(validateCalled || touched.email) && errors.email ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="confirmEmail"
                    placeholder="Re-type Gmail Address"
                    variant="outlined"
                    label="Re-type Gmail address"
                    value={values.confirmEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={(validateCalled || touched.confirmEmail) && errors.confirmEmail ? errors.confirmEmail : ""}
                    error={(validateCalled || touched.confirmEmail) && errors.confirmEmail ? true : false}
                    disabled={this.state.hasUser}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Paper style={{ padding: "20px", backgroundColor: "#efefef" }}>
                      <Typography style={{ fontSize: "14px" }}>Choose your payment method</Typography>
                      <FormControl>
                        <Select labelId="demo-customized-select-label" id="demo-customized-select">
                          <MenuItem value="asdasdasd">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                      <div>
                        <img src={palawan} style={{ marginRight: "10px" }} width="18%"></img>
                        <img src={cebuana} style={{ marginRight: "10px" }} width="18%"></img>
                        <img src={mlhuillier} style={{ marginRight: "10px" }} width="30%"></img>
                        <img src={bpi} width="10%"></img>
                      </div>

                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        For Cash Padala <br></br>
                        <b>
                          Receiver : Maria Paz Bacareza<br></br>
                          Contact Number: 09217661951<br></br>
                        </b>
                        For your BDO payment method please deposit in the information below:
                        <br></br>
                        <b>
                          Account Number :4382 7881 9012 3456<br></br>
                          Account Name : Maria Paz Bacareza<br></br>
                          <br></br>
                        </b>
                      </Typography>
                      <Typography style={{ fontSize: "16px", fontWeight: 700 }}>Reservation Policies</Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        Take a picture of your Cash Padala or bank deposit and send to Facebook messenger (Maria Paz
                        Bacareza)
                      </Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        You must pay for your advance payment through bank deposit or you may send the payment through Cash
                        Padala. If you cannot pay for your advanced payment two (2) days before your check-in date, your
                        booking will be cancelled or mark no-show .
                      </Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        Advance payment is not necessary if you book for today and your check-in date is tomorrow.
                      </Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        Mark no-show if you do not arrive within 24 hours of the check-in date.
                      </Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        Contact us immediately if you made a mistake in your payment.
                      </Typography>
                      <Typography style={{ fontSize: "14px", fontWeight: 400 }}>
                        <FiberManualRecordIcon style={{ fontSize: "small" }} />
                        Full prepayment is required to confirm your reservation. This is nonrefundable.
                      </Typography>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 20
                }}
              >
                <Paper
                  style={{
                    padding: 25,
                    backgroundColor: "#3c3b3b",
                    color: "white"
                  }}
                >
                  <div style={{ marginBottom: 25 }}>
                    <Typography variant="h6" style={{ fontWeight: 300 }} gutterBottom>
                      Booking Dates
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: 50,
                        color: "gold"
                      }}
                    >
                      Check-in Date:
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 300 }} align="center">
                      {moment(values.checkInDate).format("MMMM DD,  YYYY")}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: 50,
                        color: "gold"
                      }}
                    >
                      Check-out Date:
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 300 }} align="center">
                      {moment(values.checkOutDate).format("MMMM DD,  YYYY")}
                    </Typography>
                  </div>
                  <div style={{ marginBottom: 25 }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 2,
                        maxWidth: 400
                      }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 300 }}>
                        Rooms Selected
                      </Typography>
                      {/* <Tooltip title="Reset">
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={this.handleReset}
                                                >
                                                    <Icon fontSize="small">
                                                        refresh
                                                    </Icon>
                                                </IconButton>
                                            </Tooltip> */}
                    </div>
                    {values.selectedRooms.length > 0 ? (
                      <>
                        {values.selectedRooms.map((room, i) => (
                          <Paper
                            style={{
                              marginBottom: "5px",
                              padding: 15,
                              display: "flex",
                              flexDirection: "column"
                            }}
                          >
                            <div>
                              <Typography
                                variant="h5"
                                style={{
                                  fontWeight: 300
                                }}
                              >
                                {room.name}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                style={{
                                  fontWeight: 300
                                }}
                              >
                                {room.rate.adult} Adult(s)
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                style={{
                                  fontWeight: 300
                                }}
                              >
                                {room.rate.name}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                style={{
                                  fontWeight: 300
                                }}
                              >
                                Price: &#8369;
                                {/* {room.rate.price} */}
                                <NumeralComponent number={room.rate.price} />
                              </Typography>
                            </div>
                          </Paper>
                        ))}
                      </>
                    ) : (
                      <div style={{ margin: "25px 0" }}>
                        <Typography
                          variant="h6"
                          style={{
                            fontWeight: 50,
                            color: "#E6E6E6",
                            textAlign: "center"
                          }}
                        >
                          No room selected
                        </Typography>
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: 50,
                        color: "gold"
                      }}
                    >
                      Total Charge
                    </Typography>
                    <Typography variant="h6" style={{ fontWeight: 300 }}>
                      &#8369;
                      <NumeralComponent number={this.props.totalCharge} />
                    </Typography>
                  </div>
                </Paper>
              </div>
            </Grid>
          </Grid>

          {/* <div style={{ marginTop: 25 }}>
                    <Typography
                        variant="h4"
                        style={{ fontWeight: 300 }}
                        component="div"
                        gutterBottom
                    >
                        Save my information &amp; register
                    </Typography>
                    <FormControl component="fieldset">
                        <FormGroup
                            value={values.honorific}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="newAccount"
                                        color="primary"
                                        id="newAccount"
                                    />
                                }
                                label="I agree to create my guest profile to be used for future reservations."
                            />
                        </FormGroup>
                        <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                </div> */}
        </Paper>
      );
  }
}
