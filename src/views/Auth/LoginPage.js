import React, { useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard } from 'react-native';
import { TextInput, Card, Button } from 'react-native-paper';
// You can use your custom background image
import BackgroundImage from '../../../resource/images/WechatIMG345.jpeg';

// expo install expo-font
import { useFonts } from 'expo-font';

import validator from '../../utils/validator';
import { loginApi } from '../../apis/auth';
import { LoginAction } from '../../utils/action';
import Toast from '../../utils/toast';

// https://fonts.google.com/specimen/Source+Sans+Pro
import SourceSansProLight from '../../../resource/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf';
import SourceSansProRegular from '../../../resource/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf';
import SourceSansProBold from '../../../resource/fonts/Source_Sans_Pro/SourceSansPro-Bold.ttf';

// npm install react-native-elements
// import { Icon } from 'react-native-elements';

// npm install react-native-animatable
import * as Animatable from 'react-native-animatable';
import { useState } from 'react/cjs/react.development';

export default function Login({ navigation }) {
    /**
     * 变量相关
     */
    const [form, setForm] = React.useState({
        phone: '18270952773',
        loading: false,
        password: '',
        isValid: true,
        isValidPass: true,
    });

    /**
     * 获取验证码
     * @returns
     */
    const submit = async () => {
        setForm({ ...form, loading: true });
        if (!validator.validatePhone(form.phone)) {
            setForm({ ...form, isValid: false, loading: false });
            Toast.warning('手机号码格式错误');
            return;
        }

        if (!form.password) {
            setForm({ ...form, isValid: false, isValidPass: false, loading: false });
            Toast.warning('请输入密码');
            return;
        }

        const { code, data, message } = await loginApi({ phone: form.phone, password: form.password });
        setForm({ ...form, isValid: false, loading: false });
        if (code == 200) {
            LoginAction(data);
            navigation.navigate('Layout');
            Toast.success('登录成功');
        } else {
            console.log({ code, data, message });
            Toast.warning(message ? message : 'Error');
        }
    };

    const [loaded] = useFonts({
        SourceSansProLight,
        SourceSansProRegular,
        SourceSansProBold,
    });

    if (!loaded || !BackgroundImage) {
        return <Text>Loading...</Text>;
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image resizeMode={'cover'} style={{ flex: 1, width: null, marginTop: -500 }} source={BackgroundImage} />
                </View>
                <Animatable.Text style={styles.titleText} animation="fadeInUp" delay={1200}>
                    Travello
                </Animatable.Text>
                <View style={styles.bottomView}>
                    <Text style={styles.loginText}>Login</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={{ height: 40, width: '100%' }}
                            label="Phone"
                            value={form.phone}
                            mode="outlined"
                            error={!form.isValid}
                            maxLength={11}
                            onChangeText={phone => setForm({ ...form, phone: phone })}
                            left={<TextInput.Icon name="phone" color={'#ccc'} />}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            secureTextEntry={true}
                            keyboardType="default"
                            style={{ height: 40, width: '100%' }}
                            label="Password"
                            value={form.password}
                            mode="outlined"
                            error={!form.isValidPass}
                            maxLength={11}
                            onChangeText={password => setForm({ ...form, password: password })}
                            left={<TextInput.Icon name="eye-outline" color={'#ccc'} />}
                        />
                    </View>
                    {/* <Text style={styles.fpText}>Forgot Password?</Text> */}
                    <View style={{ marginTop: 10 }}>
                        <Button mode="contained" contentStyle={{ height: 40 }} onPress={() => submit()} loading={form.loading}>
                            登录
                        </Button>
                    </View>
                    <Text style={styles.registerText}>{/* <Text style={{ fontFamily: 'SourceSansProBold' }}>其他方式</Text> */}</Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    loginText: {
        fontFamily: 'SourceSansProBold',
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
    },
    inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        flex: 1,
        fontFamily: 'SourceSansProRegular',
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#5352ed',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontFamily: 'SourceSansProBold',
        alignSelf: 'center',
        fontSize: 18,
    },
    registerText: {
        alignSelf: 'center',
        marginTop: 12,
        fontFamily: 'SourceSansProRegular',
        fontSize: 16,
    },
    fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontFamily: 'SourceSansProBold',
        fontSize: 16,
        color: '#5352ed',
    },
});
