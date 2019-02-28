import { ReservationInput } from '../graphql/schema'

const _MutationCreateReservation = (data: ReservationInput) => {
    return `
        mutation {
            createReservation(
                data: {
                    name: "${data.$name}"
                    hotelName: "${data.$hotelName}"
                    arrivalDate: "${data.$arrivalDate}"
                    departureDate: "${data.$departureDate}"
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

export { _MutationCreateReservation }