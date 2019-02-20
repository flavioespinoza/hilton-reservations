import * as React from 'react'
import { Style } from './Reservations.style'
import { ScrollView } from 'react-native'
import ReservationsList from '../../components/ReservationsList/ReservationsList'
import _ from 'lodash'

interface Props {
    screenTitle: string
}

interface State {
    
}

class Reservations extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props)
        this.state = {
            screenTitle: this.props.screenTitle
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
            <ScrollView contentContainerStyle={Style.container}>

                <ReservationsList />

            </ScrollView>
        )
    }
}

export default Reservations