let purchases = [];

$(document).ready(function () {
    $('#navbar').load('partials/navbar.html', function () {
        if (!getAccessToken()) {
            window.location.href = 'index.html';
            return;
        }

        $('#logout-btn').on('click', function () {
            clearToken();
            window.location.href = 'login.html';
        });

        initNavbar();
        setActiveNav?.();
    });

    loadPurchases();
});

function loadPurchases() {
    apiRequest({ url: '/purchases' })
        .done((res) => {
            purchases = res.data || [];
            renderPurchases(purchases);
        })
        .fail((xhr) =>
            showError(xhr.responseJSON?.message || 'Failed to load purchases')
        );
}

function renderPurchases(list) {
    const table = $('#purchase-table');
    table.empty();

    if (!list.length) {
        table.append(`
            <tr>
                <td colspan="6" class="px-6 py-6 text-center text-gray-500">
                    No purchases found
                </td>
            </tr>
        `);
        return;
    }

    list.forEach((p) => {
        table.append(`
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium">${p.id}</td>
                <td class="px-6 py-4">
                    ${new Date(p.date).toLocaleString()}
                </td>
                <td class="px-6 py-4">${p.supplier.name}</td>
                <td class="px-6 py-4">${p.user.username}</td>
                <td class="px-6 py-4 text-right">
                    Rp ${p.grand_total.toLocaleString('id-ID')}
                </td>
                <td class="px-6 py-4 text-center">
                    <a
                        href="purchase-view.html?id=${p.id}"
                        class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium">
                        <i class="fa-solid fa-eye"></i> View
                    </a>
                </td>
            </tr>
        `);
    });
}
