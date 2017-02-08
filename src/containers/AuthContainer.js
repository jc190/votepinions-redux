import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../store/auth'

export default function Authenticated (Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      auth: React.PropTypes.object.isRequired
    }
    static contextTypes = {
      store: React.PropTypes.any,
      router: React.PropTypes.any
    }
    render () {
      return (
        <div style={{ height: '100%' }}>
          <Component {...this.props} />
        </div>
      )
    }
  }
  const mapStateToProps = (state) => ({
    auth: state.auth
  })
  const mapDispatchToProps = (dispatch) => ({
    getUser: getUser(dispatch)
  })
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}
