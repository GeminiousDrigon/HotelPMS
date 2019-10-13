import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//icons
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import GuestInfoItem from "./GuestInfoItem.js";
import { CircularProgress } from "@material-ui/core";

import axios from "axios";

export default class GuestInfo extends Component {
    constructor(props) {
        super(props);
        let guests;
        if (props.guests.length > 0) {
            guests = props.guests;
        } else {
            guests = [
                {
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    address: "",
                    email: "",
                    contactno: "",
                    country: ""
                }
            ];
        }

        this.state = {
            guests: guests,
            selectedGuest: 0,
            fetching: props.guests.length > 0 ? true : false,
            guest: {
                firstname: "",
                middlename: "",
                lastname: "",
                address: "",
                email: "",
                contactno: "",
                country: ""
            }
        };
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.selectedRoom === this.props.id) {
    //         if (this.props.guests.length > 0) {
    //             // console.log("getting " + this.props.guests[0].id);
    //             if (prevProps.selectedRoom !== this.props.selectedRoom) {
    //                 // console.log("get guest");
    //                 let { id } = this.props.guests[this.state.selectedGuest];
    //                 this.getGuest(id);
    //             }
    //         }
    //     } else {
    //         if (!this.state.fetching) {
    //             this.setState({
    //                 fetching: true
    //             });
    //         }
    //     }
    // }

    onAddGuest = () => {
        let { guests } = this.state;
        guests = guests.concat({
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            email: "",
            contactno: "",
            country: ""
        });
        this.setState({ guests });
    };

    // getGuest = async id => {
    //     try {
    //         let { fetching } = this.state;
    //         if (!fetching) this.setState({ fetching: true });
    //         let { data } = await axios.get("/api/guest/" + id);
    //         this.setState({ guest: { ...data }, fetching: false });
    //     } catch (err) {
    //         this.setState({ fetching: false });
    //         console.log(err);
    //     }
    // };

    onSelectGuest = selectedGuest => {
        this.setState({ selectedGuest });
    };

    render() {
        let { guests, fetching } = this.state;
        let content = this.state.guests.map((guest, el) => {
            return (
                <GuestInfoItem
                    guest={guest}
                    getGuest={this.getGuest}
                    key={guest.id ? guest.id : el}
                    show={el === this.state.selectedGuest && this.props.id === this.props.selectedRoom}
                    roomId={this.props.id}
                />
            );
        });
        return (
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {guests.map((guest, i) => {
                        return (
                            <Button
                                variant="text"
                                color={i === this.state.selectedGuest ? "primary" : "default"}
                                onClick={() => this.onSelectGuest(i)}
                                key={guest.id ? guest.id : i}
                            >
                                <PersonIcon />
                                {i + 1}
                            </Button>
                        );
                    })}
                    <Button variant="text" color="primary" onClick={this.onAddGuest}>
                        <PersonAddIcon />
                    </Button>
                </div>
                {content}
            </div>
        );
    }
}
