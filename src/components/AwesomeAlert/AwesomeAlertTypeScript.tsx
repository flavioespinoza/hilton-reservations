import React, { Component } from "react";
import { View } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts'
interface AwesomeAlertTypeScriptProps {

}

interface AwesomeAlertTypeScriptState {

}

export default class AwesomeAlertTypeScript extends Component {
    render() {
      return <AwesomeAlert {...this.props} />;
    }
}