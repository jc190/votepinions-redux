import React from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

export class PollForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selection: '',
      other: ''
    }
    this.onRadioChange = this.onRadioChange.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit (e) {
    e.preventDefault()
    console.log(this.state)
    axios.post('/api/polls/vote/' + this.props.id, {
      selection: this.state.selection,
      other: this.state.other
    }).then((response) => {
      console.log(response)
      browserHistory.push('/poll/' + this.props.id)
    })
  }
  onRadioChange (e) {
    this.setState({
      selection: e.target.value
    })
  }
  onTextChange (e) {
    this.setState({
      other: e.target.value
    })
  }
  render () {
    // console.log(this.state)
    let selection = this.state.selection
    const options = this.props.options.map((option, index) => {
      return (
        <div className='form-group' key={index}>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value={option.item}
                name='poll-options'
                checked={selection === option.item}
                onChange={this.onRadioChange}
              />
              <span>{option.item}</span>
            </label>
          </div>
        </div>
      )
    })
    return (
      <form onSubmit={this.onSubmit}>
        {options}
        <div className='form-group'>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='Other'
                name='poll-options'
                checked={this.state.selection === 'Other'}
                required='true'
                onChange={this.onRadioChange}
              />
              <span>Other: </span>
              <input
                type='text'
                value={this.state.other}
                required={this.state.selection === 'Other'}
                onChange={this.onTextChange}
              />
            </label>
          </div>
        </div>
        <button className='btn btn-default btn-block' type='submit'>Vote</button>
      </form>
    )
  }
}

PollForm.propTypes = {
  id: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired
}

export default PollForm
