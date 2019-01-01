import React, { Component } from 'react'
import './navbar.css'
import '../Profile/profile.css'
import { Link } from 'react-router-dom'
import {Menu, MenuItem, Button, IconButton, Dialog, DialogContent, DialogTitle, Slide, TextField, InputAdornment} from '@material-ui/core'
import Wallet from '@material-ui/icons/AccountBalanceWallet'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Create from '@material-ui/icons/Create'
import Ink from 'react-ink'
import axios from 'axios'
import { connect } from 'react-redux'
import { getData } from '../../_actions'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class index extends Component {
    state = {
        data: null,
        open: false,
        walletList: [
          {
            name: 'Keuangan Pondok',
          }],
        anchorEl: null,
        token: null,
        openNew: false,
        wallet: '',
        idArray: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
      }


      getData = () => {
        const { url } = this.state
        const token  = localStorage.getItem('token')
        axios.get(`${url}/user?token=${token}`)
        .then(res => {
          this.setState({ data: res.data.data })
        })
      }

      componentDidMount() {
        this.setState({ token: localStorage.getItem('token') })
        this.getData()
      }
     
      onOpenModal = () => {
        this.setState({ open: true })
      }
     
      onCloseModal = () => {
        this.setState({ open: false })
      }

      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
      }
    
      handleClose = () => {
        this.setState({ anchorEl: null })
      }

      handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
      }

      handleChange = prop => (e) => {
        this.setState({ [prop]: e.target.value })
      }

      handleCloseNew = () => {
        this.setState({ openNew: false, })
      }

      handleOpenNew = () => {
        this.setState({ openNew: true, })
      }

      handleAddWallet = () => {
        const { walletList } = this.state
        
        walletList.push({ name: this.state.wallet })
        this.setState({ openNew: false, })
      }

      handleDeleteWallet = (i) => {
        const { walletList } = this.state
        let wallet = walletList

        wallet.splice(i, 1)
        this.setState({ wallet })
      }

  render() {
    const { data } = this.state

    return (
      <div className="dashboard-navbar">
        <div className="container-fluid  navbar text-light py-2">
               <Button color="inherit" className="mr-auto">
                    <font>Keuangan Pondok</font>
                    {/*<Dialog open={this.state.open} onClose={this.onCloseModal} center>
                        <DialogContent>
                            {this.state.walletList.map((datas, i)=>{
                              return(
                                <MenuItem className="d-flex flex-row justify-content-between" onClick={
                                  ()=>{
                                    this.setState({
                                      idArray: datas.name
                                    })
                                  }
                                }>
                                  <font className="mr-auto">{datas.name}</font>
                                  <Button className="ml-auto" onClick={() => (this.handleDeleteWallet(i))}>
                                  X
                                </Button>
                                </MenuItem>
                              )
                            })}
                        </DialogContent>
                    </Dialog>*/}
               </Button>
                
                <div>
                    <IconButton color="inherit" className="p-0 mx-3 shadow" aria-label="Add Wallet">
                        <img src={data === null ? data : data.avatar} className="rounded-circle cursor-pointer" height="50px" width="50px" alt="" aria-owns={this.state.anchorEl ? 'menu-profile' : null} aria-haspopup="true" onClick={this.handleClick}/>
                    </IconButton>
                    <Menu
                      className="p-0 mr-2"
                      id="menu-profile"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                    {/* Profile */}
                      <div className="col-12">
                      <div className="p-4 profile-card text-center">
                        <div className="img-profile text-center">
                          <img className="rounded-circle" width="110px" height="110px" src={data === null ? data : data.avatar} alt=""/>
                          <Link to="/dashboard/profile">
                            <label htmlFor="file" className="edit-profile" onClick={this.handleClose}><Create className="create"/></label>
                          </Link>
                        </div>
                        <h5 className="text-dark-smooth roboto-semibold mt-5 ">{data === null ? data : data.name}</h5>
                        <h6 className="text-dark-smooth roboto-medium mt-3 ">Email</h6>
                        <p className="primary-text roboto-medium small">{data === null ? data : data.email}</p>
                      </div>
                      </div>
                    {/* Profile */}

                      <p className="text-center logout-link roboto-normal" onClick={this.handleLogout}>Log Out<Ink/></p>
                    </Menu>
                </div>
        </div>

        {/* Add Wallet */}
        <Dialog
            maxWidth="xs"
            open={this.state.openNew}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleCloseNew}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title" className="mx-auto text-center">
                Add Wallet
            </DialogTitle>
            <DialogContent>
                <div>
                    {/* <form className="py-2"> */}

                        <TextField
                            className="w-100"
                            label="New Wallet"
                            value={this.state.wallet}
                            onChange={this.handleChange('wallet')}
                            id="wallet"
                            InputProps={{
                            startAdornment: <InputAdornment position="start"><Wallet className="text-blue"/></InputAdornment>
                            }}
                        >
                        </TextField>

                        <div className="mx-auto mt-4 d-flex justify-content-center">
                            <button className="btn-rounded mx-1 btn-send" type="button" onClick={this.handleAddWallet}>
                            Add
                            </button>
                            <button className="btn-rounded mx-1 btn-cancel" onClick={this.handleCloseNew}>
                            Cancel
                            </button>
                        </div>
                    {/* </form> */}
                </div>
            </DialogContent>
        </Dialog>
        {/* Add Wallet */}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return(
    {
      data: state,
    }
  )
}
export default connect(mapStateToProps, {getData})(index);