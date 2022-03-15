import * as React from 'react-native';
import { Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const Tags = () => {
    const tags = [
        {
            id: 1,
            value: 'Python',
        },
        {
            id: 2,
            value: 'Php',
        },
        {
            id: 3,
            value: 'Golang',
        },
    ];
    return (
        <View style={styles.tagContainer}>
            {tags.map(tag => {
                return (
                    <Chip key={tag.id} mode="outlined" style={styles.tagItem} onPress={() => console.log('Pressed')}>
                        {tag.value}
                    </Chip>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
    },
    tagItem: {
        width: 80,
        textAlign: 'center',
        marginLeft: 4,
    },
});

export default Tags;
