import * as React from 'react'
import { Style } from './AlertConfirm.style'
import { View, Text, TouchableOpacity } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import _ from 'lodash'

interface Props {
    showAlert: boolean
    stateProps: any
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

        const { showAlert, stateProps } = this.props

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

    componentWillReceiveProps(newProps: any) {
        console.log('newProps', newProps)
        this.setState({
            alertTitle: 'Reservation Confirmed!',
            alertMessage: 'Details below',
            alert_ID: newProps.id,
            alert_Name: newProps.name,
            alert_HotelName: newProps.hotelName,
            alert_ArrivalDate: newProps.arrivalDate,
            alert_DepartureDate: newProps.departureDate,
            showAlert: newProps.showAlert
        }) 
    }

    componentDidMount(){
        console.log('componentDidMount() --> stateProps', this.props.stateProps)
        this._showAlert(this.props.stateProps)
    }

    private _showAlert = (obj: any): void => {
        this.setState({
            alertTitle: 'Reservation Confirmed!',
            alertMessage: 'Details below',
            alert_ID: obj.id,
            alert_Name: obj.name,
            alert_HotelName: obj.hotelName,
            alert_ArrivalDate: obj.arrivalDate,
            alert_DepartureDate: obj.departureDate,
            showAlert: obj.showAlert
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
            <AwesomeAlert
                    show={this.state.showAlert}
                    title={this.props.stateProps.alert_Name}
                    titleStyle={Style.alertTitle}
                    customView={
                        <View style={Style.cardContent}>
                            <View style={{ width: '100%', height: 48 }}>
                                <Text style={{ textAlign: 'left', width: '100%', paddingTop: 2, paddingBottom: 2 }}>
                                    {this.props.stateProps.alert_HotelName}
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
                                    {this.props.stateProps.alert_ID}
                                </Text>
                            </View>
                            <View style={{ width: '100%', height: 48 }}>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        width: '100%',
                                        fontSize: 11,
                                        paddingTop: 2,
                                        paddingBottom: 2
                                    }}
                                >
                                    Arrival: {this.props.stateProps.alert_ArrivalDate}
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
                                    Depart: {this.props.stateProps.alert_DepartureDate}
                                </Text>
                            </View>
                            <View style={{ width: '100%', height: 60 }}>
                                {this.state.confirmCancel ? (
                                    <Text style={Style.confirmCancelReservationMsg}>
                                        Are you sure you want to cancel?
                                    </Text>
                                ) : null}
                                {this.state.confirmCancel ? (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: '10%', height: 40 }} />
                                        <TouchableOpacity
                                            style={Style.confirmCancelReservationBtn}
                                            onPress={() => {
                                                this._confirmCancelReservation(this.props.stateProps)
                                            }}
                                        >
                                            <Text style={Style.alertBtn}>Yes, Cancel Reservation</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '10%', height: 40 }} />
                                    </View>
                                ) : (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: '10%', height: 40 }} />
                                        <TouchableOpacity
                                            style={Style.cancelReservationBtn}
                                            onPress={() => {
                                                this._cancelReservation()
                                            }}
                                        >
                                            <Text style={Style.alertBtn}>Cancel Reservation</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '10%', height: 40 }} />
                                    </View>
                                )}
                            </View>
                            <View style={{ width: '100%', height: 84 }}>
                                {this.state.confirmCancel ? (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: '10%', height: 40 }} />
                                        <TouchableOpacity
                                            style={Style.keepReservationBtn}
                                            onPress={() => {
                                                this._confirmReservation(this.props.stateProps)
                                            }}
                                        >
                                            <Text style={Style.alertBtn}>Keep Reservation</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '10%', height: 40 }} />
                                    </View>
                                ) : (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ width: '10%', height: 40 }} />
                                        <TouchableOpacity
                                            style={Style.confirmReservationBtn}
                                            onPress={() => {
                                                this._confirmReservation(this.props.stateProps)
                                            }}
                                        >
                                            <Text style={Style.alertBtn}>Confirm Reservation</Text>
                                        </TouchableOpacity>
                                        <View style={{ width: '10%', height: 40 }} />
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
