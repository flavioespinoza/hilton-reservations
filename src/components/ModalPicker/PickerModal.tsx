import * as React from 'react'
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './style'
import { Style } from './ModalPicker.style'
import Chance from 'chance'

const chance = new Chance()

interface Props {
    
    optionStyle?: {}
    style?: {}
    selectStyle?: {}
    optionTextStyle?: {}
    sectionStyle?: {}
    sectionTextStyle?: {}
    cancelStyle?: {}
    cancelTextStyle?: {}
    overlayStyle?: {}
    selectTextStyle?: {}

    _onChange: any
    data: []
    initValue: string
    selectionState: string | undefined
}

interface State {
    cancelText: string
    modalVisible: boolean
    transparent: boolean
    componentIndex: number
    selected: string | undefined | any
}

class PickerModal extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            cancelText: 'Cancel Hello',
            modalVisible: false,
            transparent: false,
            selected: 'please select',
            componentIndex: 0
        }
    }

    componentDidMount() {
        this.setState({ selected: this.props.initValue })
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.selectionState != this.props.selectionState) {
            this.setState({ selected: nextProps.selectionState })
        }
    }

    _onChangeItem = (item: any) => {
        this.props._onChange(item)
        this.setState({ selected: item })
        this._close()
    }

    _close = (): void => {
        this.setState({
            modalVisible: false
        })
    }

    _open = (): void => {
        this.setState({
            modalVisible: true
        })
    }

    _renderSection = (section: any) => {
        return (
            <View key={chance.guid()} style={[styles.sectionStyle, this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        )
    }

    _renderOption = (option: any) => {
        return (
            <TouchableOpacity key={chance.guid()} onPress={() => this._onChangeItem(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle]}>
                    <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>{option.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderOptionList = () => {
        const options = this.props.data.map((item: any, i: number) => {
            if (item.section) {
                return this._renderSection(item)
            } else {
                return this._renderOption(item)
            }
        })

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]} key={chance.guid()}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        <View style={{ paddingHorizontal: 10 }}>{options}</View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this._close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>
                                {this.state.cancelText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderChildren = () => {
        if (this.props.children) {
            return this.props.children
        }
        return (
            <View style={[styles.selectStyle, this.props.selectStyle]}>
                <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>{this.state.selected}</Text>
            </View>
        )
    }

    render() {
        const dp = (
            <Modal
                transparent={true}
                ref='modal'
                visible={this.state.modalVisible}
                onRequestClose={this._close}
                animationType={'slide'}
            >
                {this._renderOptionList()}

            </Modal>
        )

        return (
            <View style={{
                width: '100%',
                height: 40,
                borderRadius: 1
            }}>
                {dp}
                <TouchableOpacity style={Style.touchable} onPress={this._open}>{this._renderChildren()}</TouchableOpacity>
            </View>
        )
    }
}

export default PickerModal
