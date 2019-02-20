import * as React from 'react'
import { Style } from './ReservationsList.style'
import { SectionList, View, Text, StyleSheet, Platform } from 'react-native'
import { ListItem, withTheme } from 'react-native-elements'
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

    if (!reservations) return loading

    _.remove(reservations, (obj: any) => Object.values(obj).includes(''))

    const hiltonHotels = _.map(
        _.groupBy(
            _.filter(reservations, (obj: any) => {
                let str = _.toLower(obj.hotelName)
                return str.indexOf('hilton') >= 0
            }),
            'hotelName'
        ),
        (val, key) => {
            return {
                title: `${key}`,
                data: val
            }
        }
    )

    console.log('hiltonHotels', hiltonHotels)

    const _keyExtractor = (item: any, index: any) => _.toString(index)

    const _alert = (item: any) => {
        let alertMsg = `ID: ${item.id} \n ${item.hotelName} \n ${item.name} \n Arrival: ${item.arrivalDate} \n Departure: ${item.departureDate}`
        alert(alertMsg)
    }

    const _renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <ListItem
                title={item.name}
                subtitle={
                    <View style={styles.cardContent}>
                        <View style={{ padding: 8, width: '100%', height: 48 }}>
                            <Text>{item.hotelName}</Text>
                            <Text style={{ fontSize: 11, color: 'gray' }}>{item.id}</Text>
                        </View>
                        <View style={{ padding: 8, width: '100%', height: 48 }}>
                            <Text style={{ fontSize: 11 }}>Arrival: {item.arrivalDate}</Text>
                            <Text style={{ fontSize: 11 }}>Depart: {item.arrivalDate}</Text>
                        </View>
                    </View>
                }
                bottomDivider={true}
                onPress={() => {
                    _alert(item)
                }}
            />
        </View>
    )

    const _platformComponent = () => {
        if (Platform.OS == 'ios') {
            return (
                <View style={styles.listHeaderComponent}>
                    <Text style={styles.listHeaderText}></Text>
                </View>
            )
        }
        else {
            return null
        }
    }

    return (
        <View style={Style.container}>
            <SectionList
                ListHeaderComponent={_platformComponent()}
                sections={hiltonHotels}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
                )}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
            />
        </View>
    )
})

export default ReservationsList

const styles = StyleSheet.create({
    listHeaderComponent: {
        height: 40,
        color: 'white',
        backgroundColor: '#EF5356'
    },
    listHeaderText: {
        height: 40,
        paddingTop: 24
    },
    SectionHeaderStyle: {
        backgroundColor: '#EF5356',
        fontSize: 10,
        padding: 5,
        color: 'white'
    },

    SectionListItemStyle: {
        fontSize: 15,
        padding: 20,
        color: 'black',
        backgroundColor: 'white'
    },
    card: {
        color: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 4,
        marginBottom: 4
    },
    cardContent: {
        color: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
        borderRadius: 32,
        margin: 0
    }
})
