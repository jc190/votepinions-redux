import React from 'react'
import PollHeader from './PollHeader'
import PollForm from './PollForm'
import PollFooter from './PollFooter'
import './Poll.scss'

// Todo:
// Radio select with state to submit to api
// Maybe break this component down even more?

export class Poll extends React.Component {
  render () {
    // console.log(this.props.data)
    return (
      <div className='grid-item col-md-4 col-sm-6 col-xs-12'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <PollHeader title={this.props.data.title} />
            <PollForm options={this.props.data.options} id={this.props.data._id} />
            <PollFooter author={this.props.data.author} votes={this.props.data.votes} />
          </div>
        </div>
      </div>
    )
  }
}

Poll.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default Poll
