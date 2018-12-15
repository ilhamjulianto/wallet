import React, { Component } from 'react'
import './login.css'
import axios from 'axios'
import loginTop from '../../assets/img/elements/login-top.svg'
import loginBottom from '../../assets/img/elements/login-bottom.svg'
import {FormControl, InputLabel, Input, InputAdornment, IconButton, Slide, Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import Mail from '@material-ui/icons/Mail'
import Ink from 'react-ink'
import WOW from 'wowjs'
import { Link , Redirect} from 'react-router-dom'
import { css } from 'react-emotion'
import { HashLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { logIn } from '../_actions'


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const override = css`
    position: relative;
    left: 50%;
    margin-top: 10px;
    margin-left: -50px;
`

class index extends Component {
    state = {
        data: undefined,
        amount: '',
        email: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        open: false,
        openFail: false,
        loading: true,
        disabled: true,
      };

      componentDidMount() {
        new WOW.WOW().init();
      }

      handleLogin = (i) => {
          i.preventDefault()

          const data = new FormData()
          data.append('email', this.state.email)
          data.append('password', this.state.password)

          axios.post('https://api-v1-superwallet.herokuapp.com/api/v1/user/login', data).then(res => {
              console.log(res.data)
              localStorage.setItem('token', res.data.token)
              this.setState({
                  data: res.data,
                  openFail: false,
              })
              this.props.logIn(res.data.token)
          }).catch((err) => {
              this.setState({
                  openFail: true,
                  open: false,
              })
          })
      }

      handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

      handleChangeLogin = (e) => {
          const {password} = this.state
          this.setState({
              [e.target.id] : e.target.value
          })

              if(password.length < 5) {
                this.setState({
                    disabled: true,
                })
            } else {
                this.setState({
                    disabled: false,
                })
            }
          }

      closeModal = () => {
        this.setState({
            open: false,
        })
      }

      open = () => {
        this.setState({
            open: true
        })
      }

      closeFail = () => {
        this.setState({
            openFail: false,
        })
      }
  render() {
      console.log(this.state)
    if(localStorage.getItem('token') === null) {
    return (
      <div className="login-session">
        <img src={loginTop} className="wow slideInDown login-top" alt="login-top"/>
        <img src={loginBottom} className="wow slideInUp login-bottom" alt="login-top" data-wow-delay="0.3s"/>
        <div className="wow slideInUp login-form text-center p-md-5 p-xs-3">
            <h2 className="wow fadeInUp roboto-bold text-light" data-wow-delay="0.9s">Login</h2>
            <p className="wow fadeInUp roboto-light text-light mt-4 mx-3" data-wow-delay="1.2s">Sign In with your account, if you don't have account,
            please Sign Up first.</p>
            <form className="mt-5 mb-4" onSubmit={this.handleLogin}>
                <FormControl className="wow fadeInUp w-75 mt-5" data-wow-delay="1.5s">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                    id="email"
                    onChange={this.handleChangeLogin}
                    required={true}
                    startAdornment={
                        <InputAdornment position="start">
                        <Mail color="disabled" />
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
                <button disabled={this.state.disabled} type="submit" className="wow fadeInUp btn btn-primary-rounded mt-5" data-wow-delay="2.1s" onClick={this.open}>
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

        {/* On Submit */}
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Please wait<br/>your account is in process
            </DialogTitle>
            <DialogContent>
                <div className="sweet-loading">
                    <HashLoader
                        className={override}
                        sizeUnit={"px"}
                        size={100}
                        color={"#1eb8fb"}
                        loading={this.state.loading}
                    />
                </div>
            </DialogContent>
            </Dialog>
        {/* /On Submit */}

        {/* If Failed */}
        <Dialog
            open={this.state.openFail}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Error!<br/>Check your email and username
            </DialogTitle>
            <DialogContent>
                <div className="sweet-loading">
                    <HashLoader
                        className={override}
                        sizeUnit={"px"}
                        size={100}
                        color={"#1eb8fb"}
                        loading={this.state.loading}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="mx-auto" onClick={this.closeFail}>
                Try Login again
                </Button>
            </DialogActions>
            </Dialog>
        {/* /If Failed */}

      </div>
    )} else if(localStorage.getItem('token') !== null) {
        return(
            <Redirect to='/dashboard/home'/>
        )
    }
  }
}


export default connect(null, {logIn})(index);