import * as React from 'react'
import { Style } from './Reservations.style'
import { ScrollView, View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import ReservationsList from '../../components/ReservationsList/ReservationsList'
import gql from 'graphql-tag'
import { ChildDataProps, graphql } from 'react-apollo'
import _ from 'lodash'

interface Data {
    allReservations: {
        reservation: Array<{ name: string; hotelName: string; id: string }>
    }
}

const HERO_QUERY = gql`
    query GetReservations($skip: Skip!) {
        reservations(skip: $skip) {
            id
            hotelName
            name
        }
    }
`

type Hero = {
    id: string
    hotelName: string
    name: string
}

type Response = {
    hero: Hero
}

type Variables = {
    skip: number
}

type ChildProps = ChildDataProps<{}, Response, Variables>

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
            <ScrollView contentContainerStyle={Style.container}>
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
            </ScrollView>
        )
    }
}

// Note that the first parameter here is an empty Object, which means we're
// not checking incoming props for type safety in this example. The next
// example (in the "Options" section) shows how the type safety of incoming
// props can be ensured.
const withCharacter = graphql<{}, Response, Variables, ChildProps>(HERO_QUERY, {
    options: () => ({
        variables: { skip: 1 }
    })
})

export default withCharacter(({ data: { loading, hero, error } }) => {
    if (loading) return <Text>Loading</Text>
    if (error) return <Text>ERROR</Text>
    return <Reservations />
})
