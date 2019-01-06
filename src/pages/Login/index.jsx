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
import Close from '@material-ui/icons/Close'
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
        showPassword: false,
        open: false,
        openFail: false,
        loading: true,
        disabled: true,
        error: 'Error!<br />Check your email and password',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
      };

      componentDidMount() {
        new WOW.WOW().init();
      }

      handleLogin = (e) => {
          e.preventDefault()

          this.setState({ open: true })

          const { email, password, url } = this.state
          const data = new FormData()
          data.append('email', email)
          data.append('password', password)

          axios.post(`${url}/auth/login`, data)
          .then(res => {
              localStorage.setItem('token', res.data.access_token)
              this.setState({
                  data: res.data,
                  open: false,
                  openFail: false,
              })
              this.props.logIn(res.data.access_token)
          })
          .catch(error => {
            this.setState({
              error: error.response.data.msg,
              open: false,
              openFail: true,
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
          this.setState({ [e.target.id] : e.target.value })
          let form = document.forms['myForm']
          let password = form['password']

            if(password.value.length <= 5) {
                this.setState({ disabled: true, })
            } else {
                this.setState({ disabled: false, })
            }
          }

      closeModal = () => {
        this.setState({ open: false, })
      }

      closeFail = () => {
        this.setState({ openFail: false, })
      }

  render() {
      const { email, password, disabled, showPassword, open, openFail, loading, error } = this.state
        console.clear()
        
    if(localStorage.getItem('token') === null) {
    return (
      <div className="login-session">
        <img src={loginTop} className="wow slideInDown login-top" alt="login-top" data-wow-delay="0.3s"/>
        <img src={loginBottom} className="wow slideInUp login-bottom" alt="login-top" data-wow-delay="0.3s"/>
        <div className="wow fadeIn slow login-form text-center p-md-5 p-xs-3" data-wow-delay="0.3s">
            <h2 className="roboto-bold text-light">Login</h2>
            <p className="roboto-light text-light mt-4 mx-3">Sign In with your account, if you don't have account,
            please Sign Up first.</p>
            <form className="mt-5 mb-4" id='myForm' onSubmit={this.handleLogin}>
                <FormControl className="w-75 mt-5">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                    id="email"
                    value={email}
                    onChange={this.handleChangeLogin}
                    required={true}
                    startAdornment={
                        <InputAdornment position="start">
                        <Mail color="disabled" />
                        </InputAdornment>
                    }
                    />
                </FormControl>
                <FormControl className="w-75 mt-4">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
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
                                {showPassword ? <Visibility color="disabled" /> : <VisibilityOff color="disabled" />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
                <div className="roboto-regular text-blue small mt-2 mr-5 text-right"><Link to="/forgot">Forgot your Password?</Link></div>
                
                <br/>
                {/* <Link to="/dashboard"> */}
                <button disabled={disabled} type="submit" className="btn btn-primary-rounded mt-1">
                    Login
                    <Ink/>
                </button>
                {/* </Link> */}
                <Link to="/register"><button className="btn btn-secondary-rounded mt-3" type="button">
                    Register
                    <Ink/>
                </button></Link>
            </form>
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