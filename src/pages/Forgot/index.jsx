import React, { Component } from 'react'
import './forgot.css'
import lock from '../../assets/img/icons/open-lock.svg'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { FormControl, Input, InputLabel, InputAdornment, Slide, Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress } from '@material-ui/core'
import Done from '@material-ui/icons/Done'
import Close from '@material-ui/icons/Close'
import Mail from '@material-ui/icons/Mail'
import Ink from 'react-ink'
import WOW from 'wowjs'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class index extends Component {
    state = {
        email: '',
        loading: false,
        openSuc: false,
        openFail: false,
        url: 'https://api-simplewallet-v1.herokuapp.com/api',
    }

    componentDidMount = () => {
        new WOW.WOW().init()
    }

    handleChange = prop => (e) => {
        this.setState({ [prop] : e.target.value, })
    }

    handleSend = (e) => {
        e.preventDefault()

        const { url, email } = this.state
        let data = new FormData()

        this.setState({ loading: true, })

        data.append('email', email)
        axios.post(`${url}/password/create`, data)
        .then(res => {
            this.setState({ loading: false, openSuc: true,  email: '', })
        })
        .catch(err => {
            console.log(err)
            this.setState({ loading: false, openFail: true, fail: `Your email not Registered` })
        })
    }

    closeSuc = () => {
        this.setState({ openSuc: false, })
    }

    closeFail = () => {
        this.setState({ openFail: false, })
    }
  render() {
      const { email, loading, openSuc, openFail, fail } = this.state

    if(localStorage.getItem('token') === null) {
    return (
      <div className="forgot-password">
        <div className="wow fadeInUp forgot-form p-5">
            <h3 className="roboto-semibold text-dark-smooth mb-5">Forgot your password?</h3>
            <img className="img-fluid p-4" src={lock} alt="lock"/>
            <p className="roboto-regular small mt-1">
                Don't worry, just enter your email address and we'll set you up with a new password. You can change it after this.
            </p>
            <form onSubmit={this.handleSend}>
                <FormControl className="w-100 mt-2">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                    required
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
                <button className="btn btn-primary-rounded mt-4" type="submit">
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
            onClose={false}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                {"We've email your account"}
            </DialogTitle>
            <DialogContent className="mx-auto mt-2">
                <div className="mx-auto">
                    <Done className="wow flipInX" style={{fontSize: '100px', color:'#1eb8fb'}}/>
                </div>
            </DialogContent>
            <DialogActions className="mx-auto">
                <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                    <Button onClick={this.closeSuc}>
                    Check Email
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
            onClose={this.closeFail}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                {fail}
            </DialogTitle>
            <DialogContent className="mx-auto mt-2">
                <div className="mx-auto">
                    <Close className="wow flipInX" style={{fontSize: '100px', color:'#ff4040'}}/>
                </div>
            </DialogContent>
            <DialogActions className="mx-auto">
                    <Button onClick={this.closeFail}>
                    Close
                    </Button>
            </DialogActions>
            </Dialog>
        {/* /If Failed */}

      </div>
    )} else {
        return <Redirect to="/dashboard/home" />
    }
  }
}
