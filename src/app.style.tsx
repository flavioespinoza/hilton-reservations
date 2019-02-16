import * as React from 'react'
import { StyleSheet } from 'react-native'
import { $ContainerBase, $DateInput, $TextInput } from './utils/styleMixins'

const AppStyle = StyleSheet.create({
    placeholderText: {
        color: '#ccc'
    },
    dateSelectionTouchable: {
        height: 40,
        width: '100%',
        marginTop: 12
    },
    arrivalDate: {
        ...$DateInput
    },
    departureDate: {
        ...$DateInput
    },
    btnMakeReservation: {
        marginTop: 200,
        color: 'red'
    },
    firstName: {
        ...$TextInput
    },
    lastName: {
        ...$TextInput,
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
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: 'red',
        marginBottom: 5
    },
    input: {
        color: 'blue',
        backgroundColor: 'red'
    }
})

export { AppStyle }
