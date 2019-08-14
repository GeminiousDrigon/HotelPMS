import React, { Component } from 'react'
import AdminLayout from '../components/AdminLayout'

export default class Room extends Component {
  render() {
    return (
      <AdminLayout {...this.props}>
        <h1>Room Page</h1>
      </AdminLayout>
    )
  }
}
