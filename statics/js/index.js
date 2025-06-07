import checkToken from './statics/js/safe/token.js';

if (!checkToken()) {
    window.location.href = '/login.html';
}