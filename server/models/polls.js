var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Define user schema
var pollSchema = new Schema({
  title: String,
  author: {
    id: String,
    displayName: String
  },
  votes: Number,
  dateCreated: Number,
  options: [{
    item: String,
    count: Number
  }]
})

var Poll = module.exports = mongoose.model('Poll', pollSchema) // eslint-disable-line

module.exports.createPoll = function (newPoll, cb) {
  newPoll.dateCreated = Date.now()
  newPoll.votes = 0
  newPoll.save(cb)
}

module.exports.deletePoll = function (pollId, cb) {
  Poll.remove({ _id: pollId }).exec(cb)
}

module.exports.getPollById = function (pollId, cb) {
  Poll.findOne({ _id: pollId }, cb)
}

module.exports.castVote = function (pollId, voteItem, cb) {
  Poll.findOne({ _id: pollId }, function (err, poll) {
    if (err) throw err
    poll.votes++
    poll.options.map(function (option) {
      if (option.item === voteItem) {
        option.count++
      }
    })
    poll.save(cb)
  })
}

module.exports.castOtherVote = function (pollId, voteItem, cb) {
  Poll.findOne({ _id: pollId }, function (err, poll) {
    console.log(poll)
    if (err) throw err
    poll.votes++
    poll.options.push({ item: voteItem, count: 1 })
    poll.save(cb)
  })
}

module.exports.findByUsername = function (username, cb) {
  Poll.find({ author: username }).sort({ dateCreated: -1 }).exec(cb)
}

module.exports.findByUserID = function (userID, cb) {
  Poll.find({ 'author.id': userID }).sort({ dateCreated: -1 }).exec(cb)
}

module.exports.findMostRecent = function (num, cb) {
  Poll.find({}).sort({ dateCreated: -1 }).limit(num).exec(cb)
}

module.exports.getAllRecent = function (cb) {
  Poll.find({}).sort({ dateCreated: -1 }).exec(cb)
}

module.exports.getAllPopular = function (cb) {
  Poll.find({}).sort({ votes: -1 }).exec(cb)
}
