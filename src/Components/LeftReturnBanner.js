import * as React from 'react';
import { Appbar } from 'react-native-paper';
import * as RootNavigation from '../utils/rootNavigation';

const LeftReturnBanner = ({ title }) => (
    <Appbar.Header>
        <Appbar.BackAction
            onPress={() => {
                RootNavigation.navigate('Layout');
            }}
        />
        <Appbar.Content title={title} />
    </Appbar.Header>
);

export default LeftReturnBanner;
