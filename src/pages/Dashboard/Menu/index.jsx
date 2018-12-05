import React, { Component } from 'react'
import './menu.css'
import Ink from 'react-ink'
import Dashboard from '@material-ui/icons/Dashboard'
import AttachMoney from '@material-ui/icons/AttachMoney'
import MultilineChart from '@material-ui/icons/MultilineChart'
import {NavLink} from 'react-router-dom'

export default class index extends Component {
  render() {
    return (
      <div className="dashboard-menu">
        <NavLink to="/dashboard" activeClassName="menu-active">
          <div className="menu py-3">
              <Dashboard className="menu-fonts"/>
              <Ink/>
          </div>
        </NavLink>
        <div className="menu py-3">
            <AttachMoney className="menu-fonts"/>
            <Ink/>
        </div>
        <div className="menu py-3">
            <MultilineChart className="menu-fonts"/>
            <Ink/>
        </div>
      </div>
    )
  }
}
