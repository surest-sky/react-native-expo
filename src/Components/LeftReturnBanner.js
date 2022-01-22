import * as React from 'react';
import { Appbar } from 'react-native-paper';

const LeftReturnBanner = ({ navigation, title }) => (
    <Appbar.Header>
        <Appbar.BackAction
            onPress={() => {
                navigation.goBack();
            }}
        />
        <Appbar.Content title={title} />
    </Appbar.Header>
);

export default LeftReturnBanner;
