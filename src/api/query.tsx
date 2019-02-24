import axios from 'axios'

const _QueryReservations = async () => {
    return 
    `
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

const _QuerySendReservation = (obj: any) => {
    const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

    axios({
        url: _endpoint,
        method: 'post',
        data: {
            query: `
                mutation {
                    createReservation(
                        data: {
                                name: "${obj.firstName} ${obj.lastName}"
                                hotelName: "${obj.hotelName}"
                                arrivalDate: "${obj.arrivalDate}"
                                departureDate: "${obj.departureDate}"
                        }
                    )   {
                        id
                        name
                        hotelName
                        arrivalDate
                        departureDate
                    }
                }
        `
        }
    })
    .then(res => {
        
        return res
    })
    .catch(err => {
        console.error(err)
        alert(err.message)
    })
}

const _MutationCreateReservation = async (name: string, hotel: string, arrivalDate: string, departureDate: string) => {
    return `
        mutation {
            createReservation(
                data: {
                    name: "${name}"
                    hotelName: "${hotel}"
                    arrivalDate: "${arrivalDate}"
                    departureDate: "${departureDate}"
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

export {
    _QuerySendReservation,
    _QueryReservations,
    _MutationCreateReservation,
}