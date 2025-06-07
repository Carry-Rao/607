import checkToken from './safe/token.js';

if (!checkToken()) {
    window.location.href = '/login.html';
}