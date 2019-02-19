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
            containerStyle={{ borderBottomColor: '#ccc', borderBottomWidth: 1 }}
            title={item.name}
            subtitle={item.hotelName}
            rightTitle={item.arrivalDate}
            rightSubtitle={item.departureDate}
            
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
