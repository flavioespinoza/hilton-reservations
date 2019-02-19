import * as React from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
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

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                {/* <Reservations screenTitle={'Reservations'} /> */}
                <CreateReservation />
            </ApolloProvider>
        )
    }
}
