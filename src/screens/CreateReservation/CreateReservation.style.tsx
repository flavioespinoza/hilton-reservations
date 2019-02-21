import { StyleSheet } from 'react-native'
import { $DateInput, $TextInput, $Color } from '../../utils/styleMixins'
import { $Device } from '../../utils/styleMixins'



const StyleDeviceSpecific = StyleSheet.create({
    inputIOS: {
        ...$Device.selection.ios
    },
    inputAndroid: {
        ...$Device.selection.android
    }
})

const Style = StyleSheet.create({
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#EF5356',
        paddingTop: 9
    },
    bookReservationBtn: { 
        textAlign: 'center',
        marginTop: 12,
        width: '60%', 
        height: 44, 
        backgroundColor: 'white', 
        color: '#EF5356',
        borderColor: '#EF5356',
        borderWidth: 1,
        borderRadius: 3
    },
    btnPrimary: {
        backgroundColor: 'white', 
        color: '#EF5356',
        height: 44, 
        borderColor: '#EF5356',
        borderWidth: 1,
        borderRadius: 3
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
        color: '#EF5356'
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
        color: '#EF5356',
        marginBottom: 5
    },
    input: {
        color: 'blue',
        backgroundColor: '#EF5356'
    }
})

export { StyleDeviceSpecific, Style }
