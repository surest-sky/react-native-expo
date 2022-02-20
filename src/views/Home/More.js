import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Chip } from 'react-native-paper';
import Toast from '../../utils/toast';
import { noteDelApi } from '../../apis/list';
import * as RootNavigation from '../../utils/rootNavigation';

const More = ({ moreItem, setMoreItem }) => {
    const hideDialog = () => setMoreItem({ ...moreItem, visible: false });

    /**
     * 删除
     */
    const deleteAction = async () => {
        const { item } = moreItem;
        const { data } = await noteDelApi({ data_id: item.data_id });
        console.log('data', data);
        Toast.success('删除成功');
        hideDialog();
        RootNavigation.navigate('Layout');
    };

    /**
     * 编辑
     */
    const editAction = async () => {
        const { item } = moreItem;
        hideDialog();
        RootNavigation.navigate('Edit', { data_id: item.data_id });
    };

    return (
        <Portal>
            <Dialog visible={moreItem.visible} onDismiss={hideDialog}>
                <Dialog.Title>操作</Dialog.Title>
                <Dialog.Content>
                    <Chip style={styles.chip} icon="delete" onPress={() => deleteAction()}>
                        删除
                    </Chip>
                    <Chip style={styles.chip} icon="square-edit-outline" onPress={() => editAction()}>
                        编辑
                    </Chip>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    chip: {
        marginTop: 10,
    },
});

export default More;
