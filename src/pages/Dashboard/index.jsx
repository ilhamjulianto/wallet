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
  // componentDidMount = () => {

  //     var lastclear = localStorage.getItem('lastclear'),
  //         time_now  = (new Date()).getTime();

  //     // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
  //     if ((time_now - lastclear) > 1000 * 40) {

  //       localStorage.removeItem('token')

  //       localStorage.setItem('lastclear', time_now)
        
  //       window.location.reload()
  //     }
  // }
  
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
