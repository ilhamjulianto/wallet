import React, { Component } from 'react'
import './newpass.css'
import newLock from '../../assets/img/icons/create-lock.svg'
import { FormControl, Input, InputLabel, InputAdornment, Tooltip, IconButton } from '@material-ui/core'
import Mail from '@material-ui/icons/Mail'
import Lock from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import WOW from 'wowjs'
import Ink from 'react-ink'

export default class index extends Component {
    state = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        showPassword: false,
    }

    componentDidMount = () => {
        new WOW.WOW().init()
    }

    handleChange = prop => (e) => {
        this.setState({
            [prop] : e.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };
  render() {
      const { email, password, password_confirmation, showPassword, token } = this.state
    return (
      <div className="create-password">
        <div className="wow fadeInUp forgot-form p-5">
            <h3 className="roboto-semibold text-dark-smooth mb-5">Create new password</h3>
            <img className="img-fluid p-4" src={newLock} alt="lock"/>
            <p className="roboto-regular small mt-1">
                Send your email and create your Password
            </p>
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
                            type={showPassword ? 'text' : 'password'}
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
                                onClick={this.handleClickShowPassword}
                                >
                                {showPassword ? <Visibility className="text-blue" /> : <VisibilityOff className="text-blue" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
            </Tooltip>
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
            <button className="btn btn-primary-rounded mt-4" onClick={this.handleSend}>
                SEND
                <Ink/>
            </button>
        </div>
      </div>
    )
  }
}
