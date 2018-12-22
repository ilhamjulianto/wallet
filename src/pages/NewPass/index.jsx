import React, { Component } from 'react'
import './newpass.css'
import newLock from '../../assets/img/icons/create-lock.svg'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FormControl, Input, InputLabel, InputAdornment, Tooltip, IconButton, LinearProgress, Dialog, DialogContent, DialogTitle, DialogActions, Button, Slide } from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import Lock from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import WOW from 'wowjs'
import Ink from 'react-ink'
import axios from 'axios'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


export default class index extends Component {
    state = {
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
        showPassword: false,
        show_passwordOne: false,
        showPasswordTwo: false,
        loading: false,
        openSuc: false,
        confirmPass: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/password',
    }

    getUrlParam() {
        let urlParams = new URLSearchParams(window.location.search)
        let token = urlParams.get('token')
        let email = urlParams.get('email')

        this.setState({
            token,
            email
        })
    }

    componentDidMount = () => {
        new WOW.WOW().init()
        this.getUrlParam()
    }

    handleSend = (e) => {
        e.preventDefault()

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
            this.setState({ loading: false, openSuc: true, })
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

    handleClose = () => {
        this.setState({ openSuc: false, })
    }
  render() {
      const { current_password, password, password_confirmation, showPassword, showPasswordTwo, loading, openSuc, confirmPass } = this.state
      console.log(this.state)
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
                <Tooltip title="Password at least must be 6 character">
                    <FormControl className="w-100 mt-3">
                        <InputLabel htmlFor="password">New Password</InputLabel>
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
                {"Success"}
            </DialogTitle>
            <DialogContent className="mx-auto mt-2">
                <div className="mx-auto">
                    <Done className="wow flipInX" style={{fontSize: '100px', color:'#1eb8fb'}}/>
                </div>
            </DialogContent>
            <DialogActions className="mx-auto">
                <Link to="/login">
                    <Button onClick={this.closeSuc}>
                    LOGIN
                    </Button>
                </Link>
            </DialogActions>
            </Dialog>
        {/* /If Success */}

      </div>
    )} else {
       return <Redirect to="/dashboard/home"/>
    }
  }
}
