import { StyleSheet } from 'react-native'
import { $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    listHeaderComponent: {
        height: 40,
        color: 'white',
        backgroundColor: '#EF5356'
    },
    listHeaderText: {
        height: 40,
        paddingTop: 24
    },
    SectionHeaderStyle: {
        backgroundColor: '#EF5356',
        fontSize: 10,
        padding: 5,
        color: 'white'
    },
    SectionListItemStyle: {
        fontSize: 15,
        padding: 20,
        color: 'black',
        backgroundColor: 'white'
    },
    card: {
        color: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 4,
        marginBottom: 4
    },
    cardContent: {
        color: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.75,
        shadowRadius: 10,
        borderRadius: 32,
        margin: 0
    },
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
        width: '100%',
        backgroundColor: 'gainsboro'
    }
})



export { Style }
