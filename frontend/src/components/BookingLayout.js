import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1
    },

    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}));

export default function BookingLayout(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";

    return (
        <div
            className={classes.grow}
            style={{
                height: "10%",
                backgroundColor: "#DCDCDC"
            }}
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        style={{ paddingLeft: "75px" }}
                        noWrap
                    >
                        Bluepool Garden
                    </Typography>

                    <div className={classes.grow} />
                    <div
                        className={classes.sectionDesktop}
                        style={{ paddingRight: "50px" }}
                    >
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>{props.children}</main>
            {renderMenu}
            <div
                style={{
                    paddingRight: "100px",
                    paddingLeft: "100px",
                    textAlign: "center"
                }}
            >
                <br />
                <br />
                Thank you for choosing Bluepool Garden.<br></br> For further
                inquiries you may call (632) 528-3000 or send an email at
                bluepoolgarden@gmail.com<br></br> You will find the details of
                your reservation made below.
                <br />
            </div>
            <div
                style={{
                    paddingRight: "100px",
                    paddingLeft: "100px"
                }}
            >
                <h1>General Terms & Conditions</h1>
                <br></br> Scope of Terms These terms govern all reservations
                made through the Diamond Hotel Philippines' reservation system.
                Acceptance You accept these terms on behalf of all members of
                your party. Confirmed Reservation The reservation is considered
                confirmed when you received a Confirmation Letter containing
                your Transaction ID. Please save and/or print this for your
                record and present it to the hotel upon check-in. If you have
                any questions and/or concerns regarding the confirmation of your
                reservation (e.g. Confirmation Letter not received), kindly send
                an email to reservations@diamondhotel.com. Check-in Policy The
                guest is required to present the actual card used in making the
                online booking and a valid government issued ID, preferably
                passport, upon check-in. If the online booking is for another
                person and card owner will not be present during check-in, the
                actual guest is required to present clear photocopies of front
                and back of the credit card used, a valid government issued ID
                of cardholder, preferably passport copy, and an authorization
                letter stating that the card holder has allowed the actual guest
                to use his/her card for the reservation. We regret to inform you
                that failure to present above-mentioned requirements, online
                payment becomes invalid and guest will be asked to settle
                payment on personal account. The hotel reserves the right to
                refuse the guest to check-in for failure to comply with this
                requirement. Check-in Time: 14:00H Check-out Time: 12:00H
                Deposit Policy for Incidental Charges A credit card guarantee or
                cash deposit for incidental charges computed according to the
                total number of nights will be requested upon check-in. This is
                refundable upon check-out if you do not incur any incidental
                charges. Cancellation Terms All bookings, once a Confirmation
                Letter is generated and sent by the system, regardless of actual
                receipt of the same are considered guaranteed and payments are
                non-refundable. Diamond Hotel Philippines reserves the right to
                charge your credit card for cancellation and no-show fees in
                accordance with the stated policies. Cancelling your reservation
                is permanent and could result to cancellation fees. No-Show
                Terms In the event that you do not check-in before the time
                specified in the Cancellation and No-Show Policies section, you
                will be qualified as a "No-Show". Appropriate fees, as per
                Cancellation and No Show Policies section, will be collected.
                Child Policy: Room can accommodate up to 2 kids. 12 years old
                and below may stay in the room for free using/sharing existing
                bed and excluding breakfast. Adult ages 13 and above has
                additional extra bed rate at Php 2,000 room only while Php 2,500
                with breakfast for Deluxe, Deluxe Regency, Premier, Premier
                Regency and Executive Suite; Php 4,500 with breakfast for
                Diamond Club rooms. Children ages 7-12 years old will be subject
                to 50% additional charge for the buffet breakfast at Php 790
                nett per child, payable upon check-in. This additional fee is
                not calculated automatically in the total cost and will have to
                paid separately upon check-in. Children ages 6 and below are
                free of charge. Dress Code Policy The hotel appreciates the
                observance of our smart casual dress code while dining at the
                restaurant outlets and the Club Lounge. Bathrobes, bedroom
                slippers, flip-flops, swimwear, beachwear and sleeveless and
                undershirts are not appropriate for the dining experience and
                ambiance we have created for you. Responsibility of the Hotel
                Accommodation services are provided by Diamond Hotel
                Philippines. Governing Law Your online reservation is governed
                by the laws of the Republic of the Philippines and is subject to
                the exclusive jurisdiction of its courts. The reservation
                confirmation (if any) and these terms represent the entire
                agreement between you and Diamond Hotel Philippines. Privacy
                Policy Any information collected to secure a reservation is used
                solely for purposes of that specific reservation. At Diamond
                Hotel Philippines, we take your privacy seriously. If you have
                any questions and/or concerns regarding our privacy policy,
                kindly write to us at reservations@diamondhotel.com. To modify
                or cancel your booking, please call our Reservations Department
                directly. (632) 528-3000 or email guestservices@diamondhotel.com
            </div>
        </div>
    );
}
