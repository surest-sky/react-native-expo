import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, SafeAreaView, TouchableOpacity, Text, FlatList, Dimensions, ScrollView } from 'react-native';
import { Searchbar, Chip, TouchableRipple } from 'react-native-paper';
import * as RootNavigation from '../../utils/rootNavigation';
import { listApi } from '../../apis/list';
import Toast from '../../utils/toast';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemComponent from './Item';
import LoadingComponent from '../../Components/Loading';
import MoreComponent from './More';
import Empty from '../../Components/Empty';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/**
 * 导航到 搜索界面
 */
const NativeSearchPage = () => {
    RootNavigation.navigate('Search');
};

const SerachBar = () => {
    return (
        <TouchableRipple
            style={styles.searchBar}
            onPress={() => {
                NativeSearchPage();
            }}
        >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 20 }}>
                <Text style={styles.searchBarText}>搜索你的关键词...</Text>
                <View style={styles.searchIcon}>
                    <Ionicons style={{ color: '#181407' }} name={'search'} size={25} />
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
    const [total, setTotal] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [moreItem, setMoreItem] = React.useState({
        visible: false,
        item: {},
    });

    const searchQuery = async () => {
        setLoading(true);
        const list = await getList();
        setLoading(false);
        setList(list);
    };

    const onRefresh = async () => {
        setFilter({ ...filter, page: 1, pageSize: 20 });
        await searchQuery();
        setRefreshing(false);
    };

    const sheetRef = React.useRef();
    const [sheetContent, setSheetContent] = React.useState({
        content: '',
        created_at: '',
    });

    const getList = async () => {
        const data = await listApi(filter);
        if (data) {
            if (data.data.list) {
                setTotal(data.data.total);
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
        setLoading(true);
        searchQuery();
        setLoading(false);
        setRefreshing(false);
    }, []);

    const renderItem = ({ item }) => {
        return <ItemComponent setMoreItem={setMoreItem} item={item} sheetRef={sheetRef} setSheetContent={setSheetContent} />;
    };

    const onEndReached = async () => {
        if (total <= list.length) {
            return;
        }

        console.log('onEndReached');
        // setFilter({ ...filter, page: filter.page++ });
        // const data = await listApi(filter);
        // let tempList = list;
        // if (data) {
        //     tempList = tempList.concat(data.data.list);
        //     setList(tempList);
        // }
        return;
    };

    //产生随机数函数
    function RndNum(n) {
        var rnd = '';
        for (var i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

    const RenderList = () => {
        if (list.length == 0) {
            return <Empty />;
        }

        return (
            <View style={styles.wrapper}>
                <FlatList
                    sheetRef={sheetRef}
                    initialNumToRender={7}
                    onEndReachedThreshold={0.1}
                    refreshing={refreshing}
                    onEndReached={onEndReached}
                    data={list}
                    onRefresh={onRefresh}
                    renderItem={renderItem}
                    keyExtractor={item => RndNum(10)}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <SerachBar />

            {loading == true ? <LoadingComponent /> : <RenderList />}
            <MoreComponent moreItem={moreItem} setMoreItem={setMoreItem} />

            <RBSheet
                ref={sheetRef}
                // height={height - 00}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        paddingHorizontal: 5,
                        paddingLeft: 20,
                    },
                }}
            >
                <ScrollView>
                    <Text>{sheetContent.content}</Text>
                    <Text style={styles.itemDesc}>{sheetContent.created_at}</Text>
                </ScrollView>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        height: height - 110,
    },
    wrapper: {
        // minHeight: 650,
        // marginBottom: 25,
        minHeight: 100,
        // padding: 5,
        // paddingBottom: 85,
    },
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
    content: {
        width: '80%',
    },

    searchBar: {
        // borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        height: 35,
        lineHeight: 35,
    },
    searchBarText: {
        height: 35,
        lineHeight: 35,
        width: 120,
        color: '#181407',
    },
    searchIcon: {
        height: 35,
        lineHeight: 35,
        width: 25,
        marginTop: 5,
    },
});

export default Home;
