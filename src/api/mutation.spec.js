import { deepEqual } from 'assert'
import { _MutationCreateReservation } from './mutation'

const INPUT = {
    firstName : 'Fred',
    lastName: 'Flintstone',
    hotelName: 'Unit Test Hilton',
    arrivalDate: '1/1/1',
    departureDate: '2/1/1'
}

const CHECK_MUTATION_CREATE_RESERVATION = () => {
    return `
        mutation {
            createReservation(
                data: {
                    name: "Fred Flintstone"
                    hotelName: "Unit Test Hilton"
                    arrivalDate: "1/1/1"
                    departureDate: "2/1/1"
                }
            ) 
            {
                id
                name
                hotelName
                arrivalDate
                departureDate
            }
        }
    `
}

describe('mutation create reservation', () => {
    
    it ('should deep equal CHECK_MUTATION_CREATE_RESERVATION', async (done) => {
        let mutation_create_reservation = await _MutationCreateReservation(INPUT)
        deepEqual(CHECK_MUTATION_CREATE_RESERVATION(), mutation_create_reservation)
        done()
    })

})
