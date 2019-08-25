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
                    </table>
                </div>
                <div style={{ paddingRight: "100px" }}>
                    <br />
                    <br />
                    Thank you for choosing Bluepool Garden. For further
                    inquiries you may call (632) 528-3000 or send an email at
                    bluepoolgarden@gmail.com You will find the details of your
                    reservation made below.
                    <br />
                    General Terms & Conditions Scope of Terms These terms govern
                    all reservations made through the Diamond Hotel Philippines'
                    reservation system. Acceptance You accept these terms on
                    behalf of all members of your party. Confirmed Reservation
                    The reservation is considered confirmed when you received a
                    Confirmation Letter containing your Transaction ID. Please
                    save and/or print this for your record and present it to the
                    hotel upon check-in. If you have any questions and/or
                    concerns regarding the confirmation of your reservation
                    (e.g. Confirmation Letter not received), kindly send an
                    email to reservations@diamondhotel.com. Check-in Policy The
                    guest is required to present the actual card used in making
                    the online booking and a valid government issued ID,
                    preferably passport, upon check-in. If the online booking is
                    for another person and card owner will not be present during
                    check-in, the actual guest is required to present clear
                    photocopies of front and back of the credit card used, a
                    valid government issued ID of cardholder, preferably
                    passport copy, and an authorization letter stating that the
                    card holder has allowed the actual guest to use his/her card
                    for the reservation. We regret to inform you that failure to
                    present above-mentioned requirements, online payment becomes
                    invalid and guest will be asked to settle payment on
                    personal account. The hotel reserves the right to refuse the
                    guest to check-in for failure to comply with this
                    requirement. Check-in Time: 14:00H Check-out Time: 12:00H
                    Deposit Policy for Incidental Charges A credit card
                    guarantee or cash deposit for incidental charges computed
                    according to the total number of nights will be requested
                    upon check-in. This is refundable upon check-out if you do
                    not incur any incidental charges. Cancellation Terms All
                    bookings, once a Confirmation Letter is generated and sent
                    by the system, regardless of actual receipt of the same are
                    considered guaranteed and payments are non-refundable.
                    Diamond Hotel Philippines reserves the right to charge your
                    credit card for cancellation and no-show fees in accordance
                    with the stated policies. Cancelling your reservation is
                    permanent and could result to cancellation fees. No-Show
                    Terms In the event that you do not check-in before the time
                    specified in the Cancellation and No-Show Policies section,
                    you will be qualified as a "No-Show". Appropriate fees, as
                    per Cancellation and No Show Policies section, will be
                    collected. Child Policy: Room can accommodate up to 2 kids.
                    12 years old and below may stay in the room for free
                    using/sharing existing bed and excluding breakfast. Adult
                    ages 13 and above has additional extra bed rate at Php 2,000
                    room only while Php 2,500 with breakfast for Deluxe, Deluxe
                    Regency, Premier, Premier Regency and Executive Suite; Php
                    4,500 with breakfast for Diamond Club rooms. Children ages
                    7-12 years old will be subject to 50% additional charge for
                    the buffet breakfast at Php 790 nett per child, payable upon
                    check-in. This additional fee is not calculated
                    automatically in the total cost and will have to paid
                    separately upon check-in. Children ages 6 and below are free
                    of charge. Dress Code Policy The hotel appreciates the
                    observance of our smart casual dress code while dining at
                    the restaurant outlets and the Club Lounge. Bathrobes,
                    bedroom slippers, flip-flops, swimwear, beachwear and
                    sleeveless and undershirts are not appropriate for the
                    dining experience and ambiance we have created for you.
                    Responsibility of the Hotel Accommodation services are
                    provided by Diamond Hotel Philippines. Governing Law Your
                    online reservation is governed by the laws of the Republic
                    of the Philippines and is subject to the exclusive
                    jurisdiction of its courts. The reservation confirmation (if
                    any) and these terms represent the entire agreement between
                    you and Diamond Hotel Philippines. Privacy Policy Any
                    information collected to secure a reservation is used solely
                    for purposes of that specific reservation. At Diamond Hotel
                    Philippines, we take your privacy seriously. If you have any
                    questions and/or concerns regarding our privacy policy,
                    kindly write to us at reservations@diamondhotel.com. To
                    modify or cancel your booking, please call our Reservations
                    Department directly. (632) 528-3000 or email
                    guestservices@diamondhotel.com
                </div>
            </div>
        );
    }
}
