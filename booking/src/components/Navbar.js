import React, { Component } from "react";

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: "green"
                    }}
                />
                {this.props.children}
                <div style={{ width: '100%'}}>

                </div>
            </div>
        );
    }
}
