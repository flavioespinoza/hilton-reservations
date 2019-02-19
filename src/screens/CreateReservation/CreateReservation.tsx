/// <reference path='../../index.d.ts' />
import * as React from 'react'
import { View, TextInput, Text, Picker, Platform } from 'react-native'
import { DateSelection } from '../../components/DateSelection/DateSelection'
import { Button } from 'react-native-elements'
import { Style } from './CreateReservation.style'
import _formatDate from '../../utils/formatDate'
import _ from 'lodash'
import AwesomeAlert from 'react-native-awesome-alerts'
import PickerModal from '../../components/ModalPicker/ModalPicker'
import { _getHotelList } from '../../api/getHotelList'

interface Props {}

interface State {
    arrivalDate: string | any
    departureDate: string | any
    hotel: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    name: string | undefined
    reservationId: string | undefined
    isDateTimePickerVisible: boolean
    dateType: any
    showAlert: boolean
    alertMessage: string | undefined
    alertTitle: string | undefined
    text_1: string | undefined
    text_2: string | undefined
    pickerOpacity: number
    opacityOfOtherItems: number
    textInputValue: string
    hotelItems: [] | any
}

class CreateReservation extends React.PureComponent<Props, State> {
    private inputRefs = {
        firstNameTextInput: React.createRef<TextInput>(),
        lastNameTextInput: React.createRef<TextInput>()
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            arrivalDate: undefined,
            departureDate: undefined,
            hotel: undefined,
            firstName: undefined,
            lastName: undefined,
            name: undefined,
            reservationId: undefined,
            isDateTimePickerVisible: false,
            dateType: null,
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined,
            text_1: 'Text 1',
            text_2: 'Text 2',
            pickerOpacity: 0,
            opacityOfOtherItems: 1,
            textInputValue: 'hello textInputValue',
            hotelItems: []
        }
    }

    componentDidMount() {
        let _hotel_list = _getHotelList()
        this.setState({
            hotelItems: _hotel_list
        })
    }

    private _showAlert = (title: string, message: string): void => {
        this.setState({
            alertTitle: title,
            alertMessage: message,
            showAlert: true
        })
    }

    private _hideAlert = (): void => {
        this.setState({
            alertTitle: undefined,
            alertMessage: undefined,
            showAlert: false
        })
    }

    private _setArrivalDate = (date: Date): void => {
        let arrival = _formatDate(date)
        this.setState({
            arrivalDate: arrival,
            isDateTimePickerVisible: false,
            dateType: null
        })
    }

    private _setDepartureDate = (date: Date): void => {
        let departure = _formatDate(date)
        this.setState({
            departureDate: departure,
            isDateTimePickerVisible: false,
            dateType: null
        })
    }

    private _handleDate = (date: Date, type: string): void => {
        if (type === 'arrival') {
            if (this.state.departureDate) {
                let ts_departure = new Date(this.state.departureDate).getTime()
                let ts_arrival = new Date(date).getTime()
                let ts_diff = _.subtract(ts_departure, ts_arrival)
                if (Math.sign(ts_diff) === -1) {
                    setTimeout(() => {
                        this._showAlert('Arrival Date Alert!', 'Arrival date must be before Departure date.')
                    }, 200)
                } else {
                    this._setArrivalDate(date)
                }
            } else {
                this._setArrivalDate(date)
            }
        } else if (type === 'departure') {
            if (this.state.arrivalDate) {
                let ts_departure = new Date(date).getTime()
                let ts_arrival = new Date(this.state.arrivalDate).getTime()
                let ts_diff = _.subtract(ts_departure, ts_arrival)
                if (Math.sign(ts_diff) === -1) {
                    setTimeout(() => {
                        this._showAlert('Departure Date Alert!', 'Departure date must be after Arrival date.')
                    }, 200)
                } else {
                    this._setDepartureDate(date)
                }
            } else {
                this._setDepartureDate(date)
            }
        }
    }

    private _createReservation = (): void => {
        
        this.inputRefs.firstNameTextInput.current!.blur()
        this.inputRefs.lastNameTextInput.current!.blur()

        if (this.state.firstName && this.state.lastName) {
            
            let name = `${this.state.firstName} ${this.state.lastName}`

            this.setState({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate,
                hotel: this.state.hotel,
                name: name
            })

            setTimeout(() => {
                this.setState({
                    firstName: undefined,
                    lastName: undefined,
                    arrivalDate: undefined,
                    departureDate: undefined,
                    hotel: 'Select hotel',
                    name: undefined
                })
            }, 10000)
        }
    }

    private _handleHotelSelection = (item: any): void => {
        this.setState({
            hotel: item.label
        })
    }

    render() {

        return (
            <View style={Style.container}>
                <PickerModal
                    initValue={'Select hotel'}
                    selectionState={this.state.hotel}
                    data={this.state.hotelItems}
                    _onChange={this._handleHotelSelection}
                />

                <DateSelection
                    placeholder={'Arrival date'}
                    dateType={'arrival'}
                    dateString={this.state.arrivalDate}
                    _handler={this._handleDate}
                />

                <DateSelection
                    placeholder={'Departure date'}
                    dateType={'departure'}
                    dateString={this.state.departureDate}
                    _handler={this._handleDate}
                />

                <TextInput
                    ref={this.inputRefs.firstNameTextInput}
                    style={[Style.firstName, { opacity: this.state.firstName ? 1 : 0.6 }]}
                    placeholder='First name'
                    placeholderTextColor='#ccc'
                    onChangeText={(text: string) => {
                        let name = _.toLower(text)
                        this.setState({
                            firstName: _.upperFirst(name)
                        })
                    }}
                    value={this.state.firstName}
                />

                <TextInput
                    ref={this.inputRefs.lastNameTextInput}
                    style={[Style.lastName, { opacity: this.state.lastName ? 1 : 0.6 }]}
                    placeholder='Last name'
                    placeholderTextColor='#ccc'
                    onChangeText={(text: string) => {
                        let name = _.toLower(text)
                        this.setState({
                            lastName: _.upperFirst(name)
                        })
                    }}
                    value={this.state.lastName}
                />

                <Button title={'Create Reservation'} type={'outline'} onPress={this._createReservation} />

                {this.state.name ? (
                    <View>
                        <Text style={Style.welcome}>{this.state.hotel}</Text>
                        <Text style={Style.welcome}>{this.state.name}</Text>
                        <Text style={Style.welcome}>Arrive: {this.state.arrivalDate}</Text>
                        <Text style={Style.welcome}>Depart: {this.state.departureDate}</Text>
                    </View>
                ) : null}

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

export default CreateReservation
