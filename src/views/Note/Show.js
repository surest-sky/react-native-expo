import * as React from 'react';
import { View, Animated, Text, TextInput, StyleSheet, Dimensions, ScrollView, PanResponder } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from '../../utils/toast';
import { showApi } from '../../apis/list';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Appbar, Divider, Caption } from 'react-native-paper';
import LoadingComponent from '../../Components/Loading';
import MoreComponent from '../Home/More';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

/**
 * 顶部导航
 * @returns
 */
const AppHeaderBar = ({ navigation, showMore }) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Appbar.Content title="详情" />
            <Appbar.Action
                icon={MORE_ICON}
                onPress={() => {
                    showMore();
                }}
            />
        </Appbar.Header>
    );
};

const Item = ({ content }) => {
    return (
        <View style={{ padding: 10 }}>
            <Caption style={{ marginTop: 10, textAlign: 'center' }}>{content.created_at}</Caption>
            <View style={{ minHeight: 100, marginTop: 20 }}>
                <Text>{content.content}</Text>
            </View>
        </View>
    );
};

/**
 * 组件
 * @param {*} param0
 * @returns
 */
const Show = ({ navigation, route }) => {
    const [content, setContent] = React.useState({});
    const [moreItem, setMoreItem] = React.useState({
        visible: false,
        item: {},
    });
    const [loading, setLoading] = React.useState(true);
    const showMore = () => {
        setMoreItem({ ...moreItem, visible: true });
    };

    React.useEffect(async () => {
        const data_id = route.params.data_id;
        const { data } = await showApi({ data_id: data_id });
        setContent(data);
        setLoading(false);

        setMoreItem({ ...moreItem, item: data });
    }, []);

    return (
        <View style={styles.container}>
            <AppHeaderBar navigation={navigation} showMore={showMore} />
            {loading ? <LoadingComponent /> : <Item content={content} />}
            <MoreComponent moreItem={moreItem} setMoreItem={setMoreItem} item />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'white',
    },
    editor: {
        width: width,
        paddingTop: 15,
        paddingHorizontal: 10,
        height: height - 150,
        borderRadius: 10,
        shadowColor: '#414141',
        shadowOffset: { h: 15, w: 15 },
        shadowRadius: 3,
        shadowOpacity: 0.1,
    },
    editorButton: {
        // width: 50,
        // height: 40,
        // borderRadius: 30,
        // position: 'absolute',
        // bottom: 400,
        // right: 10,
    },
});

export default Show;
