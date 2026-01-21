function authGuard() {
    if (!getAccessToken()) {
        window.location.href = 'index.html';
    }
}

function logout() {
    clearToken();
    window.location.href = 'login.html';
}
