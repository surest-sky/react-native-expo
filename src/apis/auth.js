import request from '../utils/request';

export function loginApi(data) {
    console.log(data);
    return request({
        url: '/login',
        method: 'post',
        data,
    });
}
