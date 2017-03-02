import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import PollResultBars from './PollResultBars'
import PollResultPie from './PollResultPie'
import ShareBtn from './ShareBtn'
import './PollResult.scss'

export class PollResult extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      poll: null
    }
    this.getPoll = this.getPoll.bind(this)
    this.getPoll()
  }
  getPoll () {
    const ctx = this
    axios.get('/api/polls/' + this.props.params.pollID)
      .then((response) => {
        ctx.setState({
          poll: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <h1>{this.state.poll ? this.state.poll.title : null}</h1>
            <h4>by&nbsp;
              {this.state.poll
                ? <Link to={'/profile/' + this.state.poll.author.id}>{this.state.poll.author.displayName}</Link>
                : null}
            </h4>
            <hr />
            {this.state.poll ? <PollResultBars
              options={this.state.poll.options}
              totalVotes={this.state.poll.votes}
              /> : null}
            <hr />
            <ShareBtn pollURL={'https://' + window.location.hostname + this.props.location.pathname} />
          </div>
          <div className='col-md-6 hidden-xs'>
            {this.state.poll ? <PollResultPie
              options={this.state.poll.options}
              /> : null}
          </div>
        </div>
      </div>
    )
  }
}

PollResult.propTypes = {
  params: React.PropTypes.any,
  location: React.PropTypes.object
}

export default PollResult
