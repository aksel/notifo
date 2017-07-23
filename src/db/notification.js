const Notification = require('./models').notification;
const execute = require('./models').execute;

const find = (id, skip = 0, limit = 10) => Notification
  .aggregate({ $match: { destination: id } })
  .sort({ timestamp: -1 })
  .skip(Number(skip))
  .limit(Number(limit));

const newNotification = (destination, payload) => new Notification({ destination, payload }).save();
const markAsRead = id => Notification.update({ _id: id }, { read: true });

module.exports.new = ({ destination, payload }, cb, err) => execute(newNotification(destination, payload), cb, err);
module.exports.markAsRead = (id, cb, err) => execute(markAsRead(id), cb, err);
module.exports.all = (cb, err) => execute(Notification.find({}), cb, err);
module.exports.find = ({ id, skip, limit }, cb, err) => execute(find(id, skip, limit), cb, err);
