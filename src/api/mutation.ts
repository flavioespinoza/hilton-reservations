import axios from 'axios'

const _MutationCreateReservation = async (obj: any) => {
    return `
        mutation {
            createReservation(
                data: {
                    name: "${obj.firstName} ${obj.lastName}"
                    hotelName: "${obj.hotelName}"
                    arrivalDate: "${obj.arrivalDate}"
                    departureDate: "${obj.departureDate}"
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