import React, { Component } from 'react'
import './home.css'

export default class index extends Component {
  render() {
    return (
      <div className="dashboard-home text-center">
        <div className="pt-5">
            <h2 className="text-dark-smooth roboto-bold">My Wallet</h2>
            <hr className="dashboard-header-line"/>
            <div className="row m-5 p-0">
                <div className="col-md-4 col-sm-12 text-left">
                    <div className="income text-light border-0 mx-auto p-4">
                        <h4 className="roboto-light">Income</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-donate fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="income-value roboto-bold m-0">IDR 5.000.000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 text-left">
                    <div className="expense text-dark-smooth border-0 mx-auto p-4">
                        <h4 className="roboto-light">Expense</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-dolly text-blue fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="expense-value roboto-bold m-0">IDR 5.000.000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 text-left">
                    <div className="income text-light border-0 mx-auto p-4">
                        <h4 className="roboto-light">Balance</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-dollar-sign fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="income-value roboto-bold m-0">IDR 5.000.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
