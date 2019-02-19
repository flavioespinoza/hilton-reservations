import React, { Component } from 'react'
import { Style } from './ReservationsList.style'
import { ScrollView, FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts'
import _ from 'lodash'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
const ReservationsList = graphql(RESERVATIONS_QUERY)(({ data }: any) => {
    const { loading, reservations } = data

    const _keyExtractor = (item: any, index: any) => _.toString(index)

    const _renderItem = ({ item }: any) => (
        <ListItem
            containerStyle={{ margin: 0, padding: 0 }}
            contentContainerStyle={Style.listItemContainer}
            title={item.name}
            subtitle={
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ padding: 6, width: '50%', height: 40, backgroundColor: 'powderblue' }}>
                        <Text>{item.hotelName}</Text>
                        <Text style={{fontSize: 11, color: 'gray'}}>{item.id}</Text>
                    </View>
                    <View style={{ padding: 6, width: '50%', height: 40, backgroundColor: 'skyblue' }}>
                        <Text style={{fontSize: 11}}>Arrival: {item.arrivalDate}</Text>
                        <Text style={{fontSize: 11}}>Depart: {item.arrivalDate}</Text>
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
})

export default ReservationsList
