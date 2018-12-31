import React, { Component } from 'react'
import './report.css'
import Chart from 'chart.js'
import axios from 'axios'
import _ from 'lodash'

export default class index extends Component {
    state = {
        data: '',
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

    chart = (monthlyIn, monthlyOut) => {
        var myChart = document.getElementById('myChart').getContext('2d')
        var gradient = myChart.createLinearGradient(0,0,0,450)
            gradient.addColorStop(0, 'rgba(30, 184, 251, 1)')
            gradient.addColorStop(0.7, 'rgba(30, 184, 251, 0.4)')
            gradient.addColorStop(1, 'rgba(30, 184, 251, 0.1)')

        var gradientTwo = myChart.createLinearGradient(0,0,0,450)
            gradientTwo.addColorStop(0, 'rgba(255, 206, 116, 1)')
            gradientTwo.addColorStop(0.7, 'rgba(255, 206,116, 0.4)')
            gradientTwo.addColorStop(1, 'rgba(255, 206, 116, 0.1)')

        var chart = new Chart(myChart, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets:[{
                    label: 'Expense',
                    data: monthlyOut,
                    backgroundColor: gradient,
                    borderWidth: 2,
                    borderColor: [
                        'rgba(30, 154, 255, 1)',
                    ],
                    pointBackgroundColor: 'white',
                },
                {
                    label: 'Income',
                    data: monthlyIn,
                    backgroundColor: gradientTwo,
                    borderWidth: 2,
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                    ],
                    pointBackgroundColor: 'white',
                }] 
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    chartBar = (dailyIn, dailyOut) => {
        var myChart = document.getElementById('daily').getContext('2d')

        var gradient = myChart.createLinearGradient(0,0,0,450)
            gradient.addColorStop(0, 'rgba(30, 184, 251, 1)')
            gradient.addColorStop(0.7, 'rgba(30, 184, 251, 0.4)')
            gradient.addColorStop(1, 'rgba(30, 184, 251, 0.1)')

        var gradientTwo = myChart.createLinearGradient(0,0,0,450)
            gradientTwo.addColorStop(0, 'rgba(255, 206, 116, 1)')
            gradientTwo.addColorStop(0.7, 'rgba(255, 206,116, 0.4)')
            gradientTwo.addColorStop(1, 'rgba(255, 206, 116, 0.1)')

        var chart = new Chart(myChart, {
            type: 'line',
            data: {
                labels: [`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`],
                datasets:[{
                    label: 'Expense',
                    data: [`${dailyOut}`],
                    backgroundColor: gradient,
                    borderWidth: 2,
                    borderColor: [
                        'rgba(30, 154, 255, 1)',
                    ],
                    pointBackgroundColor: 'white',
                },
                {
                    label: 'Income',
                    data: [`${dailyIn}`],
                    backgroundColor: gradientTwo,
                    borderWidth: 2,
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                    ],
                    pointBackgroundColor: 'white',
                }] 
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
            })        
    }

    componentDidMount = () => {
        this.getData()
    }

    sumTotal = (arr) => {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) { var total = sum += arr[i] }
        return total
    }

    ambilBulanIn = (params) => {
        const { data } = this.state
        var month = data !== '' ? data.map(datas => datas) : ''

        var ambilBulan = month !== '' ? month.filter(x => x.date.includes(`${new Date().getFullYear()}-${params}`) && parseInt(x.amount) > 0) : ''
        let bulan = Array.isArray(ambilBulan) ? ambilBulan.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(bulan) && bulan.length >= 1 ? this.sumTotal(bulan) : '0'
        return totalTran
    }

    ambilBulanOut = (params) => {
        const { data } = this.state
        var month = data !== '' ? data.map(datas => datas) : ''

        var ambilBulan = month !== '' ? month.filter(x => x.date.includes(`${new Date().getFullYear()}-${params}`) && parseInt(x.amount) < 0) : ''
        let bulan = Array.isArray(ambilBulan) ? ambilBulan.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(bulan) && bulan.length >= 1 ? this.sumTotal(bulan) : '0'
        return totalTran
    }

    ambilBulanOutTotal = () => {
        const { data } = this.state
        var all = data !== '' ? data.map(datas => datas) : ''

        var ambilHari = all !== '' ? all.filter(x => x.date.includes(`${new Date().getFullYear()}-${new Date().getMonth()+1}`) && parseInt(x.amount) < 0) : ''
        let hari = Array.isArray(ambilHari) ? ambilHari.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(hari) && hari.length >= 1 ? this.sumTotal(hari) : '0'
        return totalTran
    }

    ambilBulanInTotal = () => {
        const { data } = this.state
        var all = data !== '' ? data.map(datas => datas) : ''

        var ambilHari = all !== '' ? all.filter(x => x.date.includes(`${new Date().getFullYear()}-${new Date().getMonth()+1}`) && parseInt(x.amount) > 0) : ''
        let hari = Array.isArray(ambilHari) ? ambilHari.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(hari) && hari.length >= 1 ? this.sumTotal(hari) : '0'
        return totalTran
    }

    ambilHariOut = () => {
        const { data } = this.state
        var all = data !== '' ? data.map(datas => datas) : ''

        var ambilHari = all !== '' ? all.filter(x => x.date.includes(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) && parseInt(x.amount) < 0) : ''
        let hari = Array.isArray(ambilHari) ? ambilHari.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(hari) && hari.length >= 1 ? this.sumTotal(hari) : '0'
        return totalTran
    }

    ambilHariIn = () => {
        const { data } = this.state
        var all = data !== '' ? data.map(datas => datas) : ''

        var ambilHari = all !== '' ? all.filter(x => x.date.includes(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`) && parseInt(x.amount) > 0) : ''
        let hari = Array.isArray(ambilHari) ? ambilHari.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(hari) && hari.length >= 1 ? this.sumTotal(hari) : '0'
        return totalTran
    }

    toIdr = (total) => {
        var bilangan = total.toString().replace('-','')
                    
        var number_string = bilangan.toString()
        var sisa    = number_string.length % 3
        var rupiah  = number_string.substr(0, sisa)
        var ribuan  = number_string.substr(sisa).match(/\d{3}/g)
                
        if (ribuan) {
            let separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
        }

        return rupiah
    }

  render() {
    const { data } = this.state
    if(data === '' || data === undefined) {
        return (
            <div className="dashboard-report text-center">
                <div className="py-3">
                    <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">Report</h2>
                    <hr className="wow zoomIn slow dashboard-header-line"/>
                    <div className="container mx-auto mt-4">
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
        )
    } else {

// Monthly Income
    let totalDec = this.ambilBulanIn(`12`)
    let totalNov = this.ambilBulanIn(`11`)
    let totalOct = this.ambilBulanIn(`10`)
    let totalSep = this.ambilBulanIn(`09`)
    let totalAug = this.ambilBulanIn(`08`)
    let totalJul = this.ambilBulanIn(`07`)
    let totalJun = this.ambilBulanIn(`06`)
    let totalMay = this.ambilBulanIn(`05`)
    let totalApr = this.ambilBulanIn(`04`)
    let totalMar = this.ambilBulanIn(`03`)
    let totalFeb = this.ambilBulanIn(`02`)
    let totalJan = this.ambilBulanIn(`01`)

// Monthly Expense
    let totalDecOut = this.ambilBulanOut(`12`)
    let totalNovOut = this.ambilBulanOut(`11`)
    let totalOctOut = this.ambilBulanOut(`10`)
    let totalSepOut = this.ambilBulanOut(`09`)
    let totalAugOut = this.ambilBulanOut(`08`)
    let totalJulOut = this.ambilBulanOut(`07`)
    let totalJunOut = this.ambilBulanOut(`06`)
    let totalMayOut = this.ambilBulanOut(`05`)
    let totalAprOut = this.ambilBulanOut(`04`)
    let totalMarOut = this.ambilBulanOut(`03`)
    let totalFebOut = this.ambilBulanOut(`02`)
    let totalJanOut = this.ambilBulanOut(`01`)

// all monthly income
    let monthlyIn = [ totalJan, totalFeb, totalMar, totalApr, totalMay, totalJun, totalJul, totalAug, totalSep, totalOct, totalNov, totalDec ]
    let monthlyInTotal = this.ambilBulanInTotal()

// all monthly expense
    let monthlyOut = [ totalJanOut, totalFebOut, totalMarOut, totalAprOut, totalMayOut, totalJunOut, totalJulOut, totalAugOut, totalSepOut, totalOctOut, totalNovOut, totalDecOut ]
    let monthlyOutTotal = this.ambilBulanOutTotal()

// monthly chart
    this.chart( monthlyIn, monthlyOut )

// all daily income
    let dailyIn = this.ambilHariIn()

// all daily expense
    let dailyOut = this.ambilHariOut()
    console.clear()
    
    return (
      <div className="dashboard-report">
        <div className="py-3">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold text-center">Report</h2>
            <hr className="wow zoomIn slow dashboard-header-line text-center"/>
            <div className="container mx-auto mt-4">
                <canvas id="myChart"></canvas>
            </div>

            <div className="container mx-auto row mt-5">
                <div className="col-md-6 col-sm-12 px-5">
                    <h4 className="wow fadeInUp slow text-dark-smooth roboto-bold p-0 m-0  text-center">Today</h4>
                    <hr className="wow zoomIn slow dashboard-header-line text-md-left text-sm-center"/>
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="wow fadeInUp slow text-blue roboto-semibold text-left">Income</h6>
                        <h6 className="wow fadeInUp slow text-dark-smooth roboto-semibold text-right">{`IDR ${this.toIdr(dailyIn)}`}</h6>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="wow fadeInUp slow text-red roboto-semibold text-left">Expense</h6>
                        <h6 className="wow fadeInUp slow text-dark-smooth roboto-semibold text-right">{dailyOut.toString() !== '' ? `IDR -${this.toIdr(dailyOut).toString().replace('-.','-')}` : '0'}</h6>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 text-left px-5 mt-md-0 mt-sm-5">
                    <h4 className="wow fadeInUp slow text-dark-smooth roboto-bold p-0 m-0  text-center">This Month</h4>
                    <hr className="wow zoomIn slow dashboard-header-line text-md-left text-sm-center"/>
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="wow fadeInUp slow text-blue roboto-semibold text-left">Income</h6>
                        <h6 className="wow fadeInUp slow text-dark-smooth roboto-semibold text-right">{`IDR ${this.toIdr(monthlyInTotal)}`}</h6>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <h6 className="wow fadeInUp slow text-red roboto-semibold text-left">Expense</h6>
                        <h6 className="wow fadeInUp slow text-dark-smooth roboto-semibold text-right">{dailyOut.toString() !== '' ? `IDR -${this.toIdr(monthlyOutTotal).toString().replace('-.','-')}` : '0'}</h6>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )}
  }
}
