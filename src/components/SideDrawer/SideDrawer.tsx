import * as React from 'react'
import { View, Text } from 'react-native'
import { Style } from './SideDrawer.style'

interface Props {}

interface State {
    compName: string | undefined
}

class SideDrawer extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            compName: 'SideDrawer'
        }
    }

    render() {
        return (
            <View style={Style.container}>
                <Text style={Style.text}>{this.state.compName}></Text>
            </View>
        )
    }
}

export default SideDrawer