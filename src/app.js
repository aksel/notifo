const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const socketServer = require('./socketServer');
//const router = require('./routes');

const PORT = process.env.PORT || 4000;

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//app.use(router);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => res.status(err.status ? err.status : 500).json({ error: err }));

const server = app.listen(PORT);

socketServer.start(server);

const gracefulShutdown = () => {
  server.close(() => process.exit());
  setTimeout(() => process.exit(), 10000);
};

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);
