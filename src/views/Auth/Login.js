import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import validator from '../../utils/validator';
import { verifyCode } from '../../apis/auth';
import * as Animatable from 'react-native-animatable';
import BackgroundImage from '../../../resource/images/home.jpeg';
/**
 * 发送验证码
 * @param {*} phone
 */
const verifyCodeApi = async phone => {
    const data = await verifyCode({ phone });
};

const TextBanner = () => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 20 }}>
                Hi, <Text style={{ color: '#13ce66' }}>好久不见</Text>
            </Text>
            <View>
                <Text style={styles.bannerText}>我们不仅在做笔记</Text>
            </View>

            <View>
                <Text style={styles.bannerText}>还在做增援未来的自己</Text>
            </View>
        </View>
    );
};

const TextInputWrapper = ({ navigation }) => {
    /**
     * 变量相关
     */
    const [form, setForm] = React.useState({
        phone: '18270952773',
        loading: false,
        isValid: true,
    });

    /**
     * 获取验证码
     * @returns
     */
    const verifyCode = () => {
        setForm({ ...form, loading: true });
        if (!validator.validatePhone(form.phone)) {
            setForm({ ...form, isValid: false, loading: false });
            alert('手机号码格式错误');
            return;
        }

        setTimeout(() => {
            setForm({ ...form, isValid: true, loading: false });
            verifyCodeApi(form.phone);
            // alert('获取验证码成功');

            navigation.navigate('Verify');
        }, 2000);
    };

    return (
        <View style={styles.loginContainer}>
            <TextInput
                style={{ height: 40 }}
                label="Phone"
                value={form.phone}
                mode="outlined"
                error={!form.isValid}
                maxLength={11}
                onChangeText={phone => setForm({ ...form, phone: phone })}
                left={<TextInput.Icon name="phone" color={'#ccc'} />}
                keyboardType="phone-pad"
            />
            <View style={{ marginTop: 10 }}>
                <Button mode="contained" contentStyle={{ height: 40 }} onPress={() => verifyCode()} loading={form.loading}>
                    获取验证码
                </Button>
            </View>
        </View>
    );
};

const Login = ({ navigation }) => {
    return (
        <View>
            <StatusBar backgroundColor="red" translucent={true} />
            <Animatable.Text style={styles.titleText} animation="fadeInUp" delay={1200}>
                Travello
            </Animatable.Text>
            <Image style={{ height: 500 }} source={BackgroundImage}></Image>
            <TextInputWrapper navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#fff',
        fontFamily: 'SourceSansProBold',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    banner: {
        height: 200,
    },
    loginContainer: {
        padding: 10,
        paddingTop: 20,
        height: 400,
        marginTop: 25,
    },
    bannerText: {
        color: '#a39e9e',
    },
});

export default Login;
