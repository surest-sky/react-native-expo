import * as React from 'react';
import { View, useTheme, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, Headline, Avatar } from 'react-native-paper';
import { LogoutAction } from '../../utils/action';
import { Switch, Title, TouchableRipple } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AvatarImage from '../../../assets/dotdotbear.png';
import { getUser } from '../../apis/profile';
import LoadingComponent from '../../Components/Loading';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ListItem = ({ label, value, action, navigation }) => {
    const onPress = () => {
        if (!action) {
            return;
        }
        if (action == 'logout') {
            LogoutAction();
            return;
        }

        navigation.navigate('Profile', { action, value });
    };
    return (
        <TouchableRipple onPress={onPress}>
            <View style={styles.listItem}>
                <Text>{label}</Text>
                <Text>{value}</Text>
            </View>
        </TouchableRipple>
    );
};

const Account = ({ navigation, route }) => {
    const [isNight, setNight] = React.useState(true);
    const [user, setUser] = React.useState({
        phone: '',
        account: '',
    });
    const [loading, setLoading] = React.useState(true);
    const toggleSwitch = previousState => {
        setNight(previousState => !previousState);
    };
    const getPhone = () => {
        if (!user.phone) {
            return '';
        }
        return user.phone.substr(0, 3) + '*****' + user.phone.substr(-3, 3);
    };

    React.useEffect(async () => {
        const { data } = await getUser();
        setUser(data);
        setLoading(false);

        return () => setLoading(true);
    }, []);

    if (loading) {
        return (
            <View style={{ marginTop: 100 }}>
                <LoadingComponent />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                        onPress={() => {
                            navigation.navigate('Scanner');
                        }}
                        style={{ fontSize: 15, color: 'white' }}
                    >
                        扫一扫
                    </Text>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Switch style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }], marginTop: -6, marginRight: -10 }} value={isNight} onValueChange={toggleSwitch} />
                        <Text style={{ fontSize: 15, color: 'white' }}>{isNight ? '日间模式' : '夜间模式'}</Text>
                    </View> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 15, color: 'white' }} onPress={LogoutAction}>
                            退出登录
                        </Text>
                    </View> */}
                </View>

                <View style={styles.header}>
                    <Avatar.Image size={60} source={AvatarImage} />
                    <View
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        <Title style={styles.name}>{user.account}</Title>
                        <Text style={styles.subId}>ID: {user.user_id}</Text>
                    </View>
                </View>

                <View style={styles.follow}>
                    <View style={[styles.followItem, { borderRightWidth: 1 }]}>
                        <Text style={styles.followItemText}>1 我关注的人</Text>
                    </View>
                    <View style={styles.followItem}>
                        <Text style={styles.followItemText}>10 关注我的人</Text>
                    </View>
                </View>
            </View>

            <View style={styles.list}>
                <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <ListItem label={'用户名'} value={user.account} action={'username'} navigation={navigation} />
                    {/* <ListItem label={'邮箱'} value={'chenf@surest.cn'} /> */}
                    {/* <ListItem label={'手机号码'} value={} /> */}
                </View>

                <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <ListItem label={'修改密码'} action={'password'} navigation={navigation} />
                    {/* <ListItem label={'账号绑定'} /> */}
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <ListItem label={'退出登录'} action={'logout'} />
                </View>
            </View>

            {/* <Button mode="contained" onPress={LogoutAction}>
                退出登录
            </Button> */}
        </View>
    );
};

export default Account;

const styles = StyleSheet.create({
    container: {},
    banner: {
        backgroundColor: '#515bd4',
        height: 250,
        width: width,
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 20,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        color: 'white',
        alignItems: 'center',
        marginTop: 5,
    },
    subId: {
        fontSize: 15,
        color: '#f2f4f6',
    },
    follow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: '#f2f4f6',
        paddingTop: 10,
    },
    followItem: {
        width: '50%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderRightColor: '#f2f4f6',
    },
    followItemText: {
        color: 'white',
    },
    list: {
        backgroundColor: '#f2f4f6',
        height: 600,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        backgroundColor: 'white',
        height: 40,
        padding: 10,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: '#f2f4f6',
    },
});
