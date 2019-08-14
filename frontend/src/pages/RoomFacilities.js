import React, { Component } from 'react'
import AdminLayout from '../components/AdminLayout'

export default class RoomFacilities extends Component {
  render() {
    return (
      <AdminLayout {...this.props}>
        <h1>Room Facilities Page</h1>
      </AdminLayout>
    )
  }
}
