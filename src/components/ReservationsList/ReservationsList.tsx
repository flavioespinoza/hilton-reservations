import * as React from 'react'
import { Style } from './ReservationsList.style'
import { ScrollView, FlatList, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts'
import _ from 'lodash'

interface Props {}

interface State {
    items: [] | any
    showAlert: boolean
    alertMessage: string | undefined
    alertTitle: string | undefined
}

const list = [
    {
        name: 'Amy Farha',
        hotelName: 'Hilton NYC',
        arrivalDate: '2/20/19',
        departureDate: '3/5/19',
        id: '1234qwer'
    },
    {
        name: 'Bob JoBob',
        hotelName: 'Hilton Miami',
        arrivalDate: '2/24/19',
        departureDate: '3/15/19',
        id: '8976asdf'
    },
    {
        name: 'Carlos Perez',
        hotelName: 'Hilton London',
        arrivalDate: '2/28/19',
        departureDate: '3/20/19',
        id: 'uiop8765'
    }
]

class ReservationsList extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            items: list,
            showAlert: false,
            alertMessage: undefined,
            alertTitle: undefined
        }
    }

    private _keyExtractor = (item: any, index: any) => _.toString(index)

    private _renderItem = ({ item }: any) => (
        <ListItem
            containerStyle={{ borderBottomColor: '#ccc', borderBottomWidth: 1 }}
            title={item.name}
            subtitle={item.hotelName}
            onPress={() => {
                this._onPress({ item })
            }}
        />
    )

    private _showAlert = (title: string, message: string): void => {
        this.setState({
            alertMessage: message,
            showAlert: true
        })
    }

    private _hideAlert = (): void => {
        this.setState({
            alertMessage: undefined,
            showAlert: false
        })
    }

    private _onPress = ({ item }: any): void => {
        this._showAlert(item.title, item.name)
    }

    public render(): JSX.Element {
        return (
            <View style={Style.container}>
                
                <FlatList keyExtractor={this._keyExtractor} data={this.state.items} renderItem={this._renderItem} />

                <AwesomeAlert
                    alertContainerStyle={{ borderRadius: 2 }}
                    show={this.state.showAlert}
                    showProgress={false}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    messageStyle={{ textAlign: 'center', color: 'red' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonStyle={Style.btnPrimary}
                    confirmText='OK, GOT IT!'
                    onCancelPressed={() => {
                        this._hideAlert()
                    }}
                    onConfirmPressed={() => {
                        this._hideAlert()
                    }}
                />
            </View>
        )
    }
}

export default ReservationsList
