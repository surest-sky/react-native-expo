import * as React from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../src/views/Auth/Login';
import Verify from '../src/views/Auth/Verify';
import Layout from './views/Layout/Index';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Verify" component={Verify} />
                <Stack.Screen name="Layout" component={Layout} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
