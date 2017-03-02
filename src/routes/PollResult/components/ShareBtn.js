import React from 'react'

class ShareBtn extends React.Component {
  constructor (props) {
    super(props)
    this.popoverInit = this.popoverInit.bind(this)
  }
  componentWillMount () {
    this.popoverInit()
  }
  popoverInit () {
    document.querySelectorAll('[data-toggle="popover"]').popover()
  }
  render () {
    return (
      <button
        className='btn btn-primary btn-block'
        data-toggle='popover'
        data-content={this.props.pollURL}
        data-placement='bottom'
      >
        Share
        <i className='fa fa-share' aria-hidden='true' />
      </button>
    )
  }
}

ShareBtn.propTypes = {
  pollURL: React.PropTypes.any
}

export default ShareBtn
