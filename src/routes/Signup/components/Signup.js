import React from 'react'
import SignupForm from './SignupForm'
import './Signup.scss'

export const Signup = (props) => {
  return (
    <div className='row'>
      <div className='col-sm-6 col-sm-push-3'>
        <h1>Sign up</h1>
        <hr />
        <SignupForm />
        <h3 className='text-center'>
          or
        </h3>
        <a href='api/users/login/facebook' className='btn btn-primary btn-block'>Log in with Facebook</a>
      </div>
    </div>
  )
}

export default Signup
