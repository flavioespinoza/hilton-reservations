import * as React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Style } from './ModalPicker.style'
import Picker from './PickerModal'

interface Props {
    selection: string | undefined
}

interface State {
    compName: string | undefined
    items: [] | any
    initState: string
    selectionState: string | undefined
}

class ModalPicker extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            compName: 'ModalPicker',
            initState: 'Select hotel',
            selectionState: this.props.selection,
            items: [
                {
                    label: 'Hilton NYC',
                    value: 'Hilton NYC'
                },
                {
                    label: 'Hilton Miami',
                    value: 'Hilton Miami'
                },
                {
                    label: 'Hilton London',
                    value: 'Hilton London'
                }
            ]
        }
    }

    private _handler = (item: any): void => {
        this.setState({
            initState: item.value,
            selectionState: item.value
        })
    }

    render() {
        let index = 0

        return (
            <View style={Style.container}>
                <Picker 
                    initValue={this.state.initState} 
                    selectionState={this.state.selectionState}
                    data={this.state.items} 
                    _onChange={this._handler} />
            </View>
        )
    }
}

export default ModalPicker
