import React from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'

export class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verifyPassword: '',
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
    console.log(this.state)
    const ctx = this
    axios.post('/api/users/register', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      verifyPassword: this.state.verifyPassword
    })
      .then((response) => {
        if (response.data.errors) {
          ctx.setState({
            errors: response.data.errors
          })
        }
        if (response.data === 'OK') {
          browserHistory.push('/login?newRegister=true')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    let errors
    if (this.state.errors) {
      errors = this.state.errors.map((error) => {
        return (
          <div className='alert alert-danger'>
            <p><strong>Error:</strong> {error.msg}</p>
          </div>

        )
      })
    }
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.errors ? errors : null}
        <div className='form-group'>
          <label htmlFor='first-name'>First Name</label>
          <input
            value={this.state.firstName}
            onChange={this.onChange}
            type='text'
            className='form-control'
            name='firstName'
            placeholder='First Name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>Last Name</label>
          <input
            value={this.state.lastName}
            onChange={this.onChange}
            type='text'
            className='form-control'
            name='lastName'
            placeholder='Last Name'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            value={this.state.email}
            onChange={this.onChange}
            type='email'
            className='form-control'
            name='email'
            placeholder='Email Address'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange}
            type='password'
            className='form-control'
            name='password'
            placeholder='Password'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='verify-password'>Verify Password</label>
          <input
            value={this.state.verifyPassword}
            onChange={this.onChange}
            type='password'
            className='form-control'
            name='verifyPassword'
            placeholder='Verify Password'
          />
        </div>
        <button type='submit' className='btn btn-default btn-block'>Register</button>
      </form>
    )
  }
}

export default SignupForm
