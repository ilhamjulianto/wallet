import React, { Component } from 'react'
import './forgot.css'
import lock from '../../assets/img/icons/open-lock.svg'
import axios from 'axios'
import { FormControl, Input, InputLabel, InputAdornment } from '@material-ui/core'
import Mail from '@material-ui/icons/Mail'
import Ink from 'react-ink'
import WOW from 'wowjs'

export default class index extends Component {
    state = {
        email: '',
    }

    componentDidMount = () => {
        new WOW.WOW().init()
    }

    handleChange = prop => (e) => {
        this.setState({
            [prop] : e.target.value,
        })
    }

    handleSend = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append('email', this.state.email)
        axios.post('https://api-simplewallet-v1.herokuapp.com/api/password/create', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
  render() {
      console.log(this.state)
    return (
      <div className="forgot-password">
        <div className="wow fadeInUp forgot-form p-5">
            <h3 className="roboto-semibold text-dark-smooth mb-5">Forgot your password?</h3>
            <img className="img-fluid p-4" src={lock} alt="lock"/>
            <p className="roboto-regular small mt-1">
                Don't worry, just enter your email address and we'll set you up with a new password. You can change it after this.
            </p>
            <FormControl className="w-100 mt-2">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                id="email"
                onChange={this.handleChange('email')}
                required={true}
                startAdornment={
                    <InputAdornment position="start">
                    <Mail className="text-blue" />
                    </InputAdornment>
                }
                />
            </FormControl>
            <button className="btn btn-primary-rounded mt-4" onClick={this.handleSend}>
                SEND
                <Ink/>
            </button>
        </div>
      </div>
    )
  }
}
