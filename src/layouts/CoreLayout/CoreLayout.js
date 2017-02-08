import React from 'react'
import Header from '../../components/Header'
import Jumbo from '../../components/Jumbo'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'

class CoreLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showJumbo: false
    }
    this.isEmptyObject = this.isEmptyObject.bind(this)
  }
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  }
  render () {
    // console.log(this.props.auth, this.props)
    return (
      <div style={{ height: '100%' }}>
        <Header auth={this.props.auth} />
        {this.props.location.pathname === '/' && this.isEmptyObject(this.props.auth) ? <Jumbo /> : null}
        <div
          className='container core-layout__viewport'
          style={{ minHeight: '100%', height: 'auto', paddingTop: '20px', paddingBottom: '50px' }}
        >
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  auth: React.PropTypes.object,
  location: React.PropTypes.any
}

export default CoreLayout
