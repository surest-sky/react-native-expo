import React, { Component, useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Banner } from 'react-native-paper';
import * as RootNavigation from '../../utils/rootNavigation';
import LeftReturnBanner from '../../Components/LeftReturnBanner';
import { View, Text } from 'react-native';

const Show = ({ route }) => {
    const url = route.params.url;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    return <WebView style={{ height: 800, weight: 200 }} source={{ uri: url }} style={{ marginTop: 20 }} />;
};
const WView = ({ url }) => {
    return <WebView style={{ height: 800, weight: 200 }} source={{ uri: url }} style={{ marginTop: 20 }} />;
};
export default Show;
