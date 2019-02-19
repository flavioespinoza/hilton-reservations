import * as React from 'react'
import { Style } from './NewReservation.style'
import { View, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import gql from 'graphql-tag'
import { ApolloProvider, graphql, Mutation } from 'react-apollo'
import _ from 'lodash'
import Chance from 'chance'

const chance = new Chance()

const NEW_RESERVATION = (name: string, hotelName: string, arrivalDate: string, departureDate: string) => {
    let mutation = `
        {
            createReservation {
                createReservation(
                    data: {
                        name: "${name}"
                        hotelName: "${hotelName}"
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
        }
    `
    return gql`
        ${mutation}
    `
}

const NewReservation = graphql(NEW_RESERVATION(name: string, hotelName: string, arrivalDate: string, departureDate: string))(({data}: any)) => {
    const { loading, createReservation } = data
    
    const _keyExtractor = (item: any, index: any) => _.toString(index)

    const _renderItems = ({ item }: any) => (
        <ListItem
            contentContainerStyle={Style.listItemContainer}
            containerStyle={{ margin: 0, padding: 0 }}
            title={item.name}
            subTitle={
                <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ padding: 4, width: '50%', height: 48, backgroundColor: 'powderblue' }}>
                    <Text>{item.hotelName}</Text>
                    <Text style={{ fontSize: 11, color: 'gray' }}>{item.id}</Text>
                </View>
                <View style={{ padding: 4, width: '50%', height: 48, backgroundColor: 'skyblue' }}>
                    <Text style={{ fontSize: 11 }}>Arrival: {item.arrivalDate}</Text>
                    <Text style={{ fontSize: 11 }}>Depart: {item.arrivalDate}</Text>
                </View>
            </View>
            }
            bottomDivider={true}
        />
    )

    if (loading) {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )
    }

    return (
        <View style={Style.container}>
            <FlatList keyExtractor={_keyExtractor} data={reservations} renderItem={_renderItem} />
        </View>
    )

}

export default NewReservation