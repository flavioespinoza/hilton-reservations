import { StyleSheet } from 'react-native'
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
    view: {
        width: '100%',
        height: 40
    },
    placeholder: {
        color: '#ccc'
    }
})



export { Style, StyleDeviceSpecific }
