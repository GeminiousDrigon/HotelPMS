import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

export default class RateItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adult: 1
        };
    }

    handleSelectChange = e => {
        this.setState({ adult: e.target.value });
    };

    onAddRoom = () => {
        let rate = this.props.rate;
        rate.adult = this.state.adult;
        this.props.onAddRoom(rate);
    };

    render() {
        let { rate, validateCalled } = this.props;

        let sleep = [];
        for (let i = 1; i <= rate.sleep; i++) {
            sleep.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
        }
        return (
            <Grid item xs={12} sm={12} md={4}>
                <Paper
                    style={{
                        marginBottom: 25,
                        padding: 25,
                        margin: 5,
                        minHeight: 225,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            fontWeight: 300
                        }}
                    >
                        {rate.name}
                    </Typography>

                    <div>
                        <FormControl
                            variant="standard"
                            margin="normal"
                            // error={(validateCalled || touched.country) && errors.country ? true : false}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-age-native-simple" ref={el => (this.countryInput = el)}>
                                Adult
                            </InputLabel>
                            <Select
                                name="country"
                                onChange={this.handleSelectChange}
                                value={this.state.adult}
                                SelectDisplayProps={{
                                    style: {
                                        display: "flex"
                                    }
                                }}
                            >
                                {sleep}
                            </Select>
                            {/* <FormHelperText>{(validatedCalled || touched.country) && errors.country ? errors.country : ""}</FormHelperText> */}
                        </FormControl>
                        <Typography
                            variant="subtitle2"
                            style={{
                                fontWeight: 300
                            }}
                        >
                            PHP {rate.price}
                            /night
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{
                                fontWeight: 300
                            }}
                        >
                            Not cancellable
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            style={{
                                fontWeight: 300
                            }}
                        >
                            Not rebookable
                        </Typography>
                        <Button variant="outlined" color="primary" fullWidth onClick={this.onAddRoom}>
                            Add
                        </Button>
                    </div>
                </Paper>
            </Grid>
        );
    }
}
