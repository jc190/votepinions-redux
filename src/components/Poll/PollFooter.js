import React from 'react'
import { Link } from 'react-router'

export class PollFooter extends React.Component {
  render () {
    return (
      <div className='panel-footer'>
        <small>
          submitted by&nbsp;
          <Link to={'/profile/' + this.props.author.id}>{this.props.author.displayName}</Link>
        </small>
        <span className='pull-right'>
          <span>
            <small>votes </small>
          </span>
          <span className='badge'>{this.props.votes}</span>
        </span>
      </div>
    )
  }
}

PollFooter.propTypes = {
  author: React.PropTypes.object.isRequired,
  votes: React.PropTypes.number.isRequired
}

export default PollFooter
