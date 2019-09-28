import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import AdminLayout from "../components/AdminLayout";
import RoomType from "./RoomType";
import Room from "./Room";
import RoomFacilities from "./RoomFacilities";

import { Switch, Route, Redirect } from "react-router-dom";

export default class Property extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabValue: 1
        };
    }

    tabContents = [
        {
            name: "Room Type",
            path: "/property/roomtype",
            component: RoomType
        },
        {
            name: "Rooms",
            path: "/property/room",
            component: Room
        },
        {
            name: "Facilities",
            path: "/property/facilities",
            component: RoomFacilities
        }
    ];

    handleTabChange = (e, tabValue) => this.setState({ tabValue });

    render() {
        return (
            <AdminLayout style={{ padding:"60px 0 0"}} {...this.props}>
                <Paper elevation={1}>
                    <Tabs
                        value={this.props.location.pathname}
                        onChange={(e,value)=>this.props.history.push(value)}
                        aria-label="simple tabs example"
                    >
                        {this.tabContents.map(e => (
                            <Tab label={e.name} value={e.path} key={e.path}/>
                        ))}
                    </Tabs>
                </Paper>
                <div style={{ padding: 24 }}>
                    <Switch>
                        {this.tabContents.map((e, i) => {
                            return (
                                <Route
                                    path={e.path}
                                    exact
                                    component={e.component}
                                    key={e.path}
                                />
                            );
                        })}
                        <Redirect to="/property/roomtype" />
                    </Switch>
                    {/* {this.tabContents[this.state.tabValue]} */}
                </div>
            </AdminLayout>
        );
    }
}
