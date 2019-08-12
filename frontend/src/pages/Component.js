import React, { Component } from "react";
import AdminLayout, { number } from "../components/AdminLayout";

export default class TestComponent extends Component {
  

    render() {
        return (
            <AdminLayout>
                <div class="col-md-4 col-sm-4">
                    <h2 class="ser-title">Our Service</h2>
                    <hr class="botm-line" />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris cillum.
                    </p>
                </div>
            </AdminLayout>
        );
    }
}
