import * as React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Style } from './Example.style'

interface Props {
    message: string
}

interface State {
    compName: string
}

class Example extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {
            compName: 'Example'
        }
    }

    render() {
        return (
            <View style={Style.container}>
                <Text style={Style.text}>Hello {this.state.compName}></Text>
                <Text style={Style.text}>Message: {this.props.message}</Text>
            </View>
        )
    }
}

export default Example