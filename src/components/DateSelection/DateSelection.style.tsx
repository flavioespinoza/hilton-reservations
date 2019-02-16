import { StyleSheet } from 'react-native'
import { $DateInput } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    view: {
        width: '100%'
    },
    dateSelectionTouchable: {
        height: 40,
        width: '100%',
        marginTop: 12
    },
    dateInput: {
        ...$DateInput
    },
    placeholder: {
        color: '#ccc'
    }
})

export { Style }
