const socketio = require('socket.io');
const notification = require('./db/notification');

let io;

const users = {};

const start = (server) => {
  io = socketio(server);
  io.on('connection', (socket) => {
    const user = socket.handshake.query.user;

    console.log(`CONNECTED ---- ${user} @ ${socket.id}`);
    if (users[user]) {
      users[user].push(socket.id);
    } else {
      Object.assign(users, { [user]: [socket.id] });
    }

    socket.on('get', () => {
      notification.find({ destination: user })
        .then(notifications => socket.emit('notifications', notifications))
        .catch(err => console.error(err));
    });

    socket.on('disconnect', () => {
      console.log(`DISCONNECTED ---- ${user} @ ${socket.id}`);
      users[user] = users[user].filter(id => id !== socket.id);

      if (users[user].length === 0) {
        console.log(`USER ${user} NO LONGER CONNECTED\t`);
        delete users[user];
      } else {
        console.log(`USER ${user} NOW HAS ${users[user].length} CONNECTIONS\t`);
      }
    });

    socket.on('new', ({ destination, payload }) => {
      console.log('NEW NOTIFICATION ---- ', destination,payload);
      notification.new({ destination, payload }).then(({ _id, read, timestamp }) => {
        // User is connected
        if (users[destination]) {
          users[destination].forEach(id => socket.to(id).emit('notification', { id: _id, payload, read, timestamp }));
        }
      }).catch(err => console.error(err));
    });
  });
};

const sendNotification = ({ _id, to: user, payload, read, timestamp }) => {
  if (io && users[user]) {
    users[user].forEach(socketId => io.sockets.connected[socketId].emit('notification', { id: _id, payload, read, timestamp }));
  }
};

module.exports.start = start;
module.exports.sendNotification = sendNotification;
