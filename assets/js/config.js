const BASE_URL = 'http://localhost:8888/api/v1';
const TOKEN_KEY = 'access_token';

function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
}
