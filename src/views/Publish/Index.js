import * as React from 'react';
import { View, Animated, Text, TextInput, StyleSheet, Dimensions, ScrollView, PanResponder } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from '../../utils/toast';
import { postApi } from '../../apis/list';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Appbar, Divider } from 'react-native-paper';

import * as RootNavigation from '../../utils/rootNavigation';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Editor = ({ content, setContent, loading }) => {
    return (
        <ScrollView>
            <Divider />
            <TextInput
                placeholder="说点什么吧"
                autoFocus={true}
                returnKeyType={'done'}
                value={content}
                multiline
                textAlignVertical={'top'}
                editable
                numberOfLines={4}
                style={styles.editor}
                onChangeText={text => setContent(text)}
            />
        </ScrollView>
    );
};

/**
 * 顶部导航
 * @returns
 */
const AppHeaderBar = ({ navigation, onSubmit, data_id, setIndex }) => {
    if (data_id) {
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="编辑" />
                <Appbar.Action
                    icon="checkbox-marked-circle"
                    onPress={() => {
                        onSubmit();
                    }}
                />
            </Appbar.Header>
        );
    }

    return (
        <Appbar.Header>
            <Appbar.BackAction
                onPress={() => {
                    setIndex(0);
                }}
            />
            <Appbar.Content title="发布文章" />
            <Appbar.Action
                icon="checkbox-marked-circle"
                onPress={() => {
                    onSubmit();
                }}
            />
        </Appbar.Header>
    );
};
/**
 * 组件
 * @param {*} param0
 * @returns
 */
const Publish = ({ navigation, route, setIndex }) => {
    let data_id;
    if (route) {
        data_id = route.params.data_id;
    }

    const sheetRef = React.useRef();
    const [value, onChangeText] = React.useState('');
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        if (content.length == 0) {
            Toast.warning('请输入笔记内容', Toast.CENTER);
            return;
        }

        setLoading(true);
        const data = await postApi({ content: content });
        setLoading(false);
        Toast.success('发布成功', Toast.CENTER);

        setContent('');
    };

    return (
        <View style={styles.container}>
            <AppHeaderBar navigation={navigation} onSubmit={onSubmit} data_id={data_id} setIndex={setIndex} />
            <Editor content={content} setContent={setContent} loading={loading} />

            <RBSheet
                ref={sheetRef}
                height={height - 100}
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
            ></RBSheet>
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

export default Publish;
