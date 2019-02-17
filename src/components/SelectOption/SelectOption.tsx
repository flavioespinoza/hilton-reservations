import React, { useRef } from 'react';
import { Style, StyleDeviceSpecific } from './SelectOption.style'
import { View } from 'react-native';
import _getHotelList from '../../api/getHotelList'
import RNPickerSelect from 'react-native-picker-select'

interface Props {
    _handler: any
    placeholder: string,
    currentSelection: string | undefined
}

interface State {
    items: [] | any
    placeholder: object

}

class SelectOption extends React.PureComponent<Props, State> {
    
    private inputRefs = {
        pickerSelect: React.createRef<RNPickerSelect>()
    }

    public constructor(props: Props) {
        super(props)
        
        let getHotelList = _getHotelList()

        this.state = {
            items: getHotelList,
            placeholder: {
                label: this.props.placeholder,
                value: null,
                color: '#9EA0A4',
            }
        }

    }

    private _handler = (selection: string): void => {
        this.props._handler(selection)
    }

    public render(): JSX.Element {
        
        return (
            <View style={Style.view}>
                
                <RNPickerSelect
                    ref={this.inputRefs.pickerSelect}
                    placeholder={this.state.placeholder}
                    items={this.state.items}
                    onValueChange={(selection) => {
                        this._handler(selection)
                    }}
                    style={StyleDeviceSpecific}
                    value={this.props.currentSelection}
                />                

            </View>
        )
    }
}

export { SelectOption }
