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
import Close from '@material-ui/icons/Close'
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
        showPasswordTwo: false,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        open: false,
        openSuc: false,
        openFail: false,
        loading: true,
        disabled: true,
        passwordAlert: 'Password at least must be 6 characters',
        openSnackErr: false,
        confirmPass: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
      };

    componentDidMount() {
        new WOW.WOW().init()
      }

      handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

      handleClickShowPasswordTwo = () => {
        this.setState(state => ({ showPasswordTwo: !state.showPasswordTwo }));
      };

      handleOnChangeRegister = (e) => {    
        this.setState({ [e.target.id] : e.target.value })

        var form = document.forms['myForm']
        var email = form['email']
        var password = form['password']
        var password_confirmation = form['password_confirmation']

        if(email.value.length <= 5) {
                this.setState({ disabled: true, })
            } else {
                this.setState({ disabled: false, })
            }

        if(password.value.length <= 5) {
            this.setState({ disabled: true, })
        } else {
            this.setState({ disabled: false, })
        }

        if(password.value !== password_confirmation.value) {
            this.setState({
                confirmPass: 'Check your password again',
                disabled: true,
            })
        }
        else {
            this.setState({
                confirmPass: '',
                disabled: false,
            })
        }
    }

      handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ open: true })

        const { name, email, password, password_confirmation, url } = this.state
        const data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('password', password)
        data.append('password_confirmation', password_confirmation)

        axios.post(`${url}/auth/register`, data)
        .then((res) => {
            this.setState({
                openSuc: true,
                openFail: false,
                open: false,
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            })
            console.log(res)
        })
        .catch(err => {
            console.log(err.response)
            this.setState({
                error: err.response.data.message,
                openFail: true,
                open: false,
            })
        })
      }

      closeModal = () => {
          this.setState({ open: false, })
      }

      closeFail = () => {
          this.setState({ openFail: false, })
      }

      closeSuc = () => {
          this.setState({ openSuc: false, })
      }

      handleCloseSnackErr = () => {
          this.setState({ openSnackErr: false })
      }
  render() {
      console.log(this.state)
      const { showPassword, showPasswordTwo, name, email, password, password_confirmation, open, openFail, openSuc, openSnackErr, disabled, passwordAlert, confirmPass, loading, error } = this.state
    if(localStorage.getItem('token') === null){
    return (
      <div className="signup-session">
        <img src={signupTop} className="wow slideInDown signup-top" alt="signup-top" data-wow-delay="0.3s"/>
        <img src={signupBottom} className="wow slideInUp signup-bottom" alt="signup-bottom" data-wow-delay="0.3s"/>
        <div className="wow fadeIn slow signup-form text-center p-5">
            <h2 className="roboto-bold text-light">Register</h2>
            <p className="roboto-light text-light mt-4 mx-3">Here you can fill the form and create your own
            account. If you have account, Click the
            Sign In button.</p>

            {/* Form */}
            <form id="myForm" className="mt-5 mb-4" onSubmit={this.handleSubmit}>
                <FormControl className="w-75 mt-5">
                        <InputLabel htmlFor="name">Full Name</InputLabel>
                        <Input
                        value={name}
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
                        value={email}
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
                <Tooltip title={passwordAlert}>
                <FormControl className="w-75 mt-4">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            value={password}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
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
                                {showPassword ? <Visibility color="disabled" /> : <VisibilityOff color="disabled" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
                </Tooltip>
                <br/>
                <Tooltip title={passwordAlert}>
                <FormControl className="w-75 mt-4">
                        <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
                        <Input
                            value={password_confirmation}
                            id="password_confirmation"
                            type={showPasswordTwo ? 'text' : 'password'}
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
                                onClick={this.handleClickShowPasswordTwo}
                                >
                                {showPasswordTwo ? <Visibility color="disabled" /> : <VisibilityOff color="disabled" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
                </Tooltip>
                <label className="text-danger small">{confirmPass}</label>
                <br/>
                <Tooltip title={ disabled === true ? "You must fill all Form first" : ''}>
                    <button id="btn-signup" disabled={disabled} type="submit" className="btn btn-primary-rounded mt-5">
                        Register
                        <Ink/>
                    </button>
                </Tooltip>
                <Link to="/login"><button className="btn btn-secondary-rounded mt-3" type="button">
                    Login
                    <Ink/>
                </button></Link>
            </form>
            {/* Form */}

        </div>

        {/* On Submit */}
        <Dialog
            open={open}
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
                        loading={loading}
                    />
                </div>
            </DialogContent>
            </Dialog>
        {/* /On Submit */}
        
        {/* If Success */}
            <Dialog
            open={openSuc}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Well done! Account created.<br/>Please, check your email to activate it.
            </DialogTitle>
            <DialogContent className="mx-auto mt-2">
                <div className="mx-auto">
                    <Done className="wow flipInX" style={{fontSize: '100px', color:'#1eb8fb'}}/>
                </div>
            </DialogContent>
            <DialogActions className="mx-auto">
                <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                    <Button onClick={this.closeSuc}>
                    Verify Email
                    </Button>
                </a>
            </DialogActions>
            </Dialog>
        {/* /If Success */}

        {/* If Failed */}
        <Dialog
            open={openFail}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                <div dangerouslySetInnerHTML={{__html: error}}/>
            </DialogTitle>
            <DialogContent>
                <div className="mx-auto text-center">
                    <Close className="wow bounceIn text-danger" style={{fontSize: '100px'}}/>
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
          open={openSnackErr}
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
