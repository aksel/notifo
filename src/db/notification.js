// Mocked notification model

const v4 = require('uuid').v4;

const notifications = [];

const find = destination => new Promise(resolve => resolve(notifications.filter(notification => notification.destination === destination)));

const newNotification = (destination, payload) => new Promise((resolve) => {
  notifications.unshift({ id: v4(), timestamp: Date.now(), destination, read: false, payload });
  resolve(notifications[0]);
});

const markAsRead = id => new Promise((resolve, reject) => {
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
    resolve(notification);
  } else {
    reject({ status: 400 });
  }
});

module.exports.all = () => new Promise(resolve => resolve(notifications));
module.exports.new = newNotification;
module.exports.find = find;
module.exports.markAsRead = markAsRead;
