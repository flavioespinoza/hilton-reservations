/// <reference path='../../index.d.ts' />
import * as React from 'react'
import { View, TextInput, Text, AsyncStorage } from 'react-native'
import { DateSelection } from '../../components/DateSelection/DateSelection'
import { Button } from 'react-native-elements'
import { Style } from './CreateReservation.style'
import _formatDate from '../../utils/formatDate'
import _ from 'lodash'
import AwesomeAlert from 'react-native-awesome-alerts'
import PickerModal from '../../components/ModalPicker/ModalPicker'
import { _getHotelList } from '../../api/getHotelList'
import { _createReservation } from '../../api/query'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const BUILD_QUERY = (name: any, hotel: any, arrivalDate: any, departureDate: any) => {
    let query = _createReservation(name, hotel, arrivalDate, departureDate)
    return query
}

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
    text_1: string | undefined
    text_2: string | undefined
    pickerOpacity: number
    opacityOfOtherItems: number
    textInputValue: string
    hotelItems: [] | any
    submit: boolean
}

const _storeData = async (str: string) => {
    try {
        localStorage.setItem('myCat', str)
        await AsyncStorage.setItem('stuff', str)
    } catch (error) {
        // Error saving data
    }
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
            text_1: 'Text 1',
            text_2: 'Text 2',
            pickerOpacity: 0,
            opacityOfOtherItems: 1,
            textInputValue: 'hello textInputValue',
            hotelItems: [],
            submit: false
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

        let _name = `${this.state.firstName} ${this.state.lastName}`
        let _firstName = this.state.firstName
        let _lastName = this.state.lastName
        let _hotelName = this.state.hotel
        let _arrivalDate = this.state.arrivalDate
        let _departureDate = this.state.departureDate

        this.setState({
            name: _name,
            firstName: _firstName,
            lastName: _lastName,
            hotel: _hotelName,
            arrivalDate: _arrivalDate,
            departureDate: _departureDate,
            submit: true
        })

        setTimeout(() => {

            this.inputRefs.firstNameTextInput.current!.clear()
            this.inputRefs.lastNameTextInput.current!.clear()

            this.setState({
                name: undefined,
                firstName: undefined,
                lastName: undefined,
                hotel: undefined,
                arrivalDate: undefined,
                departureDate: undefined,
                submit: false
            })
        }, 2000);
    }

    private _handleHotelSelection = (item: any): void => {
        this.setState({
            hotel: item.label
        })
    }

    render() {
        const query = () => {
            if (this.state.submit) {
                let STUFF = BUILD_QUERY(this.state.name, this.state.hotel, this.state.arrivalDate, '2/24/19')

                let is_string = () => {
                    if (typeof STUFF === 'string') {
                        _storeData(STUFF)
                        console.log('STUFF', STUFF)
                        return 'STUFF is a string!!!'
                    } else {
                        return 'STUFF is NOT a string :(!!!'
                    }
                }
                return (
                    <View>
                        <Text>Query</Text>
                        <Text>{is_string()}</Text>
                        <Text>{STUFF}</Text>
                    </View>
                )
            } else {
                return <Text>loading...</Text>
            }
        }

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

                {query()}

                {this.state.firstName ? <Text>{this.state.firstName}</Text> : null}
                {this.state.lastName ? <Text>{this.state.lastName}</Text> : null}
                {this.state.hotel ? <Text>{this.state.hotel}</Text> : null}
                {this.state.arrivalDate ? <Text>{this.state.arrivalDate}</Text> : null}
                {this.state.departureDate ? <Text>{this.state.departureDate}</Text> : null}

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
