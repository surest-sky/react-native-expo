import { Text, StyleSheet } from 'react-native';

const Profile = ({ navigation, route }) => {
    const { action, value } = route.params;
    if (action == 'password') {
        return <Password />;
    }

    if (action == 'username') {
        return <UserName />;
    }

    return <Text>暂无操作</Text>;
};

/**
 * 密码修改
 */
const Password = () => {
    return <Text>密码修改</Text>;
};

/**
 * 账户用户名修改
 */
const UserName = () => {
    return <Text>用户名称修改</Text>;
};

const App = props => {
    return <Profile {...props} />;
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
    },
});

export default App;
