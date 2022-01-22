import axios from 'axios';
import { BASE_URL } from './pathMap';

const instance = axios.create({
    baseURL: BASE_URL,
});

// create an axios instance
const service = axios.create({
    baseURL: BASE_URL,
    timeout: 4000 * 60, // request timeout
});

const token = 123;
// request interceptor
service.interceptors.request.use(
    config => {
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
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
            return Promise.resolve(data);
        }

        console.log(res);

        if (code == 403 && redirect) {
            alert('要退出登录');
            return Promise.reject('退出');
        }

        if (code == 401) {
            return Promise.reject(res.message);
        }

        if (code != 200) {
            return Promise.reject(res.message);
        }
        return Promise.reject(new Error('error'));
    },
    error => {
        console.log(error);
        alert('error');
        return Promise.reject('error');
    }
);

export default service;
