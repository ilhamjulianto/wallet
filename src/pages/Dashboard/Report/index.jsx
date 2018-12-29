import React, { Component } from 'react'
import './report.css'
import Chart from 'chart.js'
import axios from 'axios'
import _ from 'lodash'

export default class index extends Component {
    state = {
        data: '',
        december: '',
        expense: '',
        url: 'https://api-simplewallet-v1.herokuapp.com/api/v1',
    }

    getData = () => {
        const { url } = this.state
        const token  = localStorage.getItem('token')
        axios.get(`${url}/user?token=${token}`)
        .then(res => {
            console.log(res)
            this.setState({ data: res.data.data.transactions.data })
        })
    }

    chart = (janIn, febIn, marIn, aprIn, mayIn, junIn, julIn, augIn, sepIn, octIn, novIn, decIn) => {
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
                    data: [
                        janIn,
                        febIn,
                        marIn,
                        aprIn,
                        mayIn,
                        junIn,
                        julIn,
                        augIn,
                        sepIn,
                        octIn,
                        novIn,
                        decIn,
                    ],
                    backgroundColor: gradient,
                    borderWidth: 2,
                    borderColor: [
                        'rgba(30, 154, 255, 1)',
                    ],
                    pointBackgroundColor: 'white',
                },
                {
                    label: 'Income',
                    data: [
                        30000000,
                        40000000,
                        20000000,
                        70000000,
                        25000000,
                        40000000,
                        60000000,
                        38000000,
                        28000000,
                        39000000,
                        20000000,
                        52000000,
                    ],
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
        for (var i = 0; i < arr.length; i++) {
                  var total = sum += arr[i]
        }
        return total
    }

    ambilBulanIn = (params) => {
        const { data } = this.state
        var month = data !== '' ? data.map(datas => datas) : ''

        var ambilBulan = month !== '' ? month.filter(x => x.date.includes(`${new Date().getFullYear()}-${params}`) && parseInt(x.amount) > 0) : ''
        let bulan = Array.isArray(ambilBulan) ? ambilBulan.map(dat => dat.amount) : '0'
        let totalTran = Array.isArray(bulan) && bulan.length >= 1 ? this.sumTotal(bulan) : '0'
        console.log(totalTran)
        return totalTran
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
    this.chart(totalJan, totalFeb, totalMar, totalApr, totalMay, totalJun, totalJul, totalAug, totalSep, totalOct, totalNov, totalDec)
    console.log(this.state)

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
    )}
  }
}
