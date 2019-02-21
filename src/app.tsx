import * as React from 'react'
import { Style } from './app.style'
import MainNavigation from './navigation/MainNavigation/MainNavigaton'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { withClientState } from 'apollo-link-state'

import { ApolloProvider, Query, graphql } from 'react-apollo'

import gql from 'graphql-tag'

const cache = new InMemoryCache();

const typeDefs = `
    type Todo {
        id: Int!
        text: String!
        completed: Boolean!
    }

    type Mutation {
        addTodo(text: String!): Todo
        toggleTodo(id: Int!): Todo
    }

    type Query {
        visibilityFilter: String
        todos: [Todo]
    }
`

const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
    cache,
    clientState: {
        defaults: {
            isConnected: true
        },
        resolvers: {
            Mutation: {
                updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
                    cache.writeData({ data: { isConnected } })
                    return null
                }
            }
        },
        typeDefs: typeDefs
    }
})

const UPDATE_NETWORK_STATUS = gql`
    mutation updateNetworkStatus($isConnected: Boolean) {
        updateNetworkStatus(isConnected: $isConnected) @client
    }
`

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <MainNavigation />
            </ApolloProvider>
        )
    }
}

export default App