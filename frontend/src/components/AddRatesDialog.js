import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

//icons
import PersonIcon from "@material-ui/icons/Person";

import axios from "axios";
import makeStyles from "@material-ui/styles/makeStyles";

export default class AddRatesDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: 0,
            sleep: 0,
            breakfast: false,
            fetching: false,
            sleepsLabelWidth: 0
        };
    }

    onEntering= () => {
        if(this.props.edit)
            this.setState({fetching:true})
    }
    

    onClose = get => {
        this.setState({ fetching: true });
        this.props.handleClose();
        if (get) this.props.getRates();
    };

    onEntered = async () => {
        this.setState({ sleepsLabelWidth: this.sleepsInput.offsetWidth });
        let { edit } = this.props;
        if (edit) {
            console.log("entered!");
            let {data} = await axios.get('/api/rate/'+this.props.rateId);
            this.setState({price: data.price, sleep: data.sleep, breakfast: data.breakfast, name: data.name, fetching: false})
        }
    };

    submitRate = async () => {
        try {
            let {sleep, price, breakfast, name} = this.state;
            let rate = {sleep,price,breakfast, name, room_type_id: this.props.id}
            if(this.props.edit){
                rate = {...rate, id: this.props.rateId};
                await axios.put('/api/rate/'+this.props.rateId, rate)
            }else{
                await axios.post(`/api/rate`, rate);
            }
            this.onClose(true);
        } catch (err) {
            console.log(err);
        }
    };

    onChange= (e) => {
        this.setState({[e.target.id]: e.target.value})
    }
    
    onChangeSleepSelect = (e)=> this.setState({sleep: e.target.value})
    onChangeBreakfast = (e)=> this.setState({breakfast: e.target.checked})

    render() {
        let { sleep, price, breakfast, name } = this.state;

        let sleepsMenu = [];
        for (let i = 0; i <= this.props.maxGuest; i++) {
            sleepsMenu.push(<MenuItem value={i} key={i}>{i}</MenuItem>);
        }
        return (
            <Dialog
                onClose={this.onClose}
                onEntered={this.onEntered}
                aria-labelledby="simple-dialog-title"
                open={this.props.open}
                fullWidth
                maxWidth="sm"
                onEntering={this.onEntering}
            >
                <DialogTitle id="simple-dialog-title">
                    Create rate
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill up the form to create a new rate.
                    </DialogContentText>
                    <TextField
                        id="name"
                        value={name}
                        onChange={this.onChange}
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <FormControl variant="outlined" margin="normal" fullWidth>
                        <InputLabel
                            htmlFor="outlined-age-native-simple"
                            ref={el => (this.sleepsInput = el)}
                        >
                            Number of Sleeps
                        </InputLabel>
                        <Select
                            value={sleep}
                            input={
                                <OutlinedInput
                                    id="sleep"
                                    onChange={this.onChangeSleepSelect}
                                    labelWidth={this.state.sleepsLabelWidth}
                                />
                            }
                            SelectDisplayProps={{
                                style: { display: "flex" }
                            }}
                        >
                            {sleepsMenu}
                        </Select>
                    </FormControl>

                    <TextField
                        id="price"
                        value={price}
                        onChange={this.onChange}
                        label="Price per night"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={breakfast}
                                onChange={this.onChangeBreakfast}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="With breakfast"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.submitRate}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
