import React from 'react'
import './Jumbo.scss'
import { Link } from 'react-router'

export class Jumbo extends React.Component {
  render () {
    return (
      <div className='jumbotron'>
        <div className='container'>
          <h1 className='text-center'>Create. Share. Vote.</h1>
          <p
            className='text-center'>
            Ask the important questions. Share with your friends. Let your opinion be heard!.
          </p>
          <p className='text-center'><Link to='/signup' className='btn btn-primary btn-lg'>Get Started</Link></p>
        </div>
      </div>
    )
  }
}

export default Jumbo
