import React from 'react'
import { connect } from 'react-redux'
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
      <div className='dashboard--container'>
        <h1>Dashboard</h1>
        <h4><i className='fa fa-user' />{this.props.user.displayName}</h4>
        <Tabs
          items={this.getTabs(this.props)}
          transform={false}
          selectedTabKey={selectedTab}
        />
      </div>
    )
  }
}

Dashboard.propTypes = {
  location: React.PropTypes.object,
  user: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.auth
})

export default connect(mapStateToProps)(Dashboard)
