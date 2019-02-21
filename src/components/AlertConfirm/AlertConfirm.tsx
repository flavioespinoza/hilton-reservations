import * as React from 'react'
import { Style } from './AlertConfirm.style'
import { SectionList, View, Text, Platform, TouchableOpacity } from 'react-native'

import AwesomeAlert from 'react-native-awesome-alerts'

interface Props {
    propsState: {} | any
    showAlert: boolean
   
    _cancelReservation: any
    _confirmCancelReservation: any
    _confirmReservation: any
    _showAlert: any
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

class AlertConfirm extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        const { propsState } = this.props

        this.state = {
            showAlert: this.props.showAlert,
            alertMessage: propsState.alertMessage,
            alertTitle: propsState.alertTitle,
            alert_Name: propsState.alert_Name,
            alert_HotelName: propsState.alert_HotelName,
            alert_ArrivalDate: propsState.alert_ArrivalDate,
            alert_DepartureDate: propsState.alert_DepartureDate,
            alert_ID: propsState.alert_ID,
            confirmCancel: propsState.confirmCancel
        }
    }

    

    render() {
        return (
            <AwesomeAlert
                show={this.state.showAlert}
                title={this.state.alert_Name}
                titleStyle={Style.alertTitle}
                customView={
                    <View style={Style.cardContent}>
                        <View style={{ padding: 4, width: '100%', height: 48 }}>
                            <Text style={{ textAlign: 'left', width: '100%', paddingTop: 2, paddingBottom: 2 }}>
                                {this.state.alert_HotelName}
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    width: '100%',
                                    fontSize: 11,
                                    color: 'gray',
                                    paddingTop: 2,
                                    paddingBottom: 2
                                }}
                            >
                                {this.state.alert_ID}
                            </Text>
                        </View>
                        <View style={{ padding: 4, width: '100%', height: 48 }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    width: '100%',
                                    fontSize: 11,
                                    paddingTop: 2,
                                    paddingBottom: 2
                                }}
                            >
                                Arrival: {this.state.alert_ArrivalDate}
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    width: '100%',
                                    fontSize: 11,
                                    paddingTop: 2,
                                    paddingBottom: 2
                                }}
                            >
                                Depart: {this.state.alert_DepartureDate}
                            </Text>
                        </View>
                        <View style={{ padding: 4, width: '100%', height: 60 }}>
                            {this.state.confirmCancel ? (
                                <Text style={Style.confirmCancelReservationMsg}>Are you sure you want to cancel?</Text>
                            ) : null}
                            {this.state.confirmCancel ? (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: '10%', height: 40 }} />
                                    <TouchableOpacity
                                        style={Style.confirmCancelReservationBtn}
                                        onPress={() => {
                                            this.props._confirmCancelReservation(this.state)
                                        }}
                                    >
                                        <Text style={Style.alertBtn}>Yes, Cancel Reservation</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '10%', height: 40 }} />
                                </View>
                            ) : (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: '15%', height: 40 }} />
                                    <TouchableOpacity
                                        style={Style.cancelReservationBtn}
                                        onPress={() => {
                                            this.props._cancelReservation()
                                        }}
                                    >
                                        <Text style={Style.alertBtn}>Cancel Reservation</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '15%', height: 40 }} />
                                </View>
                            )}
                        </View>
                        <View style={{ padding: 4, width: '100%', height: 84 }}>
                            {this.state.confirmCancel ? (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: '10%', height: 40 }} />
                                    <TouchableOpacity
                                        style={Style.keepReservationBtn}
                                        onPress={() => {
                                            this.props._confirmReservation(this.state)
                                        }}
                                    >
                                        <Text style={Style.alertBtn}>Keep Reservation</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '10%', height: 40 }} />
                                </View>
                            ) : (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: '15%', height: 40 }} />
                                    <TouchableOpacity
                                        style={Style.confirmReservationBtn}
                                        onPress={() => {
                                            this.props._confirmReservation(this.state)
                                        }}
                                    >
                                        <Text style={Style.alertBtn}>Confirm Reservation</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: '15%', height: 40 }} />
                                </View>
                            )}
                        </View>
                    </View>
                }
                alertContainerStyle={{ borderRadius: 2 }}
                contentContainerStyle={{ width: '80%' }}
                showProgress={false}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={false}
                showCancelButton={false}
            />
        )
    }
}

export default AlertConfirm
