import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import './ourTeam.css'
import ilham from '../../../assets/img/profile/ilham.png'

export default class index extends Component {
  render() {
    const params = {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 0.5,
          slideShadows: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      };
    return (
        <div className="our-team py-5 text-center" id="ourTeam">
            <div className="my-5">
                <h2 className="wow fadeInUp slow roboto-bold text-light" data-wow-delay="0.3s">Our Team</h2>
                <hr className="wow zoomIn super-line mt-3" data-wow-delay="0.6s"/>
                <Swiper {...params}>
                    <div className="wow fadeInRight slow swipper-container" data-wow-delay="0.3s">
                        <div className="swipper-wrapper">
                            <div className="swipper-slide">
                                <div class="swiper-slide">
                                    <div className="imgBx">
                                        <img className="img" src="http://lorempixel.com/600/600/nature/1" alt=""/>
                                    </div>
                                    <div className="details">
                                        <h3 className="h3">Fitra Aziz Al Rasyid<br/><span className="span">Back End Developer</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wow fadeInRight slow swipper-container" data-wow-delay="0.6s">
                        <div className="swipper-wrapper">
                            <div className="swipper-slide">
                                <div class="swiper-slide">
                                    <div className="imgBx">
                                        <img className="img" src={ilham} alt=""/>
                                    </div>
                                    <div className="details">
                                        <h3 className="h3">Muhammad Ilham Julianto<br/><span className="span">Front End Developer</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wow fadeInRight slow swipper-container" data-wow-delay="0.9s">
                        <div className="swipper-wrapper">
                            <div className="swipper-slide">
                                <div class="swiper-slide">
                                    <div className="imgBx">
                                        <img className="img" src="http://lorempixel.com/600/600/nature/1" alt=""/>
                                    </div>
                                    <div className="details">
                                        <h3 className="h3">Win Temas Miko<br/><span className="span">Mobile Developer</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Swiper>
            </div>

        </div>
    )
  }
}
