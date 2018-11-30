import React, { Component } from 'react'
import Home from './home'
import About from './About'
import WOW from 'wowjs'

export default class index extends Component {
    componentDidMount() {
        new WOW.WOW().init()
      }
  render() {
    return (
      <div>
        <Home/>
        <About/>
      </div>
    )
  }
}
