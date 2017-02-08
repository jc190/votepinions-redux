var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy
var User = require('../models/user')
var config = require('../config')

module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })
  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
  // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (username, password, done) {
    // console.log(username, password)
    User.getUserByEmail(username, function (err, user) {
      if (err) throw err
      if (!user) {
        return done(null, false, { message: 'User not found.' })
      }

      User.checkPassword(password, user.accounts.local.password, function (err, isMatch) {
        if (err) throw err
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
    })
  }))
  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: config.fbClientId,
    clientSecret: config.fbSecret,
    callbackURL: 'http://localhost:3000/api/users/login/facebook/return',
    profileFields: ['id', 'displayName', 'email']
  }, function (accessToken, refreshToken, profile, cb) {
    // console.log(profile._json)
    process.nextTick(function () {
      // console.log('Do logic here')
      User.findByFacebookID(profile._json.id, function (err, user) {
        if (err) throw err
        if (user) {
          // console.log(user)
          return cb(null, user)
        } else {
          var newUser = new User({
            accounts: {
              facebook: {
                id: profile._json.id,
                token: accessToken,
                name: profile._json.name
              }
            },
            name: {
              first: profile._json.name.split(' ')[0],
              last: profile._json.name.split(' ')[1]
            },
            email: profile._json.email,
            displayName: profile._json.name
          })
          User.createUser(newUser, function (err, user) {
            if (err) throw err
            return cb(null, user)
          })
        }
      })
    })
  }))
}
