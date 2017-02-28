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
  getTabs (props) {
    const data = [
      { name: 'Polls', content: <DashboardPolls /> },
      { name: 'Settings', content: <DashboardSettings {...props} /> }
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
    const selectedTab = this.props.location.query.tab ? +this.props.location.query.tab : 0
    return (
      <div>
        <h1>Dashboard</h1>
        <Tabs
          items={this.getTabs(this.props)}
          transform={false}
          selectedTabKey={selectedTab}
        />
      </div>
    )
  }
}

export default Dashboard
