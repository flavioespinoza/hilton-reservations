import * as React from 'react'
import { View, TextInput, Text } from 'react-native'
import { SelectOption } from './components/SelectOption/SelectOption'
import { DateSelection } from './components/DateSelection/DateSelection'
import { Button } from 'react-native-elements'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'

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
            dateType: null
        }
    }

    private _handleDate = (date: Date, type: string): void => {
        if (type === 'arrival') {
            //TODO: CHECK DATE SEQUENCE
            let arrival = _formatDate(date)
            this.setState({
                arrivalDate: arrival,
                isDateTimePickerVisible: false,
                dateType: null
            })
        } else if (type === 'departure') {
            //TODO: CHECK DATE SEQUENCE
            let departure = _formatDate(date)
            this.setState({
                departureDate: departure,
                isDateTimePickerVisible: false,
                dateType: null
            })
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

                {this.state.name ? (
                    <View>
                        <Text style={AppStyle.welcome}>{this.state.name}</Text>
                        <Text style={AppStyle.welcome}>{this.state.arrivalDate}</Text>
                        <Text style={AppStyle.welcome}>{this.state.departureDate}</Text>
                    </View>
                ) : null}
            </View>
        )
    }
}

export default App
