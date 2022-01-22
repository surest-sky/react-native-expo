import request from '../utils/request';

export function verifyCode(query) {
    console.log(query);
    return request({
        url: '/auth/verifyCode',
        method: 'post',
        params: query,
    });
}
