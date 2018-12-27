import React, { Component } from 'react'
import './profile.css'
// import Footer from '../Footer'
import Create from '@material-ui/icons/Create'
import { TextField, Fab, LinearProgress, Snackbar, IconButton, Dialog, DialogTitle, DialogContent, Slide, Tooltip, FormControl, Input, InputLabel, InputAdornment } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'
import Done from '@material-ui/icons/Done'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Lock from '@material-ui/icons/Lock'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from '../../_actions'
import { css } from 'react-emotion'
import { HashLoader } from 'react-spinners'


const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class index extends Component {
  state = {
    id: '',
    avatar: '',
    image: '',
    name: '',
    email: '',
    phone_number: '',
    current_password: '',
    password: '',
    password_confirmation: '',
    open: false,
    loading: false,
    success: false,
    fail: false,
    large: false,
    format: false,
    disabled: false,
    showPassword: false,
    showPasswordOne: false,
    showPasswordTwo: false,
    error: '',
    url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
  }

  getData = () => {
    const token  = localStorage.getItem('token')
    const { url } = this.state
    axios.get(`${url}/user?token=${token}`)
    .then(res => {
      console.log(res)
      this.setState({
        id: res.data.data.id,
        avatar: res.data.data.avatar,
        image: res.data.data.avatar,
        name: res.data.data.name,
        email: res.data.data.email,
        phone_number: res.data.data.phone_number,
      })
    })
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') })
    this.getData()
  }

  handleChange = prop => (e) => {
    let { phone_number } = this.state

    this.setState({ [prop]: e.target.value, })

    if(phone_number.toString().length <= 8) {
      this.setState({ disabled: true, })
    } else if(phone_number.toString().length >= 8) {
      this.setState({ disabled: false, })
    }
  }
    

  handleImage = (e) => {
    const file = e.target.files
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
    var filePath = e.target.value

    this.setState({ avatar: file[0] })

    if(!allowedExtensions.exec(filePath)) {
      this.setState({ format: true, })
    } else if(file[0].size > 2048000) {
        this.setState({ large: true, })
        e.target.value = ''
    }

    if (file && file[0]) {
      let reader = new FileReader();
      
      reader.onload = (e) => {
          this.setState({image: e.target.result});
      };
      reader.readAsDataURL(file[0]);
    }
  }

  onImageChange(e) {
      if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
              this.setState({avatar: e.target.result});
          };
          reader.readAsDataURL(e.target.files[0]);
      }
  }

  handleUploadImage = (e) => {
    e.preventDefault()
    this.setState({ loading: true, })

    const token = localStorage.getItem('token')
    const { url, avatar } = this.state
    const data = new FormData()
    data.append('avatar', avatar)

    axios.post(`${url}/user/upload?token=${token}`, data)
    .then(res => {
      console.log(res)
      this.setState({
        loading: false,
        success: true,
        fail: false,
      })
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
      this.setState({
        loading: false,
        success: false,
        fail: true,
      })
    })
  }

  handleUpdateProfile = (e) => {
    e.preventDefault()
    const { name, email, phone_number, url } = this.state
    this.setState({ loading: true, })

    axios.put(`${url}/user/update?token=${localStorage.getItem('token')}`, 
      {
        name: name,
        email: email,
        phone_number: phone_number,
      }
    )
    .then(res => {
      console.log(res)
      this.setState({
        loading: false,
        success: true,
      })
      this.getData()
    })
    .catch(err => {
      console.log(err.response.data.message)
      this.setState({
        loading: false,
        success: false,
        fail: true,
        error: err.response.data.message,
      })
    })
  }

  handleChangePassword = (e) => {
    e.preventDefault()
    const { url } = this.state
    let token = localStorage.getItem('token')
    this.setState({ loading: true, })

    let datas = new FormData()
    datas.append('current_password', this.state.current_password)
    datas.append('password', this.state.password)
    datas.append('password_confirmation', this.state.password_confirmation)
    axios.post(`${url}/changepassword?token=${token}`, datas)
    .then(res => {
      console.log(res)
      this.setState({ 
        loading: false,
        success: true,
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        loading: false,
        fail: true,
      })
    })
  }

  handleCloseSuccess = () => {
    this.setState({ success: false, })
  }

  handleCloseFail = () => {
    this.setState({ fail: false, })
  }

  handleCloseLarge = () => {
    this.setState({ large: false, })
  }

  handleCloseFormat = () => {
    this.setState({ format: false, })
  }

  handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }))
  }

  handleClickShowPasswordOne = () => {
      this.setState(state => ({ showPasswordOne: !state.showPasswordOne }))
  }

  handleClickShowPasswordTwo = () => {
      this.setState(state => ({ showPasswordTwo: !state.showPasswordTwo }))
  }

  openChangePass = () => {
    this.setState({ open: true, })
  }

  handleClose = () => {
    this.setState({ open: false, })
  }

  isInputNumber(e){
        
      var ch = String.fromCharCode(e.which);
      
      if(!(/[0-9]/.test(ch))){
          e.preventDefault();
      }
      
  }

  render() {
    console.log(this.state)
    const { id, image, name, email, phone_number, password, current_password, password_confirmation, loading, open, success, fail, large, format, disabled, showPassword, showPasswordOne, showPasswordTwo, error } = this.state
    if(id === '') {
      return(
        <div className="preload">
            <div className="sweet-loading mx-auto">
                  <HashLoader
                      className={override}
                      sizeUnit={"px"}
                      size={75}
                      color={"#1eb8fb"}
                      loading={true}
                  />
              </div>
        </div>
      )
    }
    return (
      <div className="dashboard-profile">
        <div className="container-fluid text-dark-smooth">

              <div className="py-3 px-2">

                <div className="mx-auto col-md-4 col-sm-12 p-2 py-3 px-4">
                <div className="p-4 profile-card text-center">
                  <div className="img-profile text-center">
                    <img className="avatar rounded-circle" src={image} alt=""/>
                    <input className="d-none" type="file" id="avatar" onChange={this.handleImage}/>
                    <label htmlFor="avatar" className="change-photo"><Create/></label>
                    <label className="send-photo" onClick={this.handleUploadImage}><Done/></label>
                  </div>
                  <form onSubmit={this.handleUpdateProfile}>
                    <TextField
                      required
                      id="name"
                      label="Full Name"
                      className="mt-5"
                      value={name}
                      onChange={this.handleChange('name')}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="email"
                      label="Email"
                      className="mt-5"
                      value={email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                      fullWidth
                      disabled
                    />
                    <TextField
                      required
                      id="phone_number"
                      label="Phone"
                      className="mt-5"
                      value={phone_number}
                      onKeyPress={this.isInputNumber}
                      onChange={this.handleChange('phone_number')}
                      margin="normal"
                      fullWidth
                    />

                    <Fab size="small" disabled={disabled} className="mx-3 btn-save" type="submit">
                      <SaveIcon/>
                    </Fab>

                    <Fab size="small" disabled={disabled} className="mx-3 btn-change-pass" type="button" onClick={this.openChangePass}>
                      <Lock/>
                    </Fab>
                  </form>

                </div>
                </div>

              </div>
        </div>

        {/* Preload */}
        <div className={loading === true ? 'display' : 'd-none'}>
          <LinearProgress />
        </div>
        {/* Preload */}

        {/* onSuccess */}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={success}
            autoHideDuration={6000}
            onClose={this.handleCloseSuccess}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Update Success</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseSuccess}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
        {/* onSuccess */}

        {/* OnFail */}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={fail}
            autoHideDuration={6000}
            onClose={this.handleCloseFail}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{error}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseFail}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
        {/* onFail */}

        {/* OnImageLarge */}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={large}
            autoHideDuration={6000}
            onClose={this.handleCloseLarge}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Image is to Large, Maximum 2 MB</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseLarge}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
        {/* onImageLarge */}

        {/* OnImageFormat */}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={format}
            autoHideDuration={6000}
            onClose={this.handleCloseFormat}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Please upload file having extensions .jpeg/.jpg/.png/.gif only</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseFormat}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
        {/* OnImageFormat */}

      {/* Change Password */}
        <Dialog
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Change Password
            </DialogTitle>
            <DialogContent>
                <div>
                    <form onSubmit={this.handleChangePassword}>
                        <Tooltip title="Password at least must be 6 character">
                          <FormControl className="w-100 mt-3">
                              <InputLabel htmlFor="current_password">Current Password</InputLabel>
                              <Input
                                  required
                                  value={current_password}
                                  id="current_password"
                                  type={showPasswordOne ? 'text' : 'password'}
                                  required={true}
                                  onChange={this.handleChange('current_password')}
                                  startAdornment={
                                      <InputAdornment position="start">
                                          <Lock className="text-blue" />
                                      </InputAdornment>
                                  }
                                  endAdornment={
                                  <InputAdornment position="end">
                                      <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={this.handleClickShowPasswordOne}
                                      >
                                      {showPasswordOne ? <Visibility className="text-blue" /> : <VisibilityOff className="text-blue" />}
                                      </IconButton>
                                  </InputAdornment>
                                  }
                              />
                          </FormControl>
                      </Tooltip>
                      <Tooltip title="Password at least must be 6 character">
                          <FormControl className="w-100 mt-3">
                              <InputLabel htmlFor="password">New Password</InputLabel>
                              <Input
                                  required
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
                                      required
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

                        <div className="mx-auto mt-4 d-flex justify-content-center">
                            <button className="btn-rounded mx-1 btn-send" type="submit">
                            Change
                            </button>
                            <button className="btn-rounded mx-1 btn-cancel" type="button" onClick={this.handleClose}>
                            Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
        {/* Change Password */}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return(
    {
    data: state.data,
  }
  )
}
export default connect(mapStateToProps, {getData})(index)