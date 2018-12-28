import React, { Component } from 'react'
import './ourTeam.css'

export default class index extends Component {
  render() {
    return (
      <div className="our-team">
        <div className="swipper-container">
            <div className="swipper-wrapper">
                <div className="swipper-slide">
                <div class="swiper-slide" style={{backgroundImage : 'url(http://lorempixel.com/600/600/nature/1)'}}>
                </div>
            </div>
        </div>
        <div className="swipper-pagination"></div>
      </div>
      </div>
    )
  }
}
