const socketio = require('socket.io');
const notification = require('./db/notification');

let io;

const users = {};

const start = (server) => {
  io = socketio(server);
  console.log('io',io);

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
        console.log(`USER ${users[user]} NO LONGER CONNECTED\t`);
        delete users[user];
      } else {
        console.log(`USER ${users[user]} NOW HAS ${users[user].length} CONNECTIONS\t`);
      }
    });

    socket.on('new', ({ destination, payload }) => {
      console.log(destination,payload);
      notification.new(destination, payload).then(({ _id, read, timestamp }) => {
        // User is connected
        if (users[destination]) {
          users[destination].forEach(id => socket.to(id).emit('notification', { id: _id, payload, read, timestamp }));
        }
      }).catch(err => console.error(err));
    });
  });
};

module.exports.start = start;
