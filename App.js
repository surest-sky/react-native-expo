import * as React from 'react';
import { Button, View, Text, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/Navigation';

function App() {
    return (
        <PaperProvider>
            <View style={{ flex: 1 }}>
                <Navigation />
            </View>
        </PaperProvider>
    );
}

export default App;
