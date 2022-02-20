import * as React from 'react';
import react from 'react';
import { View, Text, StyleSheet, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { listApi } from '../../apis/list';
import ItemComponent from './Item';
import LoadingComponent from '../../Components/Loading';
import Empty from '../../../resource/images/empty.png';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Search = ({ searchQuery, filter, setFilter }) => {
    return (
        <View style={styles.searchBar}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 20 }}>
                {/* <Text style={styles.searchBarText}>搜索你的关键词...</Text> */}
                <TextInput
                    onBlur={() => searchQuery()}
                    returnKeyType={'search'}
                    placeholder={'请输入关键词搜索'}
                    clearButtonMode={true}
                    defaultValue={''}
                    autoFocus={true}
                    clearTextOnFocus={true}
                    style={styles.searchBarText}
                    onChangeText={keyword => setFilter({ ...filter, keyword: keyword })}
                    value={filter.keyword}
                    style={{ width: width - 60 }}
                />
                <View style={styles.searchIcon}>
                    <Ionicons
                        onPress={() => {
                            searchQuery();
                        }}
                        style={{ color: '#181407' }}
                        name={'search'}
                        size={25}
                    />
                </View>
            </View>
        </View>
    );
};

const ListItem = () => {
    const [list, setList] = react.useState([]);
    const [loading, setLoading] = React.useState(false);
    const sheetRef = React.useRef();
    const [filter, setFilter] = React.useState({
        keyword: '',
    });

    /**
     * 搜索
     */
    const searchQuery = async () => {
        setLoading(true);
        const list = await getList();
        console.log(list);
        setLoading(false);
        setList(list);
    };

    /**
     * 弹出框
     */
    const [sheetContent, setSheetContent] = React.useState({
        content: '',
        created_at: '',
    });

    /**
     * 列表数据获取
     * @returns
     */
    const getList = async () => {
        if (!filter.keyword.length) {
            return [];
        }

        const data = await listApi(filter);
        console.log('data', data);
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

    const RenderList = () => {
        if (!list.length) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <Image source={Empty}></Image>
                </View>
            );
        }
        return (
            <ScrollView style={{ height: height - 50 }}>
                {list.map(item => {
                    return <ItemComponent item={item} sheetRef={sheetRef} setSheetContent={setSheetContent} />;
                })}
            </ScrollView>
        );
    };

    const RenderContent = () => {
        return loading ? <LoadingComponent /> : <RenderList />;
    };

    return (
        <View>
            <Search searchQuery={searchQuery} filter={filter} setFilter={setFilter} />
            <RenderContent />

            <RBSheet
                ref={sheetRef}
                // height={height - 100}
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
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 35,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        marginVertical: 5,
        marginHorizontal: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        height: 35,
    },
    searchBarText: {
        // height: 35,
        // lineHeight: 35,
        // marginBottom: 6,
        width: 120,
        color: '#181407',
    },
    searchIcon: {
        height: 35,
        lineHeight: 35,
        width: 25,
        marginTop: 5,
    },

    itemDesc: {
        fontSize: 12,
        color: '#a39e9e',
        marginTop: 12,
    },
});

export default ListItem;
