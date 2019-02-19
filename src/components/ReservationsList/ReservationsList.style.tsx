import { StyleSheet } from 'react-native'
import { $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    btnPrimary: {
        ...$Color.primary.bg, 
        color: '#fff',
        borderRadius: 2
    },
    container: {
        flex: 1,
        width: '100%'
    }
})

export { Style }