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
          <div className="menu py-3">
            <NavLink to="/dashboard/home" activeClassName="menu-active">
                <Dashboard className="menu-fonts"/>
                <Ink/>
            </NavLink>
          </div>
        <div className="menu py-3">
            <NavLink to='/dashboard/transaction' activeClassName="menu-active">
              <AttachMoney className="menu-fonts"/>
              <Ink/>
            </NavLink>
        </div>
        <div className="menu py-3">
            <NavLink to='/dashboard/report' activeClassName="menu-active">
              <MultilineChart className="menu-fonts"/>
              <Ink/>
            </NavLink>
        </div>
      </div>
    )
  }
}
