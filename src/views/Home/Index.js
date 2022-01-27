import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, SafeAreaView, Text, FlatList, Dimensions } from 'react-native';
import { Searchbar, Chip, TouchableRipple } from 'react-native-paper';
import * as RootNavigation from '../../utils/rootNavigation';
import { listApi } from '../../apis/list';

const height = Dimensions.get('window').height;

const contentTitle = (title, length = 35) => {
    if (title.length > 10) {
        return title.substr(0, length) + '...';
    }
    return title;
};

const Item = ({ item }) => {
    const noteShow = item => {
        RootNavigation.navigate('Show');
    };
    return (
        <TouchableRipple style={styles.item} onPress={() => noteShow(item)} rippleColor="rgba(0, 0, 0, .12)">
            <View>
                <View style={{ borderRadius: 15 }}>
                    <Text style={styles.itemTag}>笔记</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>{contentTitle(item.content ? item.content : item.url)}</Text>
                </View>

                <View>
                    <Text style={styles.itemDesc}>{item.created_at}</Text>
                </View>
            </View>
        </TouchableRipple>
    );
};

const Home = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [filter, setFilter] = React.useState({
        page: 1,
        pageSize: 20,
        keyword: '',
    });
    const [list, setList] = React.useState([]);
    const searchQuery = async () => {
        const list = await getList();
        setList(list);
    };

    const onRefresh = async () => {
        setFilter({ ...filter, page: 1, pageSize: 20 });
        await searchQuery();
        setRefreshing(false);
    };

    const getList = async () => {
        const data = await listApi(filter);
        if (data) {
            if (data.data.list) {
                return data.data.list.map(item => {
                    item.content = item.content ? item.content.replace(/(<([^>]+)>)/gi, '') : '';
                    return item;
                });
            }

            return [];
        }
        return [];
    };

    React.useEffect(async () => {
        searchQuery();
    }, []);

    React.useEffect(async () => {
        if (filter.keyword.length == 0) {
            searchQuery();
        }
    }, [filter.keyword]);

    const renderItem = ({ item }) => {
        return <Item item={item} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar style={{ marginBottom: 5, borderRadius: 15 }} placeholder="Search" onIconPress={searchQuery} onChangeText={query => setFilter({ ...filter, keyword: query })} value={filter.keyword} />
            <View style={styles.wrapper}>
                <FlatList refreshing={refreshing} data={list} onRefresh={onRefresh} renderItem={renderItem} keyExtractor={item => item.id} />
            </View>
        </SafeAreaView>
    );
};

function MyComponent(props) {
    return (
        <View {...props} style={{ flex: 1, backgroundColor: '#fff' }}>
            <Text>My Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 15,
        marginTop: 25,
        marginHorizontal: 2,
    },
    wrapper: {
        minHeight: 650,
        marginBottom: 25,
        minHeight: 100,
        padding: 5,
        paddingBottom: 85,
    },
    item: {
        // height: 75,
        backgroundColor: 'white',
        marginVertical: 3,
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
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
    content: {
        width: '80%',
    },
});

export default Home;
