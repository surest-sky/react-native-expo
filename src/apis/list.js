import request from '../utils/request';

export function listApi(data) {
    return request({
        url: '/note/list',
        method: 'get',
        params: data,
    });
}

export function postApi(data) {
    return request({
        url: '/note/post',
        method: 'post',
        data,
    });
}

export function showApi(data) {
    return request({
        url: '/note/show',
        method: 'get',
        params: data,
    });
}

export function noteDelApi(data) {
    return request({
        url: '/note/delete',
        method: 'delete',
        params: data,
    });
}
