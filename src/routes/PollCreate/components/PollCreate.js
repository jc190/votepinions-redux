import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import './PollCreate.scss'

export class PollCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      options: [
        {
          value: '',
          disabled: true
        },
        {
          value: '',
          disabled: true
        }
      ]
    }
    this.addOption = this.addOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.onChangeOption = this.onChangeOption.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.isEmptyObject = this.isEmptyObject.bind(this)
  }
  addOption (e) {
    e.preventDefault()
    let options = this.state.options
    options.push({
      value: '',
      disabled: false
    })
    this.setState({
      options
    })
  }
  deleteOption (e, i) {
    e.preventDefault()
    if (e.target.disabled) return
    let options = this.state.options
    options.splice(i, 1)
    this.setState({
      options
    })
  }
  onChangeOption (e, i) {
    let options = this.state.options
    options[i].value = e.target.value
    this.setState({
      options
    })
  }
  onChangeTitle (e) {
    this.setState({
      title: e.target.value
    })
  }
  onSubmit (e) {
    e.preventDefault()
    if (this.isEmptyObject(this.props.user)) {
      return browserHistory.push('/login')
    }
    axios.post('/api/polls/create', {
      title: this.state.title,
      options: this.state.options,
      author: {
        displayName: this.props.user.displayName,
        id: this.props.user._id
      }
    }).then((response) => {
      browserHistory.push('/')
    })
  }
  isEmptyObject (obj) {
    for (var key in obj) {
      return false
    }
    return true
  }
  render () {
    let options = this.state.options.map((option, i) => {
      return (
        <div className='input-group' key={i}>
          <input
            value={this.state.options[i].value}
            onChange={(e) => { this.onChangeOption(e, i) }}
            type='text'
            className='form-control'
            name='poll-options'
            autoComplete='off'
            required
          />
          <span className='input-group-btn'>
            <button
              className={option.disabled ? 'btn btn-danger disabled' : 'btn btn-danger'}
              onClick={option.disabled ? (e) => { e.preventDefault() } : (e) => this.deleteOption(e, i)}
            >
              <strong>X</strong>
            </button>
          </span>
        </div>
      )
    })
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='poll-title'>Title</label>
              <input
                value={this.state.title}
                onChange={this.onChangeTitle}
                type='text'
                className='form-control'
                name='poll-title'
                placeholder='eg. Who will win the Super Bowl?'
                autoComplete='off'
                required
              />
            </div>
            <div className='form-group' id='poll-options'>
              <label htmlFor='poll-options'>Options</label>
              {options}
            </div>
            <button className='btn btn-primary btn-block' onClick={this.addOption}>
              <strong>Add Option +</strong>
            </button>
            <button className='btn btn-default btn-block' type='submit'>
              <strong>Submit Poll</strong>
            </button>
          </form>
          <hr />
        </div>
      </div>
    )
  }
}

PollCreate.propTypes = {
  user: React.PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.auth
})

export default connect(mapStateToProps, {})(PollCreate)
