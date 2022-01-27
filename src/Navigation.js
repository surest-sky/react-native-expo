import * as React from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as RootNavigation from './utils/rootNavigation';
import Login from '../src/views/Auth/LoginPage';
import Verify from '../src/views/Auth/Verify';
import Layout from './views/Layout/Index';
import Show from './views/Home/Show';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer ref={RootNavigation.navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Layout">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Verify" component={Verify} />
                <Stack.Screen name="Layout" component={Layout} />
                <Stack.Screen name="Show" component={Show} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
