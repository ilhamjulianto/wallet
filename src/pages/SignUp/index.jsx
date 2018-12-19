import React, { Component } from 'react'
import './signUp.css'
import signupTop from '../../assets/img/elements/signup-top.svg'
import signupBottom from '../../assets/img/elements/signup-bottom.svg'
import { Link, Redirect } from 'react-router-dom'
import { FormControl, InputLabel, Input, InputAdornment, IconButton  } from '@material-ui/core/'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import Mail from '@material-ui/icons/Mail'
import Ink from 'react-ink'
import WOW from 'wowjs'
import axios from 'axios'
import { Slide, Dialog, DialogActions, DialogContent, DialogTitle, Button, Tooltip, Snackbar,  } from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import PersonPin from '@material-ui/icons/PersonPin'
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
        name: '',
        email: '',
        password: '',
        open: false,
        openSuc: false,
        openFail: false,
        loading: true,
        disabled: true,
        passwordAlert: 'Password at least must be 6 characters',
        openSnackErr: false,
      };

      componentDidMount() {
        new WOW.WOW().init()
      }

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

      handleOnChangeRegister = (e) => {        
          this.setState({
              [e.target.id] : e.target.value
          })

          var {name, email, password} = this.state

          if(name !== '') {
                if(!email.match(/^[A-Z]/) || !email.match(/\s/g) || email.length < 6) {
                    if(password.length >= 5 || !password.match(/\s/g)) {
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
        }
      }

      handleSubmit = (e) => {
        e.preventDefault()

        const register = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(register)

        const data = new FormData()
        data.append('name', this.state.name)
        data.append('email', this.state.email)
        data.append('password', this.state.password)

        axios.post('https://api-simplewallet-v1.herokuapp.com/api/v1/auth/register', data).then((res) => {
            this.setState({
                openSuc: true,
                openFail: false,
                open: false,
            })
            console.log(res)
        }).catch((err) => {
            console.log(err)
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

      handleCloseSnackErr = () => {
          this.setState({
              openSnackErr: false
          })
      }
  render() {
      console.log(this.state)
    if(localStorage.getItem('token') === null){
    return (
      <div className="signup-session">
        <img src={signupTop} className="wow slideInDown signup-top" alt="signup-top"/>
        <img src={signupBottom} className="wow slideInUp signup-bottom" alt="signup-bottom" data-wow-delay="0.3s"/>
        <div className="wow fadeInUp signup-form text-center p-5">
            <h2 className="roboto-bold text-light">Sign Up</h2>
            <p className="roboto-light text-light mt-4 mx-3">Here you can fill the form and create your own
            account. If you have account, Click the
            Sign In button.</p>

            {/* Form */}
            <form className="mt-5 mb-4" onSubmit={this.handleSubmit}>
                <FormControl className="w-75 mt-5">
                        <InputLabel htmlFor="name">Full Name</InputLabel>
                        <Input
                        value={this.state.name}
                        id="name"
                        required={true}
                        startAdornment={
                            <InputAdornment position="start">
                            <PersonPin color="disabled" />
                            </InputAdornment>
                        }
                        onChange={this.handleOnChangeRegister}
                        />
                </FormControl>
                <FormControl className="w-75 mt-4">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                        value={this.state.email}
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
                <FormControl className="w-75 mt-4">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            value={this.state.password}
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
                    <button id="btn-signup" disabled={this.state.disabled} type="submit" className="btn btn-primary-rounded mt-5" onClick={this.open}>
                        Sign Up
                        <Ink/>
                    </button>
                </Tooltip>
                <Link to="/login"><button className="btn btn-secondary-rounded mt-3">
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
            <DialogContent className="mx-auto mt-2">
                <div className="mx-auto">
                    <Done className="wow flipInX" style={{fontSize: '100px', color:'#1eb8fb'}}/>
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
                Error!<br/>Your email has been taken or check your connections
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

        {/* Snackbar Erro Notif */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackErr}
          onClose={this.handleCloseSnackErr}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Space and Uppercase words not allowed</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleCloseSnackErr}>
              Close
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackErr}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        {/* /Snackbar Error Notif */}

      </div>
    )} else if(localStorage.getItem('token') !== null) {
        return(
            <Redirect to='/dashboard/home'/>
        )
    }
  }
}
