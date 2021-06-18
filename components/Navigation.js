import React from 'react';
import { Text, View,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
class HomeScreen extends React.Component {
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>              
            </View>
        );
    }
}

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={HomeScreen}  />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
        

    )
}

export default Tabs;