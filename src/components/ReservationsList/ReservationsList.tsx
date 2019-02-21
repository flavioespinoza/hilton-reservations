import * as React from 'react'
import { Style } from './ReservationsList.style'
import { SectionList, View, Text, Platform, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts'
import AlertConfirm from '../AlertConfirm/AlertConfirm'
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

interface Props {
    sections: ReadonlyArray<any> | any
}

interface State {
    showAlert: boolean
    alertTitle: string | undefined
    alertMessage: string | undefined
    alert_Name: string | undefined
    alert_HotelName: string | undefined
    alert_ArrivalDate: string | undefined
    alert_DepartureDate: string | undefined
    alert_ID: string | undefined
    confirmCancel: boolean
}

class ReservationSectionList extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined,
            alert_Name: undefined,
            alert_HotelName: undefined,
            alert_ArrivalDate: undefined,
            alert_DepartureDate: undefined,
            alert_ID: undefined,
            confirmCancel: false
        }
    }

    private _platformComponent = () => {
        if (Platform.OS == 'ios') {
            return (
                <View style={Style.listHeaderComponent}>
                    <Text style={Style.listHeaderText} />
                </View>
            )
        } else {
            return null
        }
    }

    private _keyExtractor = (item: any, index: any) => _.toString(index)

    private _renderItem = ({ item }: any) => (
        <View style={Style.card}>
            <ListItem
                title={item.name}
                subtitle={
                    <View style={Style.cardContent}>
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
                    this._onPress({ item })
                }}
            />
        </View>
    )

    private _showAlert = (item: any): void => {
        this.setState({
            alertTitle: 'Reservation Confirmed!',
            alertMessage: 'Details below',
            alert_ID: item.id,
            alert_Name: item.name,
            alert_HotelName: item.hotelName,
            alert_ArrivalDate: item.arrivalDate,
            alert_DepartureDate: item.departureDate,
            showAlert: true
        })
    }

    private _hideAlert = (): void => {
        this.setState({
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined,
            alert_Name: undefined,
            alert_HotelName: undefined,
            alert_ArrivalDate: undefined,
            alert_DepartureDate: undefined,
            alert_ID: undefined,
            confirmCancel: false
        })
    }

    private _onPress = ({ item }: any): void => {
        this._showAlert(item)
    }

    private _confirmReservation = (item: any) => {
        console.info('Confirm Reservation', item)
        this._hideAlert()
    }

    private _cancelReservation = () => {
        this.setState({
            confirmCancel: true
        })
    }

    private _confirmCancelReservation = (item: any) => {
        this.setState({
            showAlert: false
        })
        setTimeout(() => {
            this._hideAlert()
        }, 1000)
    }

    render() {
        return (
            <View style={Style.container}>
                <SectionList
                    ListHeaderComponent={this._platformComponent()}
                    sections={this.props.sections}
                    renderSectionHeader={({ section }) => (
                        <Text style={Style.SectionHeaderStyle}> {section.title} </Text>
                    )}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
                <AlertConfirm showAlert={this.state.showAlert} stateProps={this.state}  />
            </View>
        )
    }
}



const ReservationsList = graphql(RESERVATIONS_QUERY)(({ data }: any) => {
    const { loading, reservations } = data

    if (!reservations) return loading

    _.reverse(reservations)
    
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

    return <ReservationSectionList sections={hiltonHotels} />
})

export default ReservationsList
