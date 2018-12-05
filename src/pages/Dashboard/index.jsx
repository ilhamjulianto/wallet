import React, { Component } from 'react'
import './dashboard.css'
import Navbar from './Navbar'
import Menu from './Menu'
import Home from './Home'

export default class index extends Component {
  render() {
    return (
      <div id="dashboard">
        <Navbar/>
        <Menu/>
        <Home/>
      </div>
    )
  }
}
