import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import * as React from 'react';
import LeftReturnBanner from '../../Components/LeftReturnBanner';
import * as RootNavigation from '../../utils/rootNavigation';
import { updateUser } from '../../apis/profile';
import Toast from '../../utils/toast';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Profile = ({ navigation, route, cRef }) => {
    const { action, value } = route.params;
    const actionRef = React.useRef(null);

    const getItem = () => {
        return actionRef.current.getItem();
    };
    React.useImperativeHandle(cRef, () => ({
        getItem: getItem,
    }));

    if (action == 'password') {
        return <Password sRef={actionRef} />;
    }

    if (action == 'username') {
        return <UserName sRef={actionRef} params={route.params} />;
    }

    return <Text>暂无操作</Text>;
};

/**
 * 密码修改
 */
const Password = ({ sRef }) => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const getItem = () => {
        if (password.length < 6 || password.length > 12) {
            Toast.success('密码长度为 6-12 个字符串');
            return false;
        }
        if (password != confirmPassword) {
            Toast.success('两次密码输入不一致');
            return false;
        }
        return {
            password,
            confirmPassword,
        };
    };

    React.useImperativeHandle(sRef, () => ({
        getItem: getItem,
    }));
    return (
        <View>
            <View style={styles.passwordView}>
                <TextInput secureTextEntry={true} style={styles.passwordInput} placeholder="密码" onChangeText={v => setPassword(v)} value={password} />
            </View>
            <View style={styles.passwordView}>
                <TextInput secureTextEntry={true} style={styles.passwordInput} placeholder="确认密码" onChangeText={v => setConfirmPassword(v)} value={confirmPassword} />
            </View>
        </View>
    );
};

/**
 * 账户用户名修改
 */
const UserName = ({ sRef, params }) => {
    const [account, setAccount] = React.useState(params.value ? params.value : '');
    const [loading, setLoading] = React.useState(false);

    const getItem = () => {
        if (account.length == 0) {
            Toast.success('请输入用户名称');
            return false;
        }
        if (account.length < 2 || account.length > 12) {
            Toast.success('用户名称长度为 2-12 个字符串');
            return false;
        }

        return { account };
    };
    React.useImperativeHandle(sRef, () => ({
        getItem: getItem,
    }));
    return (
        <View>
            <View style={styles.passwordView}>
                <TextInput autoFocus style={styles.passwordInput} placeholder="用户名称" onChangeText={v => setAccount(v)} value={account} />
            </View>
        </View>
    );
};

/**
 * 邮箱修改
 */
const Email = () => {
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const submit = () => {
        console.log({ name });
    };
    return (
        <View>
            <View style={styles.passwordView}>
                <TextInput style={styles.passwordInput} placeholder="用户名称" onChangeText={v => setName(v)} value={name} />
            </View>
        </View>
    );
};

/**
 * 手机号码修改
 */
const Phone = () => {
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = () => {
        console.log({ name });
    };
    return (
        <View>
            <View style={styles.passwordView}>
                <TextInput style={styles.passwordInput} placeholder="用户名称" onChangeText={v => setName(v)} value={name} />
            </View>
        </View>
    );
};

const AppBar = ({ title, submit }) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction
                onPress={() => {
                    RootNavigation.navigate('Layout');
                }}
            />
            <Appbar.Content title={title} />
            <Appbar.Action icon="checkbox-marked-circle" onPress={submit} />
        </Appbar.Header>
    );
};

const App = props => {
    const profileRef = React.useRef(null);
    const submit = async () => {
        const item = profileRef.current.getItem();
        if (item == false) {
            return;
        }

        const { data, code, message } = await updateUser(item);
        if (code == 200) {
            Toast.success('修改成功');
            RootNavigation.navigate('Layout');
        }
        Toast.warning(message);
    };
    return (
        <View>
            <AppBar title={'资料修改'} submit={submit} />
            <View style={styles.container}>
                <Profile cRef={profileRef} {...props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 15,
        height: 300,
    },
    passwordInput: {
        padding: 10,
        height: 40,
        borderColor: 'white',
    },
    passwordView: {
        backgroundColor: 'white',
        marginTop: 10,
        width: '100%',
    },
});

export default App;
