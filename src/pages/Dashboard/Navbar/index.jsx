import React, { Component } from 'react'
import './navbar.css'
import Modal from 'react-responsive-modal'
import {Menu, MenuList, MenuItem, Button, IconButton} from '@material-ui/core'
import profile from '../../../assets/img/profile/salam.jpg'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export default class index extends Component {
    state = {
        open: false,
        aku: 'aku',
        anchorEl: null,
      };
     
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };

      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
  render() {
    console.log(this.state)
    return (
      <div className="dashboard-navbar">
        <div className="container-fluid  navbar text-light py-2">
               <Button color="inherit" className="mr-auto">
                    <font onClick={this.onOpenModal}>Keuangan Pondok</font>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="d-flex flex-column mt-5">
                        <MenuList>
                            <MenuItem>{this.state.aku}</MenuItem>
                        </MenuList>
                        </div>
                    </Modal>
               </Button>
                
                <div>
                    <IconButton color="inherit" className="mx-3 shadow" aria-label="Add Wallet">
                        <AddCircleIcon/>
                    </IconButton>
                    <img src={profile} className="rounded-circle" height="50px" width="50px" alt="" aria-owns={this.state.anchorEl ? 'menu-profile' : undefined} aria-haspopup="true" onClick={this.handleClick}/>
                    <Menu
                      id="menu-profile"
                      anchorEl={this.state.anchorEl}
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                      <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                    </Menu>
                </div>
        </div>
      </div>
    )
  }
}
