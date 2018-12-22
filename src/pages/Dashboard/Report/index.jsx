import React, { Component } from 'react'
import './report.css'
import Chart from 'chart.js'

export default class index extends Component {

    componentDidMount = () => {
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

  render() {
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
  }
}
