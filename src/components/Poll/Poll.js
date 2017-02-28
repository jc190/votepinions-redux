import React from 'react'
import { connect } from 'react-redux'
import PollHeader from './PollHeader'
import PollForm from './PollForm'
import PollFooter from './PollFooter'
import './Poll.scss'

export class Poll extends React.Component {
  constructor (props) {
    super(props)
    this.isEmptyObject = this.isEmptyObject.bind(this)
  }
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  }
  render () {
    return (
      <div className='grid-item col-md-4 col-sm-6 col-xs-12'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <PollHeader title={this.props.data.title} />
            <PollForm
              options={this.props.data.options}
              id={this.props.data._id}
              noUser={this.isEmptyObject(this.props.auth)}
            />
            <PollFooter author={this.props.data.author} votes={this.props.data.votes} />
          </div>
        </div>
      </div>
    )
  }
}

Poll.propTypes = {
  data: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Poll)
