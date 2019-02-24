const fs = require('fs');
const path = require('path');

module.exports.createReservation = fs.readFileSync(path.join(__dirname, 'createReservation.gql'), 'utf8');
module.exports.updateReservation = fs.readFileSync(path.join(__dirname, 'updateReservation.gql'), 'utf8');
module.exports.deleteReservation = fs.readFileSync(path.join(__dirname, 'deleteReservation.gql'), 'utf8');
module.exports.upsertReservation = fs.readFileSync(path.join(__dirname, 'upsertReservation.gql'), 'utf8');
module.exports.updateManyReservations = fs.readFileSync(path.join(__dirname, 'updateManyReservations.gql'), 'utf8');
module.exports.deleteManyReservations = fs.readFileSync(path.join(__dirname, 'deleteManyReservations.gql'), 'utf8');
