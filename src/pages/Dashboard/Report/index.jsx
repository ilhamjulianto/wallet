import React, { Component } from 'react'
import './report.css'
import Chart from 'chart.js'

export default class index extends Component {

    componentDidMount = () => {
        var myChart = document.getElementById('myChart').getContext('2d')
        var chart = new Chart(myChart, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets:[{
                    label: 'Expense',
                    data: [
                        20000000,
                        10000000,
                        40000000,
                        20000000,
                        55000000,
                        30000000,
                        50000000,
                        18000000,
                        58000000,
                        19000000,
                        30000000,
                        72000000,
                    ],
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.3)',
                    ],
                    borderWidth: 1,
                    borderColor: [
                        'rgba(255, 99, 132, 0.6)',
                    ]
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
                    backgroundColor:[
                        'rgba(255, 206, 86, 0.3)',
                    ],
                    borderWidth: 1,
                    borderColor: [
                        'rgba(255, 206, 86, 0.6)',
                    ]
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

  render() {
    return (
      <div className="dashboard-report text-center">
        <div className="pt-3">
            <h2 className="wow fadeInUp slow text-dark-smooth roboto-bold">Report</h2>
            <hr className="wow zoomIn slow dashboard-header-line"/>
            <div className="container mx-auto mt-4">
                <canvas id="myChart"></canvas>
            </div>
        </div>
      </div>
    )
  }
}
