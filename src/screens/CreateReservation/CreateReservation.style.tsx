import { StyleSheet } from 'react-native'
import { $DateInput, $TextInput, $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    btnPrimary: {
        ...$Color.primary.bg, 
        color: '#fff',
        borderRadius: 2
    },
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 12,
        width: '100%'
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

export { Style }
