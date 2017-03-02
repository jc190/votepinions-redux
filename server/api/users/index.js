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
      return res.sendStatus(200)
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

router.post('/update', (req, res) => {
  if (!req.body.update) {
    return res.sendStatus(400)
  }
  User.findById(req.user._id, (err, user) => {
    if (err) throw err
    const messages = []
    let operations = 0
    let completedOperations = 0
    if (req.body.update.displayName) {
      const usernameSchema = {
        'update.displayName': {
          notEmpty: true,
          isAlphanumeric: {
            errorMessage: 'Username must only contain [A-z][0-9].'
          },
          isLength: {
            options: { min: 4 },
            errorMessage: 'Username must contain at least 4 characters.'
          }
        }
      }
      req.checkBody(usernameSchema)
      const errors = req.validationErrors()
      if (errors) {
        errors.map((error) => {
          messages.push({ type: 'error', msg: error.msg })
        })
        return reqFinished(true)
      }
      operations++
      user.displayName = req.body.update.displayName
      user.save((err, user) => {
        if (err) throw err
        Poll.updateAuthorDisplayName(user, (err, ok) => {
          if (err) throw err
          messages.push({ type: 'success', msg: 'Display name has been changed to: ' + user.displayName + '.' })
          completedOperations++
          return reqFinished()
        })
      })
    }
    if (req.body.update.password.new) {
      const passwordSchema = {
        'update.password.new': {
          notEmpty: true,
          isLength: {
            options: { min: 6 },
            errorMessage: 'Password must contain at least 6 characters.'
          },
          errorMessage: 'New password is required.'
        },
        'update.password.old': {
          notEmpty: true,
          errorMessage: 'Current password is required.'
        },
        'update.password.verify': {
          equals: {
            options: req.body.update.password.new
          },
          errorMessage: 'Passwords do not match.'
        }
      }
      req.checkBody(passwordSchema)
      const errors = req.validationErrors()
      if (errors) {
        errors.map((error) => {
          messages.push({ type: 'error', msg: error.msg })
        })
        return reqFinished(true)
      }
      operations++
      User.updatePassword(user, req.body.update.password.old, req.body.update.password.new, (err, user) => {
        if (err) {
          messages.push({ type: 'error', msg: 'Wrong current passoword.' })
          return reqFinished(true)
        }
        messages.push({ type: 'success', msg: 'Password has been updated.' })
        completedOperations++
        return reqFinished()
      })
    }

    reqFinished()

    function reqFinished (errors) {
      if (errors) {
        return res.send({ messages })
      }
      if (operations === 0) {
        return res.sendStatus(400)
      }
      if (completedOperations === operations) {
        return res.send({ messages })
      }
    }
  })
})

module.exports = router
