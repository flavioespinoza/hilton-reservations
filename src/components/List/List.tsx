import * as React from 'react'
import { ScrollView, View, Text, FlatList } from 'react-native'
import { Style } from './List.style'
import { ListItem } from 'react-native-elements'
import _ from 'lodash'
interface Props {
    items: []
}

interface State {
    compName: string | undefined
    alertListItems: string | undefined
}

class List extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            compName: 'List',
            alertListItems: 'No items in list.'
        }
    }

    private _keyExtractor = (item: any, index: any) => _.toString(index)

    private _renderItem = ({ item }: any) => (
        <ListItem
            containerStyle={{ borderBottomColor: '#ccc', borderBottomWidth: 1 }}
            title={item.name}
            subtitle={item.hotelName}
        />
    )

    render() {
        const { items } = this.props
        const { alertListItems } = this.state

        if (!items.length) {
            return (
                <View style={Style.container}>
                    <Text style={Style.text}>{alertListItems}</Text>
                </View>
            )
        }

        return (
            <View style={Style.container}>

                <FlatList 
                    keyExtractor={this._keyExtractor} 
                    data={items} 
                    renderItem={this._renderItem} 
                />

            </View>
        )
    }
}

export default List
