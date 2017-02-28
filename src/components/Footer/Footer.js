import React from 'react'
import './Footer.scss'

export class Footer extends React.Component {
  render () {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <hr />
              <p className='hidden-xs'>
                <span>
                  <small>Votepinions created by James Calhoun</small>
                </span>
                <span className='pull-right'>
                  <small>[view source code]</small>&nbsp;
                  <i className='fa fa-github' aria-hidden='true' />
                </span>
              </p>
              <p className='visible-xs text-center'>
                <span>
                  <small>Votepinions created by James Calhoun</small>
                </span>
                <br />
                <span>
                  <small>[view source code]</small>&nbsp;
                  <i className='fa fa-github' aria-hidden='true' />
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
