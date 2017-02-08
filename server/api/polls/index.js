var express = require('express')
var router = express.Router()
var Poll = require('../../models/polls.js')
var User = require('../../models/user.js')

router.get('/', (req, res) => {
  Poll.getAllRecent((err, polls) => {
    if (err) throw err
    res.send(polls)
  })
})

router.get('/:pollID', (req, res) => {
  Poll.getPollById(req.params.pollID, (err, poll) => {
    if (err) throw err
    res.send(poll)
  })
})

router.get('/user/:id', (req, res) => {
  Poll.findByUserID(req.params.id, (err, polls) => {
    if (err) throw err
    res.send(polls)
  })
})

router.post('/create', (req, res) => {
  let newPoll = new Poll()
  newPoll.author = req.body.author
  newPoll.title = req.body.title
  newPoll.options = []
  req.body.options.map((option) => {
    newPoll.options.push({ item: option.value, count: 0 })
  })
  Poll.createPoll(newPoll, (err, poll) => {
    if (err) throw err
    User.getUserById(poll.author.id, (err, user) => {
      if (err) throw err
      user.polls.push(poll._id)
      user.save()
      return res.send('OK')
    })
  })
})

router.post('/vote/:id', (req, res) => {
  Poll.getPollById(req.params.id, (err, poll) => {
    if (err) throw err
    if (poll && req.body.selection !== 'Other') {
      Poll.castVote(poll._id, req.body.selection, (err, poll) => {
        if (err) throw err
        return res.send(poll)
      })
    }
    if (poll && req.body.selection === 'Other') {
      Poll.castOtherVote(poll._id, req.body.other, (err, poll) => {
        if (err) throw err
        return res.send(poll)
      })
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Poll.getPollById(req.params.id, (err, poll) => {
    if (err) throw err
    if (req.user && req.user._id.toString() === poll.author.id) {
      Poll.deletePoll(poll._id, (err, done) => {
        if (err) throw err
        res.send(200)
      })
    } else {
      res.send({ error: 'User is not authorized to do that.' })
    }
  })
})

module.exports = router
