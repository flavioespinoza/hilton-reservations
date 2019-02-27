import { deepEqual } from 'assert'
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

describe('query reservations', () => {
    
    it ('should deep equal CHECK_QUERY_RESERVATIONS', async (done) => {
        let query_reservations = await _QueryReservations()
        deepEqual(CHECK_QUERY_RESERVATIONS(), query_reservations)
        done()
    })

})