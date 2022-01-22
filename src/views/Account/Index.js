import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Account = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Account</Text>
        <Button
            mode="contained"
            onPress={() => {
                navigation.navigate('Login');
            }}
        >
            退出登录
        </Button>
    </View>
);

export default Account;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop: 30,
        marginHorizontal: 2,
    },
});
