import axios from 'axios'

const _URI = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

const _QueryReservations = async () => {
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

const _QueryCreateReservation = (obj: any) => {
    return new Promise((resolve, reject) => {
        return axios({
            url: _URI,
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
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
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
    _URI,
    _QueryCreateReservation,
    _QueryReservations,
    _MutationCreateReservation,
}