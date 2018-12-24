import React, { Component } from 'react'
import './home.css'
import cloud from '../../assets/img/elements/landing-cloud.svg'
import cloudTrans from '../../assets/img/elements/landing-cloud-trans.svg'
import logos from '../../assets/img/brands/logo-landing-page.svg'
import town from '../../assets/img/elements/landing-town.svg'
import Nav from './navbar'
import Ink from 'react-ink'
import WOW from 'wowjs'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

export default class Home extends Component {
    componentDidMount() {
        new WOW.WOW().init()
      }
  render() {
    return (
      <div className="landing-session" id="home">
        <Nav />
        <img src={town} alt="town" className="wow slideInUp slow town" data-wow-delay="0s"/>
        <img src={cloudTrans} alt="cloudTrans" className="wow slideInUp slow cloud-trans" data-wow-delay="0.3s"/>
        <img src={cloud} alt="cloud" className="wow slideInUp slow cloud" data-wow-delay="0.6s"/>

        <div className="center-of-screen mx-auto text-center">
            <img src={logos} alt="logos" className="wow bounceIn img-fluid col-md-6 col-sm-10" data-wow-delay="0.6s"/>
            <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                    <a href="/login"><button className="wow bounceIn btn btn-outline-rounded-light" data-wow-delay="0.9s">
                    LOGIN
                    <Ink/>
                </button></a>
                </div>
                <div className="col-md-6 col-sm-12">
                    <a href="/register"><button className="wow bounceIn btn btn-rounded-light" data-wow-delay="1.2s">
                    SIGN UP
                    <Ink/>
                </button></a>
                </div>
            </div>
        </div>
        
        <a className="wow fadeInUp slow" href="#about" data-wow-delay="1.5s">
        <KeyboardArrowDown className="arrow-down2"/>
        <KeyboardArrowDown className="arrow-down"/>
        </a>
      </div>
    )
  }
}
