import * as React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'

import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'

// Apollo client
const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev' }),
    cache: new InMemoryCache().restore({})
})

const RESERVATIONS_QUERY = gql`
    {
        reservations {
            id
            hotelName
            arrivalDate
            departureDate
            name
        }
    }
`

// ReservationsList Component
const ReservationsList = graphql(RESERVATIONS_QUERY)(({ data }: any) => {
    const { loading, reservations } = data

    if (loading)
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )

    return (
        <View style={AppStyle.container}>
            {reservations.map(({ id, hotelName, arrivalDate, departureDate, name }: any) => (
                <View key={id} style={{width: '100%', backgroundColor: 'gainsboro', marginBottom: 12}}>
                    <Text style={AppStyle.welcome}>{hotelName}</Text>
                    <Text style={AppStyle.welcome}>{arrivalDate}</Text>
                    <Text style={AppStyle.welcome}>{departureDate}</Text>
                    <Text style={AppStyle.welcome}>{name}</Text>
                </View>
            ))}
        </View>
    )
})

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <View style={AppStyle.container}>
                    <ReservationsList />
                </View>
            </ApolloProvider>
        )
    }
}
