import React, { Component } from 'react'
import AdminLayout from '../components/AdminLayout'

export default class Walkin extends Component {
  render() {
    return (
      <AdminLayout {...this.props}>
        <h1>Walk-in Page</h1>
      </AdminLayout>
    )
  }
}
