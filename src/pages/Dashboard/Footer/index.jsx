import React, { Component } from 'react'
import './footer.css'
import Favorite from '@material-ui/icons/Favorite'

export default class index extends Component {
  render() {
    return (
      <div className="footer mt-5">
            <div className="container py-2 text-center text-dark-smooth">
                © 2018, made with <Favorite/> by Tim 2 for a better web.
            </div>
      </div>
    )
  }
}
