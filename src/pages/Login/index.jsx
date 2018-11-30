import React, { Component } from 'react'
import './login.css'
import loginTop from '../../assets/img/elements/login-top.svg'
import loginBottom from '../../assets/img/elements/login-bottom.svg'
import {FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import Mail from '@material-ui/icons/Mail'
import Ink from 'react-ink'
import WOW from 'wowjs'
import {Link} from 'react-router-dom'

export default class index extends Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      };

      componentDidMount() {
        new WOW.WOW().init();
      }

      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };
  render() {
    return (
      <div className="login-session">
        <img src={loginTop} className="wow slideInDown slow login-top" alt="login-top"/>
        <img src={loginBottom} className="wow slideInUp slow login-bottom" alt="login-top" data-wow-delay="0.3s"/>
        <div className="wow slideInUp slow login-form text-center p-5">
            <h2 className="wow fadeInUp slow roboto-bold text-light" data-wow-delay="0.9s">Login</h2>
            <p className="wow fadeInUp slow roboto-light text-light mt-4 mx-3" data-wow-delay="1.2s">Sign In with your account, if you don't have account,
            please Sign Up first.</p>
            <form className="mt-5 mb-4" action="">
                <FormControl className="wow fadeInUp slow w-75 mt-5" data-wow-delay="1.5s">
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
                <FormControl className="wow fadeInUp slow w-75 mt-4" data-wow-delay="1.8s">
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
                <Link to="/dashboard">
                <button className="wow fadeInUp slow btn btn-primary-rounded mt-5" data-wow-delay="2.1s">
                    Login
                    <Ink/>
                </button>
                </Link>
                <Link to="/signup"><button className="wow fadeInUp slow btn btn-secondary-rounded mt-3" data-wow-delay="2.4s">
                    Sign Up
                    <Ink/>
                </button></Link>
            </form>
        </div>
      </div>
    )
  }
}
