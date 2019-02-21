import { StyleSheet } from 'react-native'
import { $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    
    alertTitle: {
        width: '100%',
        marginLeft: -30,
        padding: 0,
        fontSize: 20,
        textAlign: 'left'
    },
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
        width: '100%',
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
        borderRadius: 2,
        width: '100%',
        flex: 1
    },
    btnCancel: {
        ...$Color.cancel.bg,
        color: '#fff',
        borderRadius: 2,
        width: '100%',
        flex: 1
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'gainsboro'
    },
    confirmCancelReservationMsg: {
        width: '100%',
        paddingTop: 0,
        paddingLeft: 12,
        paddingRight: 12,
        textAlign: 'center',
        color: '#EF5356'
    },
    cancelReservationBtn: { 
        marginTop: 12,
        width: '80%', 
        height: 40, 
        borderRadius: 4,
        ...$Color.cancel.bg
    },
    confirmCancelReservationBtn: { 
        marginTop: 12,
        width: '80%', 
        height: 40, 
        borderRadius: 4,
        ...$Color.cancel.bg
    },
    confirmReservationBtn: { 
        marginTop: 28,
        width: '80%', 
        height: 40, 
        backgroundColor: 'white', 
        color: '#EF5356',
        borderColor: '#EF5356',
        borderWidth: 1,
        borderRadius: 3
    },
    keepReservationBtn: { 
        marginTop: 32,
        width: '80%', 
        height: 40, 
        backgroundColor: 'white', 
        color: '#EF5356',
        borderColor: '#EF5356',
        borderWidth: 1,
        borderRadius: 3
    },
    alertBtn: {
        textAlign: 'center',
        fontSize: 16,
        color: '#EF5356',
        paddingTop: 9
    },
    alertCanelBtn: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        paddingTop: 9
    }
})

export { Style }
