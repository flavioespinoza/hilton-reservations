import * as React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { SelectOption } from './components/SelectOption/SelectOption'
import { DateSelection } from './components/DateSelection/DateSelection'
import { Button } from 'react-native-elements'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'
import AwesomeAlert from 'react-native-awesome-alerts'

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
}

class App extends React.PureComponent<Props, State> {
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
            text_2: 'Text 2'
        }
    }

    private _showAlert = (title: string, message: string) => {
        this.setState({
            alertTitle: title,
            alertMessage: message,
            showAlert: true
        })
    }

    private _hideAlert = () => {
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
                firstName: undefined,
                lastName: undefined,
                name: name
            })
        }
    }

    private _handleHotelSelection = (selection: string): void => {
        this.setState({
            hotel: selection
        })
    }

    render() {
        const { showAlert } = this.state

        return (
            <View style={AppStyle.container}>
                <SelectOption
                    _handler={this._handleHotelSelection}
                    placeholder={'Select a hotel...'}
                    currentSelection={this.state.hotel}
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
                    style={[AppStyle.firstName, { opacity: this.state.firstName ? 1 : 0.6 }]}
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
                    style={[AppStyle.lastName, { opacity: this.state.lastName ? 1 : 0.6 }]}
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

                <Button
                    title={'Create Reservation'}
                    type={'outline'}
                    style={AppStyle.btn}
                    onPress={this._createReservation}
                />

                <TouchableOpacity
                    onPress={() => {
                        this._showAlert('I am an Awesome Alert', 'Test')
                    }}
                >
                    <View style={AppStyle.btn}>
                        <Text>Try me!</Text>
                    </View>
                </TouchableOpacity>

                <Text style={AppStyle.welcome}>{this.state.text_1}</Text>
                <Text style={AppStyle.welcome}>{this.state.text_2}</Text>

                {this.state.name ? (
                    <View>
                        <Text style={AppStyle.welcome}>{this.state.name}</Text>
                        <Text style={AppStyle.welcome}>{this.state.arrivalDate}</Text>
                        <Text style={AppStyle.welcome}>{this.state.departureDate}</Text>
                    </View>
                ) : null}

                <AwesomeAlert
                    alertContainerStyle={{ borderRadius: 2 }}
                    show={showAlert}
                    showProgress={false}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    messageStyle={{ textAlign: 'center', color: 'red' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonStyle={AppStyle.btnPrimary}
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

export default App
