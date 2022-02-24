import request from '../utils/request';

export function updateUser(data) {
    return request({
        url: '/profile/updateUser',
        method: 'post',
        data,
    });
}

export function getUser(data) {
    return request({
        url: '/me',
        method: 'get',
        params: data,
    });
}

export function sendVerifyCode(data) {
    return request({
        url: '/profile/sendVerifyCode',
        method: 'get',
        data,
    });
}
