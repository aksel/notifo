const Agenda = require('agenda');
const connectionString = require('../db/config');

const sendNotification = require('../socketServer').sendNotification;

const agenda = new Agenda({ db: { address: connectionString, collection: 'agendaJobs' }});

agenda.define('notification', { priority: 'highest' }, (job) => sendNotification(job.attrs.data.notification));

const scheduleNotification = (notification, when) => {
  agenda.schedule(when, 'notification', { notification });
};

module.exports.scheduleNotification = scheduleNotification;
