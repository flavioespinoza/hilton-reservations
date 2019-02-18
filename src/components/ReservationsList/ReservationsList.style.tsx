import { StyleSheet } from 'react-native'
import { $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
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