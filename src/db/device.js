const v4 = require('uuid').v4;
const Device = require('./models').device;
const execute = require('./models').execute;

const find = userId => Device.find({ userId });

const newDevice = userId => new Device({ userId, deviceId: v4() }).save();

module.exports.new = (userId, cb, err) => execute(newDevice(userId), cb, err);
module.exports.find = (userId, cb, err) => execute(find(userId), cb, err);
