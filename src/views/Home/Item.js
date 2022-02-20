import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as React from 'react';
import * as RootNavigation from '../../utils/rootNavigation';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const contentTitle = (title, length = 35) => {
    if (title.length > 10) {
        return title.substr(0, length) + '...';
    }
    return title;
};
const ItemComponent = ({ item, sheetRef, setSheetContent, setMoreItem }) => {
    const showNote = () => {
        if (item.url) {
            RootNavigation.navigate('WebShow', { url: item.url });
        } else {
            // // Toast.success('稍等片刻，开发中呢~');
            // setSheetContent({
            //     content: `${item.content}`,
            //     created_at: `创建时间: ${item.created_at}`,
            // });
            // sheetRef.current.open();

            RootNavigation.navigate('Show', { data_id: item.data_id });
        }
    };
    return (
        <TouchableOpacity style={styles.item} onPress={() => showNote()} rippleColor="rgba(0, 0, 0, .12)">
            <View>
                <View style={{ marginTop: 10 }}>
                    <Text>{contentTitle(item.content ? item.content : '-')}</Text>

                    {item.url ? <Text style={{ marginTop: 10, color: 'gray', fontSize: 12 }}>{contentTitle(item.url)}</Text> : <Text></Text>}
                </View>

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.itemDesc}>{item.created_at}</Text>
                    <Text
                        onPress={() => {
                            setMoreItem({ item: item, visible: true });
                        }}
                        style={{ fontSize: 20, marginTop: 0 }}
                    >
                        ....
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        // height: 75,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        paddingBottom: 10,
        borderRadius: 10,
        shadowColor: '#414141',
        shadowOffset: { h: 15, w: 15 },
        shadowRadius: 3,
        shadowOpacity: 0.1,
    },
    itemDesc: {
        fontSize: 12,
        color: '#a39e9e',
        marginTop: 12,
    },
    itemTag: {
        width: 50,
        backgroundColor: '#4bc2c5',
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        height: 15,
    },
});

export default ItemComponent;
