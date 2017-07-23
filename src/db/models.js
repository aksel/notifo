const mongoose = require('mongoose');
const url = require('./config').url;

mongoose.Promise = Promise;

mongoose.connect(url, { useMongoClient: true });

const testSchema = mongoose.Schema({ message: String });

const notificationSchema = mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  destination: { type: String, required: true },
  payload: { type: Object, required: true },
  read: { type: Boolean, default: false },
});

module.exports.notification = mongoose.model('Notification', notificationSchema);

module.exports.test = mongoose.model('Test', testSchema);
module.exports.execute = (promise, cb, err) => {
  if (cb) {
    return promise.then(cb).catch(err);
  }
  return promise;
};
