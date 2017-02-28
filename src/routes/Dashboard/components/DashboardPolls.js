import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'

export class DashboardPolls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      polls: []
    }
    this.getPolls = this.getPolls.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getPolls()
  }
  getPolls () {
    axios.get('/api/users/polls')
      .then((response) => {
        this.setState({
          polls: response.data
        })
      })
  }
  handleDelete (id) {
    if (confirm('Are you sure you want to delete this poll?')) {
      axios.get('/api/polls/delete/' + id)
        .then((response) => {
          if (response.data === 'OK') {
            return this.getPolls()
          }
          if (response.data.error) {
            console.log(response.data.error)
          }
        })
    }
  }
  render () {
    const polls = this.state.polls.map((poll, index) => {
      return (
        <div className='row' key={index}>
          <div className='col-xs-12'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <div className='span'>
                  <Link to={'/poll/' + poll._id}><strong>{poll.title}</strong></Link>
                  <button
                    onClick={() => this.handleDelete(poll._id)}
                    className='btn btn-default pull-right'
                  >
                    Delete
                  </button>
                  {/* <button className='btn btn-default pull-right'>Edit</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div>
        {polls}
      </div>
    )
  }
}

export default DashboardPolls
