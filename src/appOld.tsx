import * as React from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import { Header } from 'react-native-elements'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'

// Apollo client
const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

export default class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Header
                    placement={'center'}
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff'
                    }}
                    centerComponent={{
                        text: 'Screen Title',
                        style: { color: '#fff' }
                    }}
                    rightComponent={{
                        icon: 'more-vert',
                        type: 'MaterialIcons',
                        color: '#fff'
                    }}
                />
                {/* <Reservations screenTitle={'Reservations'} /> */}
                <CreateReservation />
            </ApolloProvider>
        )
    }
}
