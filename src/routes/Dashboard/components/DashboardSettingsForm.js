import React from 'react'
import axios from 'axios'

export class DashboardSettingsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayName: '',
      currentPassword: '',
      newPassword: '',
      verifyPassword: '',
      messages: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleMsgs = this.handleMsgs.bind(this)
    this.resetForms = this.resetForms.bind(this)
  }
  onSubmit (e) {
    e.preventDefault()
    const ctx = this
    ctx.setState({
      messages: []
    })
    axios.post('/api/users/update', {
      update: {
        displayName: this.state.displayName,
        password: {
          old: this.state.currentPassword,
          new: this.state.newPassword,
          verify: this.state.verifyPassword
        }
      }
    })
      .then((response) => {
        console.log(response)
        if (response.data.messages) {
          let newMessages = this.state.messages
          response.data.messages.map((msg) => {
            newMessages.push({ type: msg.type, msg: msg.msg })
          })
          ctx.setState({
            messages: newMessages
          })
          ctx.resetForms()
        }

      })
      .catch((err) => {
        console.log(err)
        let newMessages = this.state.messages
        newMessages.push({type: 'error', msg: 'Bad request.'})
        ctx.setState({
          messages: newMessages
        })
      })
  }
  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleMsgs (msg) {
    if (msg.type === 'error') {
      return (
        <div className='alert alert-danger'>{msg.msg}</div>
      )
    }
    if (msg.type === 'success') {
      return (
        <div className='alert alert-success'>{msg.msg}</div>
      )
    }
  }
  resetForms () {
    this.setState({
      displayName: '',
      currentPassword: '',
      newPassword: '',
      verifyPassword: ''
    })
  }
  render () {
    const msgs = this.state.messages.length > 0 ? this.state.messages.map(this.handleMsgs) : null
    return (
      <form onSubmit={this.onSubmit}>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <h3>Change display name</h3>
            <hr />
            <div className='form-group'>
              <label className='control-label' htmlFor='displayName'>New display name</label>
              <input onChange={this.onChange} type='text' className='form-control' name='displayName' value={this.state.displayName} />
            </div>
            <h3>Change password</h3>
            <hr />
            <div className='form-group'>
              <label htmlFor='currentPassword'>Current password</label>
              <input onChange={this.onChange} type='password' className='form-control' name='currentPassword' value={this.state.currentPassword} />
            </div>
            <div className='form-group'>
              <label htmlFor='newPassword'>New password</label>
              <input onChange={this.onChange} type='password' className='form-control' name='newPassword' value={this.state.newPassword} />
            </div>
            <div className='form-group'>
              <label htmlFor='verifyPassword'>Verify new password</label>
              <input onChange={this.onChange} type='password' className='form-control' name='verifyPassword' value={this.state.verifyPassword} />
            </div>
            <button className='btn btn-primary' type='submit'>Save</button>
            <div style={{ marginTop: '15px' }}>{msgs}</div>
          </div>
        </div>
      </form>
    )
  }
}

export default DashboardSettingsForm
