import * as React from "react";
import {
  Platform,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";

import _ from "lodash";

import { Button } from "react-native-elements";

import { AppStyle } from "./app.style";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
type State = {
  arrivalDate: string;
  departureDate: string;
  hotel: string;
  firstName: string;
  lastName: string;
  name: string;
  reservationId: string;
  isDateTimePickerVisible: boolean;
  dateType: any;
};

function formatDate(inputFormat: Date) {
  function pad(s: any) {
    return s < 10 ? "0" + s : s;
  }

  let d = new Date(inputFormat);

  return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
}

let $PlaceholderOpacity = 0.7;

class App extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      arrivalDate: "",
      departureDate: "",
      hotel: "",
      firstName: "",
      lastName: "",
      name: "",
      reservationId: "",
      isDateTimePickerVisible: false,
      dateType: null
    };
  }

  private _showDateTimePicker = (type: string): void => {
    if (type === "arrival") {
      this.setState({
        isDateTimePickerVisible: true,
        dateType: "arrival"
      });
    } else if (type === "departure") {
      this.setState({
        isDateTimePickerVisible: true,
        dateType: "departure"
      });
    }
  };

  private _hideDateTimePicker = (): void => {
    this.setState({
      isDateTimePickerVisible: false,
      dateType: null
    });
  };

  private _handleDatePicked = (date: Date): void => {
    if (this.state.dateType === "arrival") {
      //TODO: CHECK DATE SEQUENCE
      let arrival = formatDate(date);
      this.setState({
        arrivalDate: arrival,
        isDateTimePickerVisible: false,
        dateType: null
      });
    } else if (this.state.dateType === "departure") {
      //TODO: CHECK DATE SEQUENCE
      let departure = formatDate(date);
      this.setState({
        departureDate: departure,
        isDateTimePickerVisible: false,
        dateType: null
      });
    }
  };

  private _createReservation = (): void => {
    if (this.state.firstName.length > 0 && this.state.lastName.length > 0) {
      let name = `${this.state.firstName} ${this.state.lastName}`;
      this.setState({
        name: name
      });
    }
  };

  render() {
    return (
      <View style={AppStyle.container}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={() => {
            this._hideDateTimePicker();
          }}
        />

        <TouchableOpacity
          style={AppStyle.dateSelectionTouchable}
          onPress={() => {
            this._showDateTimePicker("arrival");
          }}
        >
          <Text style={AppStyle.arrivalDate}>
            {this.state.arrivalDate.length > 0 ? (
              this.state.arrivalDate
            ) : (
              <Text style={AppStyle.placeholderText}>Arrival date</Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={AppStyle.dateSelectionTouchable}
          onPress={() => {
            this._showDateTimePicker("departure");
          }}
        >
          <Text style={AppStyle.departureDate}>
            {this.state.departureDate.length > 0 ? (
              this.state.departureDate
            ) : (
              <Text style={AppStyle.placeholderText}>Departure date</Text>
            )}
          </Text>
        </TouchableOpacity>

        <TextInput
          ref={"firstNameTextInput"}
          style={[
            AppStyle.firstName,
            { opacity: this.state.firstName.length ? 1 : $PlaceholderOpacity }
          ]}
          placeholder="First name"
          placeholderTextColor="#ccc"
          onChangeText={(text: string) => {
            let name = _.toLower(text);
            this.setState({
              firstName: _.upperFirst(name)
            });
          }}
          value={this.state.firstName}
        />

        <TextInput
          ref={"lastNameTextInput"}
          style={[
            AppStyle.lastName,
            { opacity: this.state.lastName.length ? 1 : $PlaceholderOpacity }
          ]}
          placeholder="Last name"
          placeholderTextColor="#ccc"
          onChangeText={(text: string) => {
            let name = _.toLower(text);
            this.setState({
              lastName: _.upperFirst(name)
            });
          }}
          value={this.state.lastName}
        />

        <Button
          title={"Create Reservation"}
          type={"outline"}
          style={AppStyle.btn}
          onPress={this._createReservation}
        />

        {this.state.name.length > 0 ? (
          <View>
            <Text style={AppStyle.welcome}>{this.state.name}</Text>
            <Text style={AppStyle.welcome}>{this.state.departureDate}</Text>
            <Text style={AppStyle.welcome}>{this.state.arrivalDate}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default App;
