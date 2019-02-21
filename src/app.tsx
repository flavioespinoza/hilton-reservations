import * as React from 'react'
import { TabNavigator } from 'react-navigation'
import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Apollo client
const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

const tabBarOptions = {
    tabBarOptions: {
        activeTintColor: '#EF5356',
        allowFontScaling: true,
        inactiveTintColor: 'gray',
        pressColor: '#EF5356',
        pressOpacity: 0.5,
        showIcon: false,
        showLabel: true,
        upperCaseLabel: true,
        indicatorStyle: {
            backgroundColor: '#EF5356',
            opacity: 100
        },
        activeTabStyle: {
            backgroundColor: 'red'
        },
        style: {
            backgroundColor: 'white'
        }
    },
    animationEnabled: true,
    tabBarVisible: true,
    swipeEnabled: true
}

const Tabs = TabNavigator(
    {
        ['Reservations']: { screen: Reservations },
        ['Create Reservation']: { screen: CreateReservation }
    },
    tabBarOptions
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
