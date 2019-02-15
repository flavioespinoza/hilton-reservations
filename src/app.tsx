import * as React from 'react';
import {
    Platform,
    Text,
    View,
    TextInput,
	TouchableOpacity
} from "react-native";

import DateTimePicker from 'react-native-modal-datetime-picker';

import _ from 'lodash';

import { Button } from 'react-native-elements';

import { AppStyle } from "./app.style";

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu"
});

type Props = {};

const $Divider = {
	color: 'gainsboro'
};

let $PlaceholderOpacity = 0.7;

class App extends React.PureComponent<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			text: '',
			location: '',
			arrivalDate: '',
			departureDate: '',
			hotel: '',
			name: '',

			isDateTimePickerVisible: false,
			dateType: null

		};
	}

	private _showDateTimePicker = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, type: string): void => {
		if (type === 'arrival') {
			this.setState({
				isDateTimePickerVisible: true,
				dateType: 'arrival'
			});
		} else if (type === 'departure') {
			this.setState({
				isDateTimePickerVisible: true,
				dateType: 'departure'
			});
		}
	};

	private _onChangeText = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {

	};

	_hideDateTimePicker () {
		this.setState({
			isDateTimePickerVisible: false,
			dateType: null,
		});
	}

	_handleDatePicked (date: any) {
		console.log('A date has been picked: ', date);
		if (this.state.dateType === 'arrival') {
			this.setState({
				arrivalDate: date,
				isDateTimePickerVisible: false,
				dateType: null,
			})
		} else if (this.state.dateType === 'departure') {
			this.setState({
				departureDate: date,
				isDateTimePickerVisible: false,
				dateType: null,
			})
		}
	}

	_createReservation () {

		if (this.state.firstName.length > 0 && this.state.lastName.length > 0) {
			let name = `${this.state.firstName} ${this.state.lastName}`;
			this.setState({
				name: name
			})
		}

    }

    render() {
        return (
            <View style={AppStyle.container}>

				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked.bind(this)}
					onCancel={this._hideDateTimePicker.bind(this)}
				/>

				<TextInput
					id={'arrivalDate'}
					style={[AppStyle.arrivalDate, {opacity: this.state.firstName.length ? 1 : $PlaceholderOpacity}]}
					placeholder="Arrival date"
					placeholderTextColor="#ccc"
					onFocus={(e) => this._showDateTimePicker(e, 'arrival')}
					value={this.state.arrivalDate}
				/>

				<TextInput
					id={'firstNameInput'}
					style={[AppStyle.firstName, {opacity: this.state.firstName.length ? 1 : $PlaceholderOpacity}]}
					placeholder="First name"
					placeholderTextColor="#ccc"
					onChangeText={(text) => {
						let name = _.toLower(text);
						this.setState({
							firstName: _.upperFirst(name)
						});
					}}
					value={this.state.firstName}
				/>

				<TextInput
					id={'lastNameInput'}
					style={[AppStyle.lastName, {opacity: this.state.lastName.length ? 1 : $PlaceholderOpacity}]}
					placeholder="Last name"
					placeholderTextColor="#ccc"
					onChangeText={(text) => {
						let name = _.toLower(text);
						this.setState({
							lastName: _.upperFirst(name)
						});
					}}

					value={this.state.lastName}
				/>


				<Button
					title={'Create Reservation'}
					type={'outline'}
					style={AppStyle.btn}
					disabled={false}
					onPress={this._createReservation.bind(this)}
				/>

                <Text style={AppStyle.welcome}>{this.state.name}</Text>




            </View>
        );
    }
}

export default App;