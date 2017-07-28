const Notification = require('./models').notification;
const execute = require('./models').execute;

const find = (destination, skip = 0, limit = 10) => Notification
  .aggregate({ $match: { destination } })
  .sort({ timestamp: -1 })
  .skip(Number(skip))
  .project({ _id: 0, id: '$_id', destination: 1, payload: 1, timestamp: 1, read: 1 })
  .limit(Number(limit));

const newNotification = (destination, payload) => new Notification({ destination, payload }).save();
const markAsRead = id => Notification.update({ _id: id }, { read: true });

module.exports.new = ({ destination, payload }, cb, err) => execute(newNotification(destination, payload), cb, err);
module.exports.markAsRead = (id, cb, err) => execute(markAsRead(id), cb, err);
module.exports.all = (cb, err) => execute(Notification.find({}), cb, err);
module.exports.find = ({ destination, skip, limit }, cb, err) => execute(find(destination, skip, limit), cb, err);
