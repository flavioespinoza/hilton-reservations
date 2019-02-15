import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	Button
} from 'react-native';

const $TextInput = {
	height: 40,
	width: '100%',
	borderColor: 'gainsboro',
	borderWidth: 2,
	marginTop: 12,
	padding: 4
};

const $AlignCenterCenter = {
	justifyContent: 'center',
};

const $Divider = {
	color: 'gainsboro'
};

let $PlaceholderOpacity = 0.6;

const styles = StyleSheet.create({
	arrivalDate: {
		...$TextInput,
		borderColor: 'blue'
	},
	departureDate: {
		...$TextInput,
		borderColor: 'hotpink'
	},
	firstName: {
		...$TextInput,
		borderColor: 'green'
	},
	lastName: {
		...$TextInput,
		borderColor: 'red'
	},
	mainView: {
		flex: 1,
		alignItems: 'center',
		...$AlignCenterCenter
	},
	displayText: {
		marginBottom: 4
	}
});

export default class InputText extends React.PureComponent<props> {
	constructor(props) {
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
		};
	}

	_createReservation() {
		this.setState({
			location: 'Balls'
		})

	}

	render() {
		return (
			<View style={styles.mainView}>

				<TextInput
					id={'arrivalDate'}
					style={[styles.arrivalDate, {opacity: this.state.arrivalDate.length ? 1 : $PlaceholderOpacity}]}
					placeholder="Arrival date"
					placeholderTextColor="#CCC"
					onChangeText={(text) => this.setState({arrivalDate: text})}
					value={this.state.arrivalDate}
				/>

				<TextInput
					id={'departureDate'}
					style={[styles.departureDate, {opacity: this.state.departureDate.length ? 1 : $PlaceholderOpacity}]}
					placeholder="Departure date"
					placeholderTextColor="#CCC"
					onChangeText={(text) => this.setState({departureDate: text})}
					value={this.state.departureDate}
				/>

				<View style={$Divider}>............</View>

				<TextInput
					id={'firstNameInput'}
					style={[styles.firstName, {opacity: this.state.firstName.length ? 1 : $PlaceholderOpacity}]}
					placeholder="First name"
					placeholderTextColor="#CCC"
					onChangeText={(text) => this.setState({firstName: text})}
					value={this.state.firstName}
				/>

				<TextInput
					id={'lastNameInput'}
					style={[styles.lastName, {opacity: this.state.lastName.length ? 1 : $PlaceholderOpacity}]}
					placeholder="Last name"
					placeholderTextColor="#CCC"
					onChangeText={(text) => this.setState({lastName: text})}
					value={this.state.lastName}
				/>

				<View style={{padding: 12, borderColor: 'blue'}}>

					<Text
						style={styles.displayText}>{this.state.arrivalDate}</Text>
					<Text
						style={styles.displayText}>{this.state.departureDate}</Text>
					<Text style={styles.displayText}>{this.state.hotel}</Text>
					<Text style={styles.displayText}>{this.state.name}</Text>

					<Text
						style={styles.displayText}>{this.state.firstName + ' ' + this.state.lastName}</Text>

				</View>

				<Button
					onPress={this._createReservation.bind(this)}
					title="Make Reservation"
					color="#FF8200"
				/>

			</View>

		);
	}
}