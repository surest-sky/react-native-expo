import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

import LeftReturnBanner from '../../Components/LeftReturnBanner';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    root: { minHeight: 200, width: '90%', marginLeft: '5%' },
    title: { textAlign: 'center', fontSize: 20, marginTop: 10 },
    fieldRow: {
        marginTop: 20,
        flexDirection: 'row',
    },
    cell: {
        width: '18.8%',
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        // marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#dddfe6',
        marginHorizontal: 2,
    },
    toggle: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 24,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    verifyCode: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

const CELL_COUNT = 5;

// Inspired by
// https://github.com/retyui/react-native-confirmation-code-field/issues/129
// https://dribbble.com/shots/8020632/attachments/530078?mode=media

const Verify = ({ navigation }) => {
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const toggleMask = () => setEnableMask(f => !f);
    const [loading, setLoading] = useState(false);
    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };

    const changeCode = v => {
        setValue(v);

        console.log(v);
        if (v.length == 5) {
            setLoading(true);

            setTimeout(() => {
                navigation.navigate('Layout');
            }, 1000);
        }
    };

    return (
        <View>
            <LeftReturnBanner navigation={navigation} title={'输入验证码'} />
            <SafeAreaView style={styles.root}>
                <View style={styles.fieldRow}>
                    <CodeField
                        style={styles.verifyCode}
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={v => changeCode(v)}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button mode="contained" contentStyle={{ height: 40 }} loading={loading}>
                        {loading ? '登录中' : '重新获取验证码'}
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Verify;
