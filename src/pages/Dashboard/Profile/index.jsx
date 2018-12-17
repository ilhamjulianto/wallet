import React, { Component } from 'react'
import './profile.css'
// import Footer from '../Footer'
import Create from '@material-ui/icons/Create'
import { TextField, Fab, LinearProgress, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'
import Done from '@material-ui/icons/Done'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from '../../_actions'
import { css } from 'react-emotion'
import { GridLoader } from 'react-spinners'


const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`

class index extends Component {
  state = {
    id: '',
    avatar: '',
    image: '',
    name: '',
    email: '',
    phone_number: '',
    loading: false,
    success: false,
    fail: false,
    disabled: false,
  }

  getData = () => {
    const token  = localStorage.getItem('token')
    axios.get(`https://api-v1-superwallet.herokuapp.com/api/v1/users?token=${token}`).then(res => {
      console.log(res)
      this.setState({
        id: res.data.user.id,
        avatar: res.data.user.avatar,
        image: res.data.user.avatar,
        name: res.data.user.name,
        email: res.data.user.email,
        phone_number: res.data.user.phone_number,
      })
    })
  }

  componentDidMount() {
    this.setState({
      token: localStorage.getItem('token')
    })
    this.getData()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })

    if(toString(this.state.phone_number).length <= 8) {
      this.setState({
        disabled: true,
      })
    } else if(toString(this.state.phone_number).length >= 8) {
      this.setState({
        disabled: false,
      })
    }
  }
    

  handleImage = (e) => {
    this.setState({
      avatar: e.target.files[0]
    })

    if(e.target.files[0].size > 204800) {
      alert('File is to large! max 200 Mb')
      e.target.value = ''
    }

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({image: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
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
    this.setState({
      loading: true,
    })

    const token = localStorage.getItem('token')
    const data = new FormData()
    data.append('avatar', this.state.avatar)

    axios.post(`https://api-v1-superwallet.herokuapp.com/api/v1/user/upload?token=${token}`, data).then(res => {
      console.log(res)
      this.setState({
        loading: false,
        success: true,
        fail: false,
      })
      window.location.reload()
    }).catch(err => {
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
    
    const { id, name, email, phone_number } = this.state

    const url = 'https://api-v1-superwallet.herokuapp.com/api/v1/user/update/'

    axios.put(`${url}${id}?token=${localStorage.getItem('token')}`, {
      name: name,
      email: email,
      phone_number: phone_number,
    }).then(res => {
      console.log(res)
      this.setState({
        loading: false,
        success: true,
      })
    }).catch(err => {
      console.log(err)
      this.setState({
        loading: false,
        success: false,
        fail: true,
      })
    })
  }

  handlePreload = () => {
    this.setState({
      loading: true,
    })
  }

  handleCloseSuccess = () => {
    this.setState({
      success: false,
    })
  }

  handleCloseFail = () => {
    this.setState({
      fail: false,
    })
  }

  render() {
    const { id, image, name, email, phone_number, loading, success, fail, disabled } = this.state
    console.log(this.state)
    if(id === '') {
      return(
        <div className="preload">
            <div className="sweet-loading mx-auto">
                  <GridLoader
                      className={override}
                      sizeUnit={"px"}
                      size={25}
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
                      id="name"
                      label="Full Name"
                      className="mt-5"
                      value={name}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="email"
                      label="Email"
                      className="mt-5"
                      value={email}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                      disabled
                    />
                    <TextField
                      type="number"
                      id="phone_number"
                      label="Phone"
                      className="mt-5"
                      value={phone_number}
                      onChange={this.handleChange}
                      margin="normal"
                      fullWidth
                    />

                    <Fab size="small" disabled={disabled} className="mx-auto btn-save" type="submit" onClick={this.handlePreload}>
                      <SaveIcon/>
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
            message={<span id="message-id">Update Failed</span>}
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