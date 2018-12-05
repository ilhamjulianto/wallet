import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import loginTop from '../../assets/img/elements/login-top.svg'
import loginBottom from '../../assets/img/elements/login-bottom.svg'
import {FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Ink from 'react-ink'
import WOW from 'wowjs'
import {Link} from 'react-router-dom'

export default class index extends Component {
    state = {
        amount: '',
        username: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      };

      componentDidMount() {
        new WOW.WOW().init();
      }

      handleLogin = (i) => {
          i.preventDefault()

          const data = new FormData()
          data.append('username', this.state.username)
          data.append('password', this.state.password)

          axios.post('https://fast-brushlands-51779.herokuapp.com/api/v1/user/login', data).then(res => {
              console.log(res.data)
          })
      }

      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

      handleChangeLogin = (e) => {
          this.setState({
              [e.target.id] : e.target.value
          })
      }
  render() {
      console.log(this.state)
    return (
      <div className="login-session">
        <img src={loginTop} className="wow slideInDown login-top" alt="login-top"/>
        <img src={loginBottom} className="wow slideInUp login-bottom" alt="login-top" data-wow-delay="0.3s"/>
        <div className="wow slideInUp login-form text-center p-5">
            <h2 className="wow fadeInUp roboto-bold text-light" data-wow-delay="0.9s">Login</h2>
            <p className="wow fadeInUp roboto-light text-light mt-4 mx-3" data-wow-delay="1.2s">Sign In with your account, if you don't have account,
            please Sign Up first.</p>
            <form className="mt-5 mb-4" onSubmit={this.handleLogin}>
                <FormControl className="wow fadeInUp w-75 mt-5" data-wow-delay="1.5s">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                    id="username"
                    onChange={this.handleChangeLogin}
                    required={true}
                    startAdornment={
                        <InputAdornment position="start">
                        <AccountCircle color="disabled" />
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <FormControl className="wow fadeInUp w-75 mt-4" data-wow-delay="1.8s">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChangeLogin}
                            required={true}
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
                {/* <Link to="/dashboard"> */}
                <button type="submit" className="wow fadeInUp btn btn-primary-rounded mt-5" data-wow-delay="2.1s">
                    Login
                    <Ink/>
                </button>
                {/* </Link> */}
                <Link to="/signup"><button className="wow fadeInUp btn btn-secondary-rounded mt-3" data-wow-delay="2.4s">
                    Sign Up
                    <Ink/>
                </button></Link>
            </form>
        </div>
      </div>
    )
  }
}
