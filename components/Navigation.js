import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Articles from './Articles';
class HomeScreen extends React.Component {
    /*constructor(props) {
        super(props);
    }
    componentDidMount=() => {
        this.props.setPage("articles");
    }
    */
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

class SearchScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Search!</Text>              
            </View>
        );
    }
}

class LogoutScreen extends React.Component {
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Logout!</Text>              
            </View>
        );
    }
}

class RouteScreen extends React.Component {
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Route!</Text>              
            </View>
        );
    }
}

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={HomeScreen} />
                <Tab.Screen name="Search" component={Articles} />
                <Tab.Screen name="Logout" component={LogoutScreen} />
                <Tab.Screen name="Route" component={RouteScreen} />
            </Tab.Navigator>
        </NavigationContainer>     
    )
}
export default Tabs;