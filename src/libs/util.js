import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const ajaxUrl = env === 'development' ?
    'http://localhost:3333' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});
util.ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default util;