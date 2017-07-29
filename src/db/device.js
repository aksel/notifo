const v4 = require('uuid').v4;
const Device = require('./models').device;
const execute = require('./models').execute;

const all = userId => Device.find({ userId });

const newDevice = userId => new Device({ userId, deviceId: v4() }).save();

module.exports.new = (userId, cb, err) => execute(newDevice(userId), cb, err);
module.exports.all = (userId, cb, err) => execute(all(userId), cb, err);
