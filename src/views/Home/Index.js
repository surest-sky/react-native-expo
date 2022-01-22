import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, SafeAreaView, Text, FlatList, Dimensions } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';

const height = Dimensions.get('window').height;

const contentTitle = (title, length = 35) => {
    if (title.length > 10) {
        return title.substr(0, length) + '...';
    }

    return title;
};

const Item = ({ item }) => {
    const ContentItem = ({ item }) => {
        if (item.title) {
            return (
                <View>
                    <Text>{contentTitle(item.title, 5)}</Text>

                    <Text>
                        <Text>-</Text>
                        {contentTitle(item.url)}
                    </Text>
                </View>
            );
        }
        if (item.content) {
            return (
                <View>
                    <Text>{contentTitle(item.text)}</Text>
                </View>
            );
        }

        if (!item.title && !item.content) {
            return (
                <View>
                    <Text>{contentTitle(item.url)}</Text>
                </View>
            );
        }

        return <Text>顶顶顶顶</Text>;
    };

    return (
        <View style={styles.item}>
            <View style={styles.content}>
                <TouchableHighlight>
                    <ContentItem item={item} />
                </TouchableHighlight>

                <Text style={{ marginTop: 10 }}>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ marginRight: 10 }}>
                            -<Text>{item.created_at}</Text>
                        </Text>
                    </View>
                </Text>
            </View>
            <View style={styles.itemTag}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, height: 15 }}>{item.type == 1 ? '#链接' : '笔记'}</Text>
            </View>
        </View>
    );
};

const Home = () => {
    let list = require('../../res/list.json');
    list = list.list;
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const renderItem = ({ item }) => <Item item={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar style={{ marginBottom: 5 }} placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
            <View style={styles.wrapper}>
                <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop: 20,
        marginHorizontal: 2,
    },
    wrapper: {
        // height: 650,
        marginBottom: 25,
    },
    item: {
        height: 75,
        backgroundColor: 'white',
        marginVertical: 3,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        paddingBottom: 10,
    },
    itemTag: {
        width: '12%',
        backgroundColor: '#4bc2c5',
        marginLeft: 20,
        height: 15,
    },
    content: {
        width: '80%',
    },
});

export default Home;
