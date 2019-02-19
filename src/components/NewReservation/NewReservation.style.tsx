import { StyleSheet } from 'react-native'
import { $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    listItemContainer: {
        marginBottom: 0,
        padding: 6
    },
    subtitleText: {
        color: 'grey',
        paddingLeft: 12,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 12
       
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
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
