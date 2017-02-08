var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../../models/user.js')
var Poll = require('../../models/polls.js')

// Handle request for user information
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.user) {
    res.send({
      _id: req.user._id,
      displayName: req.user.displayName,
      name: req.user.name
    })
  } else {
    res.send({})
  }
})

// Handle local login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      return res.send({ error: 'Authentication failed. Email address or password do not match.' })
    }
    req.logIn(user, (err) => {
      if (err) throw err
      return res.send(200)
    })
  })(req, res, next)
})

// Handle facebook login
router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

// Callback function for facebook login
router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

// Handle logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Register User
router.post('/register', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const registerSchema = {
    firstName: {
      notEmpty: true,
      isAlpha: {
        errorMessage: 'Must only contain letters.'
      },
      errorMessage: 'First name is required.'
    },
    lastName: {
      notEmpty: true,
      isAlpha: {
        errorMessage: 'Must only contain letters.'
      },
      errorMessage: 'Last name is required.'
    },
    email: {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Valid email address is required.'
      },
      errorMessage: 'Email address is required.'
    },
    password: {
      notEmpty: true,
      isLength: {
        options: { min: 6 },
        errorMessage: 'Password must contain at least 6 characters.'
      },
      errorMessage: 'Password is required.'
    },
    verifyPassword: {
      equals: {
        options: [password]
      },
      errorMessage: 'Passwords do not match.'
    }
  }
  req.checkBody(registerSchema)
  const errors = req.validationErrors()
  if (errors) {
    return res.send({ errors: errors })
  }
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err
    if (user) {
      return res.send({ errors: [{ msg: 'Email address is already registered.' }] })
    }
    const newUser = new User({
      displayName: firstName + ' ' + lastName,
      name: {
        first: firstName,
        last: lastName
      },
      email: email,
      accounts: {
        local: {
          password: password
        }
      }
    })
    User.createUser(newUser, (err, user) => {
      if (err) throw err
      return res.send(200)
    })
  })
})

// Handles request for specific users polls
router.get('/polls', (req, res) => {
  Poll.findByUserID(req.user._id, (err, polls) => {
    if (err) throw err
    res.send(polls)
  })
})

// router.get('/:user', function (req, res) {
//   if (req.query.poll) {
//     if (req.query.results) {
//       if (req.query.json) {
//         Poll.getPollById(req.query.poll, function (err, poll) {
//           if (err) throw err
//           var results = poll.options.map(function (obj) {
//             return [obj.item, obj.count]
//           })
//           res.setHeader('Content-Type', 'application/json')
//           return res.send(JSON.stringify(results))
//         })
//       }
//       Poll.getPollById(req.query.poll, function (err, poll) {
//         if (err) throw err
//         return res.render('pollResults', { poll })
//       })
//     } else if (req.query.delete) {
//       Poll.getPollById(req.query.poll, function (err, poll) {
//         if (err) throw err
//         if (req.user && poll.author === req.user.username) {
//           Poll.deletePoll(req.query.poll, function (err) {
//             if (err) throw err
//             return res.redirect('/user/' + req.user.username)
//           })
//         } else {
//           return res.redirect('/')
//         }
//       })
//     } else {
//       Poll.getPollById(req.query.poll, function (err, poll) {
//         if (err) throw err
//         return res.render('pollpage', { poll })
//       })
//     }
//   } else {
//     Poll.findByUsername(req.params.user, function (err, polls) {
//       if (err) throw err
//       if (req.user && req.params.user === req.user.username) {
//         res.render('profile', { polls: polls })
//       } else {
//         res.render('profile', { polls: polls, username: req.params.user })
//       }
//     })
//   }
// })

// router.post('/:user', function (req, res) {
//   if (req.query.poll) {
//     if (req.body.optionsRadios) {
//       if (req.body.optionsRadios === 'otherOption') {
//         Poll.castOtherVote(req.query.poll, req.body.otherOption, function (err) {
//           if (err) throw err
//           res.redirect('/user/' + req.params.user + '?poll=' + req.query.poll + '&results=true')
//         })
//       } else {
//         Poll.castVote(req.query.poll, req.body.optionsRadios, function (err) {
//           if (err) throw err
//           res.redirect('/user/' + req.params.user + '?poll=' + req.query.poll + '&results=true')
//         })
//       }
//     } else {
//       res.redirect('/user/' + req.params.user + '?poll=' + req.query.poll)
//     }
//   }
// })

module.exports = router
