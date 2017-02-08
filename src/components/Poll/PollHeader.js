import React from 'react'

export class PollHeader extends React.Component {
  render () {
    return (
      <div className='poll-header'>
        <h4>{this.props.title}</h4>
        <hr />
      </div>
    )
  }
}

PollHeader.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default PollHeader
