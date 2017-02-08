import React from 'react'
import axios from 'axios'

import Masonry from 'react-masonry-component'
import Poll from '../../../components/Poll'

import './Profile.scss'

export class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      polls: []
    }
    this.getPolls = this.getPolls.bind(this)
    this.getPolls()
  }
  getPolls () {
    axios.get('/api/polls/user/' + this.props.params.id)
      .then((response) => {
        // console.log('hello', response.data)
        this.setState({
          polls: response.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render () {
    // console.log(this.props.params.id)
    const polls = this.state.polls.map((poll, index) => {
      return (
        <Poll data={poll} key={index} />
      )
    })
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <Masonry className='row'>{polls}</Masonry>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  params: React.PropTypes.any
}

export default Profile
