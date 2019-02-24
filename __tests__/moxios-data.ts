import Chance from 'chance'
import { string } from 'prop-types';

const chance = new Chance()

const reservation = {
    name: `${chance.first()} ${chance.last()}`,
    hotelName: 'Hilton Test',
    arrivalDate: `${chance.date({string: true})}`,
    departureDate: `${chance.date({string: true})}`,
    id: `${chance.guid()}`
}

export {
    reservation
}