import React, { Component, PureComponent } from 'react'
import { StyleSheet, Text, View, SectionList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { TabNavigator } from 'react-navigation'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Apollo client
const client = new ApolloClient({
    uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
})

class ContattiInterni extends PureComponent {
    GetSectionListItem = (item) => {
        Alert.alert(item)
    }

    render() {
        var A = ['Andrea', 'Andrea']
        var E = ['Emanuele Nardi', 'Emanuele Nardi', 'Emanuele Nardi']
        var T = [
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer',
            'Tiziano Pojer'
        ]

        return (
            <View>
                <Text style={{padding: 4}}>Search List</Text>
                <SectionList
                    sections={[{ title: 'A', data: A }, { title: 'E', data: E }, { title: 'T', data: T }]}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
                    )}
                    renderItem={({ item }) => (
                        <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}>
                            {' '}
                            {item}{' '}
                        </Text>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SectionHeaderStyle: {
        backgroundColor: '#EF5356',
        fontSize: 10,
        padding: 5,
        color: 'white'
    },

    SectionListItemStyle: {
        fontSize: 15,
        padding: 20,
        color: 'black',
        backgroundColor: 'white'
    }
})

class ContattiEsterni extends PureComponent {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>Section List con contatti esterni</Text>
            </View>
        )
    }
}

const TabBarOptions = {
    tabBarOptions: {
        activeTintColor: '#EF5356', // Label and icon color of the active tab
        allowFontScaling: true, // Whether label font should scale to respect Text Size accessibility settings
        inactiveTintColor: 'gray', // Label and icon color of the inactive tab
        pressColor: '#EF5356', // Color for material ripple (Android >= 5.0 only)
        pressOpacity: 0.5, // Opacity for pressed tab (iOS and Android < 5.0 only)
        showIcon: false, // Whether to show icon for tab
        showLabel: true, // Whether to show label for tab
        // scrollEnabled: 'true',     // Whether to enable scrollable tabs, currently not working
        upperCaseLabel: true, // Whether to make label uppercase

        indicatorStyle: {
            backgroundColor: '#EF5356', // Color for the indicator
            opacity: 100 // https://github.com/react-navigation/react-navigation/issues/1161
        },

        activeTabStyle: {
            backgroundColor: 'red'
        },
        style: {
            backgroundColor: 'white'
        }
    },
    animationEnabled: true,
    tabBarVisible: true,
    swipeEnabled: true
}

const Tabs = TabNavigator(
    {
        Caserma: { screen: ContattiInterni },
        Esterni: { screen: ContattiEsterni }
    },
    TabBarOptions
)


export default class App extends React.PureComponent {
    render() {
        return (
            <ApolloProvider client={client}>
                <Tabs/>
            </ApolloProvider>
        )
    }
}
