import * as React from "react";
import {StyleSheet} from "react-native";

const $ContainerBase = {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#F5FCFF",
	padding: 12
};

const $TextInput = {
	paddingLeft: 8,
	height: 40,
	width: "100%",
	borderColor: "gainsboro",
	borderWidth: 2,
	marginTop: 12,
	padding: 4
};

const $DateInput = {
	paddingLeft: 8,
	paddingTop: 9,
	height: 40,
	width: "100%",
	borderColor: "orange",
	borderWidth: 2,
	padding: 4
};

const AppStyle = StyleSheet.create({
	placeholderText: {
		color: "gainsboro"
	},
	dateSelectionTouchable: {
		height: 40,
		width: "100%",
		marginTop: 12
	},
	arrivalDate: {
		...$DateInput
	},
	departureDate: {
		...$DateInput
	},
	btn: {
		marginBottom: 12
	},
	btnMakeReservation: {
		marginTop: 200,
		color: "red"
	},
	arrivalView: {
		height: 40,
		width: "100%"
	},
	firstName: {
		...$TextInput,
		borderColor: "green"
	},
	lastName: {
		...$TextInput,
		borderColor: "red",
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
		color: "blue"
	}
});

export {AppStyle};
