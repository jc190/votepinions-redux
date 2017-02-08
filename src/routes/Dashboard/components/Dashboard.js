import React from 'react'
import Tabs from 'react-responsive-tabs'

import DashboardPolls from './DashboardPolls'
import DashboardSettings from './DashboardSettings'

import 'react-responsive-tabs/styles.css'
import './Dashboard.scss'

export class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.getTabs = this.getTabs.bind(this)
  }
  getTabs () {
    const data = [
      { name: 'Polls', content: <DashboardPolls /> },
      { name: 'Settings', content: <DashboardSettings /> }
    ]
    return data.map((d, index) => {
      return ({
        key: index,
        title: d.name,
        getContent: () => d.content
      })
    })
  }
  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <Tabs items={this.getTabs()} transform={false} />
      </div>
    )
  }
}

export default Dashboard
