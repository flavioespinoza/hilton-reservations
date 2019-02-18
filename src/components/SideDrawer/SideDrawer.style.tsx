import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { $DateInput, $TextInput, $Color } from '../../utils/styleMixins'

const Style = StyleSheet.create({
    container: {
        marginTop: 22,
        backgroundColor: 'white',
        width: Dimensions.get("window").width * 0.8
    }
})

export { Style }
