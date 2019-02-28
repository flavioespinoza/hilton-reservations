import * as React from 'react'
import { TabNavigator } from 'react-navigation'
import CreateReservation from '../../screens/CreateReservation/CreateReservation'
import Reservations from '../../screens/Reservations/Reservations'

const TabBarOptions = {
    tabBarOptions: {
        activeTintColor: '#EF5356',
        allowFontScaling: true,
        inactiveTintColor: 'gray',
        pressColor: '#EF5356',
        pressOpacity: 0.5,
        showIcon: false,
        showLabel: true,
        upperCaseLabel: true,
        indicatorStyle: {
            backgroundColor: '#EF5356',
            opacity: 100
        },
        activeTabStyle: {
            backgroundColor: '#EF5356'
        },
        style: {
            backgroundColor: 'white'
        }
    },
    animationEnabled: true,
    tabBarVisible: true,
    swipeEnabled: true
}

const Nav = TabNavigator(
    {
        ['Reservations']: { screen: Reservations },
        ['Create Reservation']: { screen: CreateReservation }
        
    },
    TabBarOptions
)

interface Props {}

interface State {}

class MainNavigation extends React.PureComponent<Props, State> {
    constructor (props: Props) {
        super(props)

        this.state = {
            compName: 'CompName'
        }

    };

    render () {

        return (<Nav/>)
    }

}

export default MainNavigation