import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Style } from './DateSelection.style'
import _formatDate from '../../utils/formatDate'

interface Props {
    dateType: string
    dateString: string | any
    placeholder: string
    _handler: any
}

interface State {
    isDateTimePickerVisible: boolean
}

class DateSelection extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props)

        this.state = {
            isDateTimePickerVisible: false
        }
    }

    private _showDateTimePicker = (type: string): void => {
        this.setState({
            isDateTimePickerVisible: true
        })
    }

    private _hideDateTimePicker = (): void => {
        this.setState({
            isDateTimePickerVisible: false
        })
    }

    private _handleDatePicked = (date: Date): void => {
        this.props._handler(date, this.props.dateType)
        this.setState({
            isDateTimePickerVisible: false
        })
    }

    public render(): JSX.Element {
        return (
            <View style={Style.view}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={() => {
                        this._hideDateTimePicker()
                    }}
                />

                <TouchableOpacity
                    style={Style.dateSelectionTouchable}
                    onPress={() => {
                        this._showDateTimePicker(this.props.dateType)
                    }}
                >
                    <Text style={[Style.dateInput, { opacity: this.props.dateString ? 1 : 0.6 }]}>
                        {this.props.dateString ? (
                            this.props.dateString
                        ) : (
                            <Text style={Style.placeholder}>{this.props.placeholder}</Text>
                        )}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export { DateSelection }
