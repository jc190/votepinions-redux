import React from 'react'
import DashboardSettingsForm from './DashboardSettingsForm'

export class DashboardSettings extends React.Component {
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
        <DashboardSettingsForm {...this.props} />
      </div>
    )
  }
}

export default DashboardSettings
