import React, { useRef } from 'react';
import { Style } from './SelectOption.style'
import { Button, Text, TextInput, Platform, ScrollView, StyleSheet, View } from 'react-native';
import _getHotelList from '../../api/getHotelList'
import RNPickerSelect from 'react-native-picker-select'

interface Props {
    _handler: any
    placeholder: string
}

interface State {
    items: [] | any
    currentSelection: string | undefined
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
            currentSelection: undefined,
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
            <View style={styles.container}>
                
                <RNPickerSelect
                    placeholder={this.state.placeholder}
                    items={this.state.items}
                    onValueChange={(selection) => {
                        this.setState({
                            currentSelection: selection,
                        })
                        this._handler(selection)
                    }}
                    style={pickerSelectStyles}
                    value={this.state.currentSelection}
                    ref={this.inputRefs.pickerSelect}
                />                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '100%',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 0,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'red',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export { SelectOption }
