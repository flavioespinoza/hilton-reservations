/// <reference path='../../index.d.ts' />
import * as React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { DateSelection } from '../../components/DateSelection/DateSelection'
import { Button } from 'react-native-elements'
import { Style } from './CreateReservation.style'
import _formatDate from '../../utils/formatDate'
import _ from 'lodash'
import AwesomeAlert from 'react-native-awesome-alerts'
import PickerModal from '../../components/ModalPicker/ModalPicker'
import { _getHotelList } from '../../api/getHotelList'
import axios from 'axios'

interface Props {}

interface State {
    arrivalDate: string | any
    departureDate: string | any
    hotel: string | any
    firstName: string | undefined
    lastName: string | undefined
    name: string | undefined
    reservationId: string | undefined
    isDateTimePickerVisible: boolean
    dateType: any
    showAlert: boolean
    alertMessage: string | undefined
    alertTitle: string | undefined
    hotelItems: [] | any
    submit: boolean
    createReservationQuery: string | undefined
    confirm_arrivalDate: string | undefined
    confirm_departureDate: string | undefined
    confirm_hotelName: string | undefined
    confirm_id: string | undefined
    confirm_name: string | undefined
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
            hotel: 'Select hotel...',
            firstName: undefined,
            lastName: undefined,
            name: undefined,
            reservationId: undefined,
            isDateTimePickerVisible: false,
            dateType: null,
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined,
            hotelItems: [],
            submit: false,
            createReservationQuery: undefined,
            confirm_arrivalDate: undefined,
            confirm_departureDate: undefined,
            confirm_hotelName: undefined,
            confirm_id: undefined,
            confirm_name: undefined
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

    private _handleHotelSelection = (item: any): void => {
        this.setState({
            hotel: item.label
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

    private _sendReservation = (obj: any): void => {
        const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

        axios({
            url: _endpoint,
            method: 'post',
            data: {
                query: `
					mutation {
						createReservation(
							data: {
									name: "${obj.firstName} ${obj.lastName}"
									hotelName: "${obj.hotelName}"
									arrivalDate: "${obj.arrivalDate}"
									departureDate: "${obj.departureDate}"
							}
						)   {
							id
							name
							hotelName
							arrivalDate
							departureDate
						}
					}
			`
            }
        })
        .then(res => {
            let reservation = res.data.data.createReservation
            let confirmation = {
                confirm_arrivalDate: reservation.arrivalDate,
                confirm_departureDate: reservation.departureDate,
                confirm_hotelName: reservation.hotelName,
                confirm_id: reservation.id,
                confirm_name: reservation.name
            }
            this.setState(confirmation)
            this._clearState()
        })
        .catch(err => {
            console.error(err)
            alert(err.message)
        })
    }

    private _createReservation = (): void => {
        if (
            this.state.firstName &&
            this.state.lastName &&
            this.state.hotel &&
            this.state.arrivalDate &&
            this.state.departureDate
        ) {
            this.inputRefs.firstNameTextInput.current!.blur()
            this.inputRefs.lastNameTextInput.current!.blur()

            let obj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                hotelName: this.state.hotel,
                arrivalDate: this.state.arrivalDate,
                departureDate: this.state.departureDate
            }

            this._sendReservation(obj)
        } else {
            alert('All fields are required!')
        }
    }

    private _clearState = (): void => {
        this.inputRefs.firstNameTextInput.current!.clear()
        this.inputRefs.lastNameTextInput.current!.clear()

        this.setState({
            name: undefined,
            firstName: undefined,
            lastName: undefined,
            hotel: 'Select hotel',
            arrivalDate: undefined,
            departureDate: undefined,
            submit: false
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

                <TouchableOpacity
                    style={Style.bookReservationBtn}
                    onPress={this._createReservation} >
                        <Text style={Style.btnText}>Book reservation</Text>
                    </TouchableOpacity>

                <View style={{ padding: 12 }}>
                    {this.state.firstName ? <Text>{this.state.firstName}</Text> : null}
                    {this.state.lastName ? <Text>{this.state.lastName}</Text> : null}
                    {this.state.hotel && this.state.hotel != 'Select hotel...' ? <Text>{this.state.hotel}</Text> : null}
                    {this.state.arrivalDate ? <Text>{this.state.arrivalDate}</Text> : null}
                    {this.state.departureDate ? <Text>{this.state.departureDate}</Text> : null}
                </View>

                {this.state.submit ? <Text style={{ color: 'red' }}>{'this.state.submit === true'}</Text> : null}

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
