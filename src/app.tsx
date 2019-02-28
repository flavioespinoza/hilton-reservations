import * as React from 'react'
import { Style } from './app.style'
import { View, Text } from 'react-native'
import MainNavigation from './navigation/MainNavigation/MainNavigaton'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import _ from 'lodash'
import fetch from 'unfetch'
import { createHttpLink } from 'apollo-link-http'

const link = createHttpLink({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    fetch: fetch
})
const cache = new InMemoryCache()

const client = new ApolloClient({
    link: link,
    cache: cache
})

class App extends React.PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <MainNavigation/>
            </ApolloProvider>
        )
    }
}

export default App
