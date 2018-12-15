import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './dashboard.css'
import Navbar from './Navbar'
import Menu from './Menu'
import Home from './Home'
import Profile from './Profile'
import Transaction from './Transaction'
import Report from './Report'

export default class index extends Component {
  render() {
    if(localStorage.getItem('token') !== null){
    return (
      <BrowserRouter>
      <div className="dashboard">
        <Navbar/>
        <Menu/>
        <div className="background"></div>
        <Switch>
          <Route path='/dashboard/home' component={Home} exact/>
          <Route path='/dashboard/profile' component={Profile}/>
          <Route path='/dashboard/transaction' component={Transaction}/>
          <Route path='/dashboard/report' component={Report}/>
        </Switch>
      </div>
      </BrowserRouter>
    )} else if(localStorage.getItem('token') === null) {
      return(
        <Redirect to='/'/>
      )
    }
  }
}
