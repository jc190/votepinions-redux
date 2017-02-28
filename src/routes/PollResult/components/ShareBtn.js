import React from 'react'

class ShareBtn extends React.Component {
  constructor (props) {
    super(props)
    this.popoverInit = this.popoverInit.bind(this)
  }
  popoverInit () {
    $('[data-toggle="popover"]').popover()
  }
  render () {
    this.popoverInit()
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

export default ShareBtn
