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

interface Props {
    sections: ReadonlyArray<any> | any
}

interface State {
    showAlert: boolean
    alertMessage: string | undefined
    alertTitle: string | undefined
}

class ReservationSectionList extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined
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
                onPress={() => {this._onPress(item)}}
            />
        </View>
    )

    private _showAlert = (title: string, message: string): void => {
        this.setState({
            alertMessage: message,
            showAlert: true
        })
    }

    private _hideAlert = (): void => {
        this.setState({
            alertMessage: undefined,
            showAlert: false
        })
    }

    private _onPress = ({ item }: any): void => {
        this._showAlert(item.title, item.name)
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
                <AwesomeAlert
                    alertContainerStyle={{ borderRadius: 2 }}
                    show={this.state.showAlert}
                    showProgress={false}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    messageStyle={{ textAlign: 'center', color: 'red' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonStyle={Style.btnPrimary}
                    confirmText='OK, GOT IT!'
                    onCancelPressed={() => {
                        this._hideAlert()
                    }}
                    onConfirmPressed={() => {
                        this._hideAlert()
                    }}
                />
            </View>
        )
    }
}

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

    return (<ReservationSectionList sections={hiltonHotels} />)

})

export default ReservationsList
