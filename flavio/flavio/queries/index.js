const fs = require('fs');
const path = require('path');

module.exports.reservations = fs.readFileSync(path.join(__dirname, 'reservations.gql'), 'utf8');
module.exports.reservation = fs.readFileSync(path.join(__dirname, 'reservation.gql'), 'utf8');
module.exports.reservationsConnection = fs.readFileSync(path.join(__dirname, 'reservationsConnection.gql'), 'utf8');
module.exports.node = fs.readFileSync(path.join(__dirname, 'node.gql'), 'utf8');
