import React, { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <div style={{ float: 'left'}}>
                        <Sidebar />
                    </div>
                    <div style={{ float: 'right'}}>{this.props.children}</div>
                </div>
                <Footer />
            </div>
        );
    }
}