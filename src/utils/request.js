import axios from 'axios';
import { BASE_URL } from './pathMap';
import * as RootNavigation from './rootNavigation';
import Toast from './toast';
import Storage from './storage';

const instance = axios.create({
    baseURL: BASE_URL,
});
let token;
// create an axios instance
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 4000 * 60, // request timeout
});

// request interceptor
service.interceptors.request.use(
    async config => {
        const data = await Storage.get('token');
        if (data) {
            token = data.token;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;

        const data = res.data;
        const code = res.code;

        if (code == 200 || !code) {
            return Promise.resolve(res);
        }

        if (code == 401) {
            Toast.warning('请重新登录');
            RootNavigation.navigate('Login');
            return Promise.resolve(res);
        }

        if (code == 401) {
            return Promise.resolve(res);
        }

        if (code != 200) {
            return Promise.resolve(res);
        }
        return Promise.resolve(res);
    },
    error => {
        console.log(error);
        return Promise.resolve({});
    }
);

export default service;
