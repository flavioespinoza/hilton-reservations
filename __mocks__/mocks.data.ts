import _ from 'lodash'
import Chance from 'chance'

const chance = new Chance()

const createReservation = () => {
    return {
        name: `${chance.first()} ${chance.last()}`,
        hotelName: 'Hilton Test',
        arrivalDate: `${chance.date({ string: true })}`,
        departureDate: `${chance.date({ string: true })}`,
        id: `${chance.guid()}`
    }
}

const reservations = (length: number) => {
    let len

    if (!length || !_.isNumber(length)) {
        len = 12
    } else if (length === 0) {
        len = 12
    } else {
        len = length
    }

    const res = []

    for (let i = 0; i < len; i++) {
        res.push(createReservation())
    }

    return res
}

export { createReservation, reservations }
