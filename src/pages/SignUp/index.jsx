import React, { Component } from 'react'
import './signUp.css'
import signupTop from '../../assets/img/elements/signup-top.svg'
import signupBottom from '../../assets/img/elements/signup-bottom.svg'
import {FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import Mail from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Ink from 'react-ink'
import {Link} from 'react-router-dom'
import WOW from 'wowjs'

export default class index extends Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      };

      componentDidMount() {
        new WOW.WOW().init()
      }

      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };
  render() {
    return (
      <div className="signup-session">
        <img src={signupTop} className="wow slideInDown signup-top" alt="signup-top"/>
        <img src={signupBottom} className="wow slideInUp signup-bottom" alt="signup-bottom" data-wow-delay="0.3s"/>
        <div className="wow fadeInUp slow signup-form text-center p-5" data-wow-delay="0.9s">
            <h2 className="wow fadeInUp slow roboto-bold text-light" data-wow-delay="1.2s">Sign Up</h2>
            <p className="wow slideInUp slow roboto-light text-light mt-4 mx-3" data-wow-delay="1.5s">Here you can fill the form and create your own
            account. If you have account, Click the
            Sign In button.</p>
            <form className="mt-5 mb-4" action="">
                <FormControl className="wow fadeInUp slow w-75 mt-5" data-wow-delay="1.8s">
                            <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                            <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <AccountCircle color="disabled" />
                                </InputAdornment>
                            }
                            />
                </FormControl>
                <FormControl className="wow fadeInUp slow w-75 mt-4" data-wow-delay="2.1s">
                        <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                            <Mail color="disabled" />
                            </InputAdornment>
                        }
                        />
                </FormControl>
                <FormControl className="wow fadeInUp slow w-75 mt-4" data-wow-delay="2.4s">
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            startAdornment={
                                  <InputAdornment position="start">
                                    <Lock color="disabled" />
                                  </InputAdornment>
                            }
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                >
                                {this.state.showPassword ? <Visibility color="disabled" /> : <VisibilityOff color="disabled" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
                <br/>
                <button className="wow fadeInUp slow btn btn-primary-rounded mt-5" data-wow-delay="0.3s">
                    Sign Up
                    <Ink/>
                </button>
                <Link to="/login"><button className="wow fadeInUp slow btn btn-secondary-rounded mt-3" data-wow-delay="0.6s">
                    Login
                    <Ink/>
                </button></Link>
            </form>
        </div>
      </div>
    )
  }
}
