import React from 'react'

export class DashboardPolls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: ''
    }
    this.getPolls = this.getPolls.bind(this)
  }
  getPolls () {
    console.log('hello')
  }
  render () {
    return (
      <div>
        <h1>User Settings</h1>
        <hr />
        <p>This is where your accounts settings will be.</p>
      </div>
    )
  }
}

export default DashboardPolls
