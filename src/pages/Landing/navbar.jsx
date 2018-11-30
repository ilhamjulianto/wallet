import React, { Component } from 'react'
import './navbar.css'

export default class Nav extends Component {
  render() {
    return (
      <div className="wow slideInDown slow super-navbar navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
            <a className="wow fadeInLeft slow navbar-brand roboto-bold mr-auto" href="/" data-wow-delay="0.3s">Super Wallet</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse roboto-bold text-light" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="wow fadeInRight slow nav-item mr-3" data-wow-delay="0.3s">
                       <a className="nav-link" href="#home">HOME</a>
                    </li>
                    <li className="wow fadeInRight slow nav-item mr-3" data-wow-delay="0.6s">
                        <a className="nav-link" href="#about">ABOUT</a>
                    </li>
                    <li className="wow fadeInRight slow nav-item" data-wow-delay="0.9s">
                        <a className="nav-link" href="/">OUR TEAM</a>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    )
  }
}
