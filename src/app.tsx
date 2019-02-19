import * as React from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'

import ApolloClient from 'apollo-boost'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider, graphql } from 'react-apollo'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'

const cache = new InMemoryCache()

const stateLink = withClientState({
    cache,
    resolvers: {
        Mutation: {
            updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
                const data = {
                    networkStatus: {
                        __typename: 'NetworkStatus',
                        isConnected
                    }
                }
                cache.writeData({ data })
                return null
            }
        }
    }
})

// Apollo client
const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    cache,
    clientState: {
        defaults: {
            networkStatus: {
                __typename: 'NetworkStatus',
                isConnected: true
            }
        },
        resolvers: {
            Mutation: {
                updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
                    cache.writeData({ data: { isConnected } })
                    return null
                }
            }
        }
    }
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
