import * as React from 'react'
import { Style } from './SideDrawer.style'
import { View, Text, Dimensions, StyleSheet } from 'react-native';

interface Props {

}

interface State {

}

class SideDrawer extends React.PureComponent<Props, State>{

    public constructor(props : Props){
        super(props);
        this.state = {};
    }

    public render() : JSX.Element{
        return (
            <View style={Style.container}>
                <Text> Side Drawer </Text>
            </View>
        );
    }

}

export default SideDrawer