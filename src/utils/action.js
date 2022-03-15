import Storage from './storage';
import { meApi } from '../../src/apis/auth';
import Toast from './toast';
import * as RootNavigation from './rootNavigation';

export const LoginAction = ({ token }) => {
    Storage.save('token', { token: token });
};

export const LogoutAction = () => {
    Storage.delete('token');
    Storage.delete('user');
    RootNavigation.navigate('Login');
};

export const AuthCheck = async () => {
    const data = await Storage.get('token');
    if (!data || !data.token) {
        RootNavigation.navigate('Login');
        Toast.warning('请重新登录');
        return;
    }

    // setProfile();
};

const setProfile = async () => {
    const { code, data } = await meApi();
    Storage.save('user', data.data);
};
