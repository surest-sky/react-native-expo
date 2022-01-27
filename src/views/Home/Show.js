import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Banner } from 'react-native-paper';

import LeftReturnBanner from '../../Components/LeftReturnBanner';
import { View } from 'react-native';

const Show = () => {
    return (
        <View>
            <LeftReturnBanner title={'详情'} />
            <WView />
        </View>
    );
};
const WView = () => {
    return <WebView source={{ uri: 'https://github.com/facebook/react-native' }} style={{ marginTop: 20 }} />;
};
export default WView;
