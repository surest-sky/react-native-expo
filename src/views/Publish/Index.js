import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Toast from '../../utils/toast';
import { postApi } from '../../apis/list';

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
const Publish = ({ navigation }) => (
    <View style={styles.container}>
        <Editor />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        paddingHorizontal: 5,
    },
    editor: {
        height: 300,
        padding: 5,
        backgroundColor: 'white',
        borderColor: '#fff',
        borderWidth: 1,
    },
    editorButton: {
        marginTop: 10,
    },
});

export default Publish;
