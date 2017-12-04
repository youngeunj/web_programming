var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  eventName: {type: String},
  place: {type: String},
  startTime: {type: Number},
  endTime: {type: Number},
  eventExp: {type: String},
  groupName: {type: String},
  groupExp:{type: String},
  category:{type: String},
  price:{type: String, defult:0}
});

var Event = mongoose.model('Event', schema);

module.exports = Event;
