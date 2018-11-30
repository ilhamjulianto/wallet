import React, { Component } from 'react'
import './navbar.css'
import Modal from 'react-responsive-modal'
import {MenuList, MenuItem} from '@material-ui/core'

export default class index extends Component {
    state = {
        open: false,
        aku: 'aku',
      };
     
      onOpenModal = () => {
        this.setState({ open: true });
      };
     
      onCloseModal = () => {
        this.setState({ open: false });
      };
  render() {
    return (
      <div className="dashboard-navbar">
        <div className="container-fluid row text-light py-2">
            <div className="col-md-10">
               <div>
                    <h4 onClick={this.onOpenModal}>Open modal</h4>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className="d-flex flex-column mt-5">
                        <MenuList>
                            <MenuItem>{this.state.aku}</MenuItem>
                        </MenuList>
                        </div>
                    </Modal>
               </div>
            </div>
            <div className="col-md-2">
                {/* <HorizontalScroll> */}
                    <div><h4>Test</h4></div>
                {/* </HorizontalScroll> */}
            </div>
        </div> 
      </div>
    )
  }
}
