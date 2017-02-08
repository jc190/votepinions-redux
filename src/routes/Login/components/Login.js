import React from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { getUser } from '../../../store/auth'
import './Login.scss'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: null
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit (e) {
    e.preventDefault()
    let { dispatch } = this.props
    axios.post('/api/users/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        if (response.data.error) {
          this.setState({
            errors: response.data.error
          })
        }
        if (response.data === 'OK') {
          dispatch(getUser)
          browserHistory.push('/')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render () {
    return (
      <div className='row'>
        <div className='col-sm-6 col-sm-push-3'>
          <h1>Log in</h1>
          <hr />
          {this.props.location.query.newRegister ? (
            <div className='alert alert-success'>
              <strong>Well Done! </strong>
              Your account has been created. Log in below.
            </div>
          ) : null }
          {this.state.errors ? (<div className='alert alert-danger'>
            <strong>Error! </strong>
            {this.state.errors}
          </div>) : null}
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                value={this.state.email}
                onChange={this.onChange}
                name='email'
                type='email'
                className='form-control'
                placeholder='Email Address'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                value={this.state.password}
                onChange={this.onChange}
                name='password'
                type='password'
                className='form-control'
                placeholder='Password'
              />
            </div>
            <button
              type='submit'
              className='btn btn-default btn-block'>Log in</button>
          </form>
          <h3 className='text-center'>
            or
          </h3>
          <a href='api/users/login/facebook' className='btn btn-primary btn-block'>Log in with Facebook</a>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.any,
  location: React.PropTypes.any
}

export default Login
