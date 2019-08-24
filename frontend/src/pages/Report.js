import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";

export default class Report extends Component {
    render() {
        return (
            <AdminLayout {...this.props}>
                <h1>Settings Page</h1>
            </AdminLayout>
        );
    }
}
