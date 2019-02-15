import * as React from 'react';
import {
	StyleSheet
} from "react-native";

const $TextInput = {
	height: 40,
	width: '100%',
	borderColor: 'gainsboro',
	borderWidth: 2,
	marginTop: 12,
	padding: 4
};

const $ContainerBase = {
	flex: 1,
	justifyContent: 'center',
	alignItems: "center",
	backgroundColor: "#F5FCFF",
	padding: 12
};

const AppStyle = StyleSheet.create({
	btn: {
		marginBottom: 12
	},
	btnMakeReservation: {
		marginTop: 200,
		color: 'red'
	},
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
		borderColor: 'red',
		marginBottom: 24
	},
	displayText: {
		marginBottom: 4
	},
	container: {
		...$ContainerBase
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	instructions: {
		textAlign: "center",
		color: "red",
		marginBottom: 5
	},
	input: {
		color: 'blue'
	}
});

export {AppStyle}