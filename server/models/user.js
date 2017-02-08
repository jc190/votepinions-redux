var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcryptjs')

// Define user schema
var userSchema = new Schema({
  displayName: String,
  name: {
    first: String,
    last: String
  },
  email: String,
  accounts: {
    local: {
      password: String
    },
    facebook: {
      id: String,
      token: String,
      name: String
    }
  },
  polls: []
})

var User = module.exports = mongoose.model('User', userSchema)

module.exports.createUser = function (newUser, cb) {
  if (newUser.accounts.local.password) {
    // Generate salt and hash password
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw err
      bcrypt.hash(newUser.accounts.local.password, salt, function (err, hash) {
        if (err) throw err
        // Store hash in your password
        newUser.accounts.local.password = hash
        newUser.save(cb)
      })
    })
  } else {
    newUser.save(cb)
  }
}

// module.exports.addPoll = (pollID, cb) => {
//
// }

module.exports.getUserByEmail = function (email, cb) {
  User.findOne({ 'email': email }, cb)
}

module.exports.findByFacebookID = function (fbID, cb) {
  User.findOne({ 'accounts.facebook.id': fbID }, cb)
}

module.exports.getUserById = function (id, cb) {
  User.findById(id, cb)
}

module.exports.genUsername = function () {
  User.count({}, function (err, count) {
    if (err) throw err
    console.log(count)
    return 'User_' + count
  })
}

module.exports.checkPassword = function (inputPassword, userPassword, cb) {
  bcrypt.compare(inputPassword, userPassword, function (err, isMatch) {
    if (err) throw err
    cb(null, isMatch)
  })
}
