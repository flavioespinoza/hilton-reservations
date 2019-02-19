import React, { Component } from "react";
import { ScrollView, FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Style } from './ReservationsList.style'
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

    if (loading)
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )

    return (
        <View style={Style.container}>
            {reservations.map(({ id, hotelName, arrivalDate, departureDate, name }: any) => (
                <View key={id} style={{width: '100%', backgroundColor: 'gainsboro', marginBottom: 12}}>
                    <Text style={Style.welcome}>{hotelName}</Text>
                    <Text style={Style.welcome}>{arrivalDate}</Text>
                    <Text style={Style.welcome}>{departureDate}</Text>
                    <Text style={Style.welcome}>{name}</Text>
                </View>
            ))}
        </View>
    )
})

export default ReservationsList