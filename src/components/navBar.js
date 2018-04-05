import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component {
  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Form</Link>
        </div>
      </nav>
    )
  }
}

export default NavBar
