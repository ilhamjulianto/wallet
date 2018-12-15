import React, { Component } from 'react'
import './home.css'
import Footer from '../Footer'
import Ink from 'react-ink'
import WOW from 'wowjs'

export default class index extends Component {
    state = {
        income: 5000000,
        expense: 3000000,
    }

    componentDidMount() {
        new WOW.WOW().init()
    }

    toIdr = (total) => {
        var bilangan = total;
                    
        var	number_string = bilangan.toString()
        var sisa 	= number_string.length % 3
        var rupiah 	= number_string.substr(0, sisa)
        var ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
                
        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        return rupiah
    }
  render() {
      const { income, expense } = this.state
      console.log(this.state)
      var saldo = income - expense
    return (
      <div className="dashboard-home text-center">
        <div className="pt-5">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">My Wallet</h2>
            <hr className="wow zoomIn slow dashboard-header-line"/>
            <div className="row m-5 p-0">
                <div className="col-md-4 col-sm-12 text-left mt-md-0">
                    <div className="wow fadeInUp slow income text-light border-0 relative mx-auto p-4" data-wow-delay="0.3s">
                        <h4 className="roboto-light">Income</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-donate fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="income-value roboto-bold m-0">IDR {this.toIdr(income)}</p>
                        </div>
                        <Ink/>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 text-left mt-md-0 mt-sm-3">
                    <div className="wow fadeInUp slow expense text-dark-smooth relative border-0 mx-auto p-4" data-wow-delay="0.6s">
                        <h4 className="roboto-light">Expense</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-dolly text-blue fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="expense-value roboto-bold m-0">IDR {this.toIdr(expense)}</p>
                        </div>
                        <Ink/>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 text-left mt-md-0 mt-sm-3">
                    <div className="wow fadeInUp slow income text-light border-0 relative mx-auto p-4" data-wow-delay="0.9s">
                        <h4 className="roboto-light">Balance</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-dollar-sign fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="income-value roboto-bold m-0">IDR {this.toIdr(saldo)}</p>
                        </div>
                        <Ink/>
                    </div>
                </div>
            </div>
        </div>
        <div className="pt-5 mt-5">
            <Footer/>
        </div>
      </div>
    )
  }
}
