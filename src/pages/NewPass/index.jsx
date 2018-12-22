import React, { Component } from 'react'
import './newpass.css'
import newLock from '../../assets/img/icons/create-lock.svg'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, InputAdornment, Tooltip, IconButton, LinearProgress } from '@material-ui/core'
import Mail from '@material-ui/icons/Mail'
import Lock from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import WOW from 'wowjs'
import Ink from 'react-ink'
import axios from 'axios'

export default class index extends Component {
    state = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        showPassword: false,
        showPasswordTwo: false,
        loading: false,
        confirmPass: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/password',
    }

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^&*])=([^&]*)/gi, function(m, key, value) {
            vars[key] = value
        })
        return vars
    }

    getUrlParam(parameter, defaultvalue) {
        var urlparameter = defaultvalue
        if(window.location.href.indexOf(parameter) > -1) {
            urlparameter = this.getUrlVars()[parameter]
        }
        console.log(urlparameter)
    }

    componentDidMount = () => {
        new WOW.WOW().init()
        var token = this.getUrlParam('token', 'Empty')
        console.log(token)
    }

    handleSend = () => {
        this.setState({ loading: true, })

        const { url } = this.state
        let data = new FormData()
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('password_confirmation', this.state.password_confirmation)
        data.append('token', this.state.token)

        axios.post(`${url}/reset`, data)
        .then(res => {
            console.log(res)
            this.setState({ loading: false, })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = prop => (e) => {
        let form = document.forms['myForm']
        let password = form['password']
        let password_confirmation = form['password_confirmation']

        this.setState({ [prop] : e.target.value })

        if(password.value !== password_confirmation.value) {
            this.setState({ confirmPass: 'Please check your password again' })
        } else {
            this.setState({ confirmPass: '', })
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }))
    }

    handleClickShowPasswordTwo = () => {
        this.setState(state => ({ showPasswordTwo: !state.showPasswordTwo }))
    }

    handlePreload = () => {
        this.setState({ loading: true, })
    }
  render() {
      const { email, password, password_confirmation, showPassword, showPasswordTwo, token, loading, confirmPass } = this.state
    if(localStorage.getItem('token') === null) {
    return (
      <div className="create-password">
        <div className="wow fadeInUp forgot-form p-5">
            <h3 className="roboto-semibold text-dark-smooth mb-5">Create new password</h3>
            <img className="img-fluid p-4" src={newLock} alt="lock"/>
            <p className="roboto-regular small mt-1">
                Send your email and create your Password
            </p>
            <form id="myForm" onSubmit={this.handleSend}>
                <FormControl className="w-100 mt-2">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                    id="email"
                    value={email}
                    onChange={this.handleChange('email')}
                    required={true}
                    startAdornment={
                        <InputAdornment position="start">
                        <Mail className="text-blue" />
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <Tooltip title="Password at least must be 6 character">
                    <FormControl className="w-100 mt-3">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            value={password}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required={true}
                            onChange={this.handleChange('password')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Lock className="text-blue" />
                                </InputAdornment>
                            }
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                >
                                {showPassword ? <Visibility className="text-blue" /> : <VisibilityOff className="text-blue" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                </Tooltip>
                <Tooltip title="Password at least must be 6 character">
                    <FormControl className="w-100 mt-3">
                            <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                            <Input
                                value={password_confirmation}
                                id="password_confirmation"
                                type={showPasswordTwo ? 'text' : 'password'}
                                required={true}
                                onChange={this.handleChange('password_confirmation')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Lock className="text-blue" />
                                    </InputAdornment>
                                }
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPasswordTwo}
                                    >
                                    {showPasswordTwo ? <Visibility className="text-blue" /> : <VisibilityOff className="text-blue" />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                    </FormControl>
                </Tooltip>
                <p className="text-danger small mt-2">{confirmPass}</p>
                <FormControl className="w-100 mt-2">
                    <InputLabel htmlFor="token">Token</InputLabel>
                    <Input
                    id="token"
                    value={token}
                    onChange={this.handleChange('token')}
                    required={true}
                    startAdornment={
                        <InputAdornment position="start">
                        <Mail className="text-blue" />
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <button className="btn btn-primary-rounded mt-4" type="submit" onClick={this.handleSend}>
                    SEND
                    <Ink/>
                </button>
            </form>
        </div>

        {/* Preload */}
        <div className={loading === true ? 'display' : 'd-none'}>
          <LinearProgress />
        </div>
        {/* Preload */}

      </div>
    )} else {
       return <Redirect to="/dashboard/home"/>
    }
  }
}
