import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { AppStyle } from './app.style'
import _formatDate from './utils/formatDate'
import _ from 'lodash'

import CreateReservation from './screens/CreateReservation/CreateReservation'
import Reservations from './screens/Reservations/Reservations'

import { DrawerNavigator } from 'react-navigation';

const RootDrawer = DrawerNavigator(
	{
		Home: {
			screen: Reservations,
        },
        Other: {
            screen: CreateReservation
        }
	}
)

export default class App extends React.Component {
	render() {
		return <RootDrawer />;
	}
}