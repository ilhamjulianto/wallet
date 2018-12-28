import React, { Component } from 'react'
import Home from './home'
import About from './About'
import OurTeam from './OurTeam'
import WOW from 'wowjs'
import { Redirect } from 'react-router-dom'

export default class index extends Component {
    componentDidMount() {
        new WOW.WOW().init()
      }
  render() {
    if(localStorage.getItem('token') === null) {
    return (
      <div>
        <Home/>
        <About/>
        <OurTeam/>
      </div>
    )} else {
      return(
      <Redirect to='/dashboard/home'/>
      )
    }
  }
}
