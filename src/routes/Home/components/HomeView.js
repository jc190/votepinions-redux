import React from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-component'
import './HomeView.scss'
import Poll from '../../../components/Poll'

export class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      polls: []
    }
    this.getPolls = this.getPolls.bind(this)
    this.getPolls()
  }
  getPolls () {
    const ctx = this
    axios.get('/api/polls')
      .then(function (response) {
        ctx.setState({
          polls: response.data
        })
      })
  }
  render () {
    const polls = this.state.polls.map((poll, index) => {
      return (<Poll data={poll} key={index} />)
    })
    return (
      <div className='row'>
        <Masonry>
          { polls }
        </Masonry>
      </div>
    )
  }
}

export default HomeView
