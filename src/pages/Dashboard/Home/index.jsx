import React, { Component } from 'react'
import './home.css'
import Footer from '../Footer'
import Ink from 'react-ink'
import WOW from 'wowjs'
import axios from 'axios'
import { css } from 'react-emotion'
import { ClipLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'


const override = css`
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -33px;
    margin-top: -33px;
`

export default class index extends Component {
    state = {
        data: '',
        income: '',
        expense: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
    }

    getData = () => {
        const { url } = this.state
        const token  = localStorage.getItem('token')
        axios.get(`${url}/user?token=${token}`)
        .then(res => {
            this.setState({ data: res.data.data.transactions.data })
        })
    }

    componentDidMount() {
        new WOW.WOW().init()
        this.getData()

    }

    toIdr = (total) => {
        var bilangan = total
                    
        var	number_string = bilangan.toString()
        var sisa 	= number_string.length % 3
        var rupiah 	= number_string.substr(0, sisa)
        var ribuan 	= number_string.substr(sisa).match(/\d{3}/g)
                
        if (ribuan) {
            let separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
        }

        return rupiah
    }

    sumTotal = (arr) => {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
                  var total = sum += arr[i]
        }
        return total
    }
  render() {
      const { data } = this.state

    if(data === '' || data === undefined ) {
    return(
        <div className="dashboard-home text-center">
            <div className="pt-5">
                <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">All Transactions</h2>
                <hr className="wow zoomIn slow dashboard-header-line"/>
                    <ClipLoader
                        className={override}
                        sizeUnit={"px"}
                        size={75}
                        color={"#1eb8fb"}
                        loading={true}
                    />
            </div>
        </div>
    )
    } else if(data.length === 0) {
        return(
            <div className="dashboard-home text-center">
                <div className="pt-5">
                    <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">All Transactions</h2>
                    <hr className="wow zoomIn slow dashboard-header-line"/>
                    <form id="myForm">
                    <div className="row m-5 p-0">
                        <div className="col-md-4 col-sm-12 text-left mt-md-0">
                            <div className="wow fadeInUp slow income text-light border-0 relative mx-auto p-4" data-wow-delay="0.3s">
                                <h4 className="roboto-light">Income</h4>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-donate fa-2x"></i>
                                    &nbsp;&nbsp;&nbsp;
                                    <p id="income" className="income-value roboto-bold m-0">IDR {data.length.toString()}</p>
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
                                    <p id="expense" className="expense-value roboto-bold m-0">IDR {data.length.toString()}</p>
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
                                    <p className="income-value roboto-bold m-0">IDR {data.length.toString()}</p>
                                </div>
                                <Ink/>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="pt-5 mt-5">
                    <Footer/>
                </div>
          </div>
        )
    } else if(localStorage.getItem('token') === null) {
        return (<Redirect to='/'/>)
    }

    let totalIn = data.map((datas) => (parseInt(datas.amount)))
    var totalInc = totalIn.filter(x => x > 1)
    var totalOut = totalIn.filter(x => x < 0)

    var saldo
    totalIn === undefined ? saldo = 0 : saldo = this.sumTotal(totalIn)
    var inc = saldo
    console.clear()

    return (
      <div className="dashboard-home text-center">
        <div className="pt-5">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">All Transactions</h2>
            <hr className="wow zoomIn slow dashboard-header-line"/>
            <form id="myForm">
            <div className="row m-5 p-0">
                <div className="col-md-4 col-sm-12 text-left mt-md-0">
                    <div className="wow fadeInUp slow income text-light border-0 relative mx-auto p-4" data-wow-delay="0.3s">
                        <h4 className="roboto-light">Income</h4>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-donate fa-2x"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p id="income" className="income-value roboto-bold m-0">IDR {totalInc.toString() !== '' ? this.toIdr(this.sumTotal(totalInc)) : '0'}</p>
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
                            <p id="expense" className="expense-value roboto-bold m-0">IDR {totalOut.toString() !== '' ? this.toIdr(this.sumTotal(totalOut).toString().replace('-','')) : '0'}</p>
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
                            <p className="income-value roboto-bold m-0">IDR {this.toIdr(inc).replace('-.', '-')}</p>
                        </div>
                        <Ink/>
                    </div>
                </div>
            </div>
            </form>
        </div>
      </div>
    )
  }
}
