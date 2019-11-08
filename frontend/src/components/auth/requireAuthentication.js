import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import { GET, POST, PUT, DELETE } from "../../utils/restUtils";

export default function requireAuthentication(Component, role) {
    return class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                fetching: true,
                user: {}
            };
        }

        componentDidMount() {
            this.checkAuth();
        }

        checkAuth = async () => {
            try {
                let { data } = await GET("/api/user");
                if (role === data.role) {
                    this.setState({ fetching: false, user: data });
                }
            } catch (err) {
                this.props.history.push("/sign-in");
            }
        };

        render() {
            if (this.state.fetching)
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            margin: "50px 0"
                        }}
                    >
                        <CircularProgress />
                    </div>
                );
            else return <Component {...this.props} user={this.state.user} />;
        }
    };
}
