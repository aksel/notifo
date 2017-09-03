const Agenda = require('agenda');
const connectionString = require('../db/config');

const agenda = new Agenda({ db: { address: connectionString, collection: 'agendaJobs' }});

module.exports = agenda;