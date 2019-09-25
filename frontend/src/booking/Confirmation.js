import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
export default class Confirmation extends Component {
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <div>
                    <table border="0" width="40%">
                        <p style={{ fontSize: "25px" }}>Guest Details</p>
                        <tr>
                            <td width="20%">Guest Name</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Birthdate</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Nationality</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Gmail</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Contact Number</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Check-in</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Check-out</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Arrival Time</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Night(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Room(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Adult(s)</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>No. of Children(s)</td>
                            <td width="20%">:</td>
                        </tr>
                    </table>
                </div>
                <div
                    style={{
                        float: "right",
                        marginRight: "100px",
                        width: "40%",
                        marginTop: "-32.6%"
                    }}
                >
                    <table border="0">
                        <p style={{ fontSize: "25px" }}>Charge Summary</p>
                        <tr>
                            <td width="20%">Room Charges</td>
                            <td width="20%">:</td>
                        </tr>
                        <tr>
                            <td>Facilities</td>
                            <td>:</td>
                        </tr>
                        <Divider></Divider>
                        <tr style={{ color: "gold", fontSize: "30px" }}>
                            <td>Full Payment</td>
                            <td>:</td>
                        </tr>
                        <Divider></Divider>
                    </table>
                </div>
                <div
                    style={{
                        paddingRight: "100px",

                        textAlign: "center"
                    }}
                >
                    <br />
                    <br />
                    Thank you for choosing Bluepool Garden.<br></br> For further
                    inquiries you may call (632) 528-3000 or send an email at
                    bluepoolgarden@gmail.com<br></br> You will find the details
                    of your reservation made below.
                    <br />
                </div>
                <div
                    style={{
                        paddingRight: "100px",
                        textAlign: "justify"
                    }}
                >
                    <h1>General Terms & Conditions</h1>
                    <br></br>
                </div>
            </div>
        );
    }
}
