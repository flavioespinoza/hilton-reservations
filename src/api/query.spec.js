import { equal, notEqual, deepEqual } from 'assert'
import { _QueryReservations } from './query'

const CHECK_QUERY_RESERVATIONS = () => {
    return `
        {
            reservations {
                name
                hotelName
                arrivalDate
                departureDate
                id
            }
        }
    `
}

describe('query reservations', function () {
    
    it ('should deep equal CHECK_QUERY', async function (done) {
        let query_reservations = await _QueryReservations()
        deepEqual(CHECK_QUERY_RESERVATIONS(), query_reservations)
        done()
    })

})