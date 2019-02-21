# Hilton Reservations

React Native! Android and iOS app with the same codebase!

<img src="react-native-hilton-reservations.png" width="100%">

```typescript
// Typescript
import * as React from 'react'
import { TabBarOptions } from './app.options'
import { TabNavigator } from 'react-navigation'
import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Apollo client
const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    clientState: {
        defaults: {},
        resolvers: {},
        typeDefs: {}
    }
})

const Tabs = TabNavigator(
    {
        ['Reservations']: { screen: Reservations },
        ['Create Reservation']: { screen: CreateReservation }
    },
    TabBarOptions
)

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Tabs />
            </ApolloProvider>
        )
    }
}

export default App

```
