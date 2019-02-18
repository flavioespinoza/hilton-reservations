import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Axios from 'axios'

export const endpointURI = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
export const client = new ApolloClient({
	uri: endpointURI,
})

export const query = {
    reservations: () => {
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
    },
    createReservation: (name: string, hotel: string, arrivalDate: string, departureDate: string) => {
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
}

