import React, { Component } from 'react'
import './signUp.css'
import signupTop from '../../assets/img/elements/signup-top.svg'
import signupBottom from '../../assets/img/elements/signup-bottom.svg'
import { Link } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton  } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import Mail from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Ink from 'react-ink'
import WOW from 'wowjs'
import axios from 'axios'
import { Slide, Dialog, DialogActions, DialogContent, DialogTitle, Button, Tooltip } from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import { css } from 'react-emotion'
import { HashLoader } from 'react-spinners'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const override = css`
    position: relative;
    left: 50%;
    margin-top: 10px;
    margin-left: -50px;
`

export default class index extends Component {
    state = {
        data: undefined,
        amount: '',
        showPassword: false,
        username: '',
        email: '',
        password: '',
        open: false,
        openSuc: false,
        openFail: false,
        loading: true,
        disabled: true,
        passwordAlert: 'Password at least must be 6 characters',
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

      handleOnChangeRegister = (e) => {        
          this.setState({
              [e.target.id] : e.target.value
          })

          var {username, email, password} = this.state

          if(username !== '') {
              if(email !== '') {
                  if(password.length >= 6) {
                      this.setState({
                          disabled: false
                      })
                  } else {
                    this.setState({
                        disabled: true
                    })
                }
              } else {
                this.setState({
                    disabled: true
                })
            }
          } else {
              this.setState({
                  disabled: true
              })
          }
      }

    //   avoidSpace = (e) => {
    //     var k = e ? e.which : window.e.keyCode;
    //     if (k === '32') return false;
    //   }

      handleSubmit = (i) => {
        i.preventDefault()

        const register = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }
        console.log(register)

        const data = new FormData()
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('password', this.state.password)

        axios.post('https://fast-brushlands-51779.herokuapp.com/api/v1/user/register', data).then((res) => {
            this.setState({
                openSuc: true,
                openFail: false,
                open: false,
            })
            console.log(res)
        }).catch((err) => {
            this.setState({
                openSuc: false,
                openFail: true,
                open: false,
            })
        })
      }

      closeModal = () => {
          this.setState({
              open: false,
          })
      }

      closeFail = () => {
          this.setState({
              openFail: false,
          })
      }

      closeSuc = () => {
          this.setState({
              openSuc: false,
          })
      }

      open = () => {
          this.setState({
              open: true
          })
      }
  render() {
      console.log(this.state)
    return (
      <div className="signup-session">
        <img src={signupTop} className="wow slideInDown signup-top" alt="signup-top"/>
        <img src={signupBottom} className="wow slideInUp signup-bottom" alt="signup-bottom" data-wow-delay="0.3s"/>
        <div className="wow fadeInUp signup-form text-center p-5" data-wow-delay="0.9s">
            <h2 className="wow fadeInUp roboto-bold text-light" data-wow-delay="1.2s">Sign Up</h2>
            <p className="wow slideInUp roboto-light text-light mt-4 mx-3" data-wow-delay="1.5s">Here you can fill the form and create your own
            account. If you have account, Click the
            Sign In button.</p>

            {/* Form */}
            <form className="mt-5 mb-4" onSubmit={this.handleSubmit}>
                <FormControl className="wow fadeInUp w-75 mt-5" data-wow-delay="1.8s">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                            id="username"
                            required={true}
                            startAdornment={
                                <InputAdornment position="start">
                                <AccountCircle color="disabled" />
                                </InputAdornment>
                            }
                            onChange={this.handleOnChangeRegister}
                            onKeyPress={this.avoidSpace}
                            />
                </FormControl>
                <FormControl className="wow fadeInUp w-75 mt-4" data-wow-delay="2.1s">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                        id="email"
                        required={true}
                        startAdornment={
                            <InputAdornment position="start">
                            <Mail color="disabled" />
                            </InputAdornment>
                        }
                        onChange={this.handleOnChangeRegister}
                        />
                </FormControl>
                <Tooltip title={this.state.passwordAlert}>
                <FormControl className="wow fadeInUp w-75 mt-4" data-wow-delay="2.4s">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            required={true}
                            onChange={this.handleOnChangeRegister}
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
                </Tooltip>
                <br/>
                <Tooltip title={ this.state.disabled === true ? "You must fill all Form first" : ''}>
                    <button id="btn-signup" disabled={this.state.disabled} type="submit" className="wow fadeInUp btn btn-primary-rounded mt-5" data-wow-delay="0.3s" onClick={this.open}>
                        Sign Up
                        <Ink/>
                    </button>
                </Tooltip>
                <Link to="/login"><button className="wow fadeInUp btn btn-secondary-rounded mt-3" data-wow-delay="0.6s">
                    Login
                    <Ink/>
                </button></Link>
            </form>
            {/* Form */}

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
                {"Please wait, your account is in process"}
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
        
        {/* If Success */}
            <Dialog
            open={this.state.openSuc}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                {"Your account has been created!"}
            </DialogTitle>
            <DialogContent>
                <div className="success-icon">
                    <Done/>
                </div>
            </DialogContent>
            <DialogActions className="mx-auto">
                <Link to="/login">
                    <Button onClick={this.closeSuc}>
                    Go To Login
                    </Button>
                </Link>
            </DialogActions>
            </Dialog>
        {/* /If Success */}

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
                {"Error!"}
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
                Try Register again
                </Button>
            </DialogActions>
            </Dialog>
        {/* /If Failed */}

      </div>
    )
  }
}
