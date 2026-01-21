function apiRequest({ url, method = 'GET', data = null }) {
    return $.ajax({
        url: BASE_URL + url,
        method,
        contentType: 'application/json',
        headers: getAccessToken()
            ? { Authorization: `Bearer ${getAccessToken()}` }
            : {},
        data: data ? JSON.stringify(data) : null,
    });
}
