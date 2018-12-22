import React, { Component } from 'react'
import './verification.css'
import logo from '../../assets/img/brands/logo.svg'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

export default class index extends Component {
  render() {
    return (
      <div className="verification-session">
        <img src={logo} className="logo" alt="logo"/>
        <h2 className="roboto-light text-dark-smooth mt-3">Congratulation<br/>your account has been Verified</h2>
        <Link to="/login"><Button className="btn btn-primary-rounded mt-2">GO TO LOGIN</Button></Link>
      </div>
    )
  }
}
