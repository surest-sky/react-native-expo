import * as React from 'react';
import { Button, View, Text, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

if (true) {
    import('./src/utils/ReactotronConfig').then(() => {
        console.log('ReactotronConfig');
    });
}
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#515bd4',
        // accent: 'white',
    },
};
function App() {
    return (
        <PaperProvider theme={theme}>
            <RootSiblingParent>
                <View style={{ flex: 1 }}>
                    <Navigation />
                </View>
            </RootSiblingParent>
        </PaperProvider>
    );
}

export default App;
