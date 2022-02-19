import * as React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from '../../utils/toast';
import { postApi } from '../../apis/list';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Appbar } from 'react-native-paper';

const height = Dimensions.get('window').height;
const Editor = () => {
    const [value, onChangeText] = React.useState('');
    const [content, setContent] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async () => {
        if (content.length == 0) {
            Toast.warning('请输入笔记内容');
            return;
        }

        setLoading(true);
        const data = await postApi({ content: content });
        setLoading(false);
        Toast.success('发布成功 !');

        setContent('');
    };
    return (
        <View>
            <TextInput value={content} multiline textAlignVertical={'top'} editable numberOfLines={4} style={styles.editor} onChangeText={text => setContent(text)} />
            <Button loading={loading} contentStyle={{ height: 40 }} style={styles.editorButton} icon="" mode="contained" onPress={onSubmit}>
                快速发布
            </Button>
        </View>
    );
};

const AppHeaderBar = () => {
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Title" subtitle="Subtitle" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    );
};
const Publish = ({ navigation }) => {
    const sheetRef = React.useRef();

    return (
        <View style={styles.container}>
            {/* <AppHeaderBar /> */}
            <Editor />
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
            >
                <ScrollView>
                    <Text>222</Text>
                </ScrollView>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        paddingHorizontal: 5,
    },
    editor: {
        height: height - 500,
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
    },
    editorButton: {
        marginTop: 10,
    },
});

export default Publish;
