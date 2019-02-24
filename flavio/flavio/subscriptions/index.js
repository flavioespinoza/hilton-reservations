const fs = require('fs');
const path = require('path');

module.exports.reservation = fs.readFileSync(path.join(__dirname, 'reservation.gql'), 'utf8');
