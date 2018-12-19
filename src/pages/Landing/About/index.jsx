import React, { Component } from 'react'
import './about.css'
import platform from '../../../assets/img/icons/icon-platform.svg'
import transaction from '../../../assets/img/icons/icon-transaction.svg'
import save from '../../../assets/img/icons/saving-plan.svg'

export default class index extends Component {
  render() {
    return (
      <div className="container-fluid bg-light py-5" id="about">
        <div className="container my-5 text-center">
            <h2 className="wow fadeInUp slow roboto-bold text-dark-smooth" data-wow-delay="0.3s">Super Wallet</h2>
            <hr className="wow zoomIn super-line mt-3" data-wow-delay="0.6s"/>
            <p className="wow fadeInUp slow text-dark-smooth roboto-light mt-5 mx-5" data-wow-delay="0.9s">
            Super Wallet helps you get just about everything managed. A smart, easy-to-use app that allows you to track and categorize your in-and-out money, create budgets that you can actually stick to. It works seamlessly across devices and platforms, available on phone, tablet, PC and Web.
            </p>

            <div className="row mt-5 pt-5">
            {/* Platform */}
              <div className="col-md-4 col-sm-12 text-center">
                <img src={platform} alt="platform" className="wow fadeInUp slow img-feature" data-wow-delay="0.9s"/>
                <p className="wow fadeInUp slow mt-2 roboto-light mx-5" data-wow-delay="1.8s">
                Safely synchronize across devices.
                </p>
              </div>
            {/* /Platform */}
            {/* Transaction */}
              <div className="col-md-4 col-sm-12 text-center">
                <img src={transaction} alt="platform" className="wow fadeInUp slow img-feature" data-wow-delay="0.9s"/>
                <p className="wow fadeInUp slow mt-2 roboto-light mx-5" data-wow-delay="1.8s">
                Manage your debts, loans and payment process in one place.
                </p>
              </div>
            {/* /Transaction */}
            {/* Save */}
            <div className="col-md-4 col-sm-12 text-center">
                <img src={save} alt="platform" className="wow fadeInUp slow img-feature" data-wow-delay="0.9s"/>
                <p className="wow fadeInUp slow mt-2 roboto-light mx-5" data-wow-delay="1.8s">
                Keep track on savings process to meet your financial goals.
                </p>
              </div>
            {/* /Save */}
            </div>
        </div>
      </div>
    )
  }
}
