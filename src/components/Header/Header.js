import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export class Header extends React.Component {
  constructor (props) {
    super(props)
    this.isEmptyObject = this.isEmptyObject.bind(this)
  }
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  }
  render () {
    let rightLinks
    if (!this.isEmptyObject(this.props.auth)) {
      rightLinks = (
        // <ul className='nav navbar-nav navbar-right'>
        //   <li><p className='navbar-text'>Hello, {this.props.auth.displayName}</p></li>
        //   <li><Link to='/dashboard'><i className='fa fa-cog' aria-hidden='true' /></Link></li>
        //   <li><a href='/api/users/logout'>Logout</a></li>
        // </ul>
        <div className='pull-right'>
          <Link to='/dashboard' className='btn btn-primary navbar-btn'>
            Dashboard
            <i className='fa fa-cog' aria-hidden='true' />
          </Link>
          <a href='/api/users/logout' className='btn btn-primary navbar-btn'>
            Logout
            <i className='fa fa-sign-out' aria-hidden='true' />
          </a>
        </div>
      )
    } else {
      rightLinks = (
        // <ul className='nav navbar-nav navbar-right'>
        //   <li><Link to='/login'>Log in</Link></li>
        //   <li><Link to='/signup'>Sign up</Link></li>
        // </ul>
        <div className='pull-right'>
          <Link to='/login' className='btn btn-primary navbar-btn'>
            Log in
            <i className='fa fa-sign-in' aria-hidden='true' />
          </Link>
          <Link to='/signup' className='btn btn-primary navbar-btn'>
            Sign up
            <i className='fa fa-user-plus' aria-hidden='true' />
          </Link>
        </div>
      )
    }
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top votepinions--nav'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              type='button'
              className='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
              aria-expanded='false'
            >
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <IndexLink className='navbar-brand' to='/'>Votepinions</IndexLink>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            {this.isEmptyObject(this.props.auth)
              ? null
              : <Link to='/createpoll' className='btn btn-primary navbar-btn'>
                Create
                <i className='fa fa-pencil-square-o' aria-hidden='true' />
              </Link>
            }
            {/* <ul className='nav navbar-nav'>
              {this.isEmptyObject(this.props.auth) ? null : <li><Link to='/createpoll'>Create +</Link></li>}
            </ul> */}
            {rightLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  auth: React.PropTypes.object.isRequired
}

export default Header
