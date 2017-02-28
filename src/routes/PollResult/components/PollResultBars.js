import React from 'react'
// import './PollResult.scss'

export class PollResultBars extends React.Component {
  constructor (props) {
    super(props)
    this.renderOptions = this.renderOptions.bind(this)
  }
  renderOptions (options) {
    let html = []
    let votes = this.props.totalVotes
    options.map((option, index) => {
      let percent = (option.count / votes) * 100
      html.push(
        <li key={index}>
          <p>{option.item}</p>
          <div className='progress'>
            <div className='progress-bar'
              aria-valuenow={percent}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{ minWidth: '2rem', width: percent + '%' }}
            >
              <span className='sr-only'>{option.count} votes</span>
              <span>{option.count}</span>
            </div>
          </div>
        </li>
      )
    })
    return html
  }
  render () {
    let data = this.renderOptions(this.props.options)
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <ul className='poll-result-bars'>
            {data}
          </ul>
        </div>
      </div>
    )
  }
}

PollResultBars.propTypes = {
  options: React.PropTypes.array.isRequired,
  totalVotes: React.PropTypes.number.isRequired
}

export default PollResultBars
