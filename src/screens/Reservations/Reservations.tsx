import * as React from 'react'
import { Style } from './Reservations.style'
import { View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import ReservationsList from '../../components/ReservationsList/ReservationsList'
import { StyleDeviceSpecific } from '../../components/SelectOption/SelectOption.style'

interface Props {}

interface State {
    screenTitle: string
}

class Reservations extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props)
        this.state = {
            screenTitle: 'Reservations'
        }
    }

    private _onPressMenu = (): void => {
        this.setState({
            screenTitle: 'NavMenu'
        })
    }

    private _onPressMore = (): void => {
        this.setState({
            screenTitle: 'More More...'
        })
    }

    public render(): JSX.Element {
        return (
            <View style={Style.container}>
                <Header
                    placement={'center'}
                    leftComponent={{ 
                        icon: 'menu', 
                        color: '#fff',
                        onPress: this._onPressMenu
                    }}
                    centerComponent={{ 
                        text: this.state.screenTitle, 
                        style: { color: '#fff' } 
                    }}
                    rightComponent={{ 
                        icon: 'more-vert',
                        type: 'MaterialIcons', 
                        color: '#fff',
                        onPress: this._onPressMore
                    }}
                />
                <ReservationsList />
            </View>
        )
    }
}

export default Reservations
