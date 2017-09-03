const Agenda = require('agenda');
const connectionString = require('../db/config').url;

const sendNotification = require('../socketServer').sendNotification;

let agenda;
const start = () => {
  agenda = new Agenda({ db: { address: connectionString, collection: 'agendaJobs' }});
  agenda.on('ready', () => agenda.start());
  agenda.define('notification', { priority: 'highest' }, (job) => sendNotification(job.attrs.data.notification));
};

const scheduleNotification = (notification, when) => {
  if (agenda) {
    agenda.schedule(when, 'notification', { notification });
  }
};

module.exports.start = start;
module.exports.scheduleNotification = scheduleNotification;
