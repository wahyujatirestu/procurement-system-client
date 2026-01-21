$(document).ready(function () {
    $('#navbar').load('partials/navbar.html', function () {
        if (!getAccessToken()) {
            window.location.href = 'login.html';
            return;
        }
        initNavbar?.();
        setActiveNav?.();
    });

    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        showError('Purchase ID not found');
        return;
    }

    loadPurchase(id);
});

function loadPurchase(id) {
    apiRequest({ url: `/purchases` })
        .done((res) => {
            const purchase = res.data.find((p) => p.id == id);
            if (!purchase) {
                showError('Purchase not found');
                return;
            }

            renderPurchase(purchase);
        })
        .fail(() => showError('Failed to load purchase'));
}

function renderPurchase(p) {
    $('#purchase-id').text(`#${p.id}`);
    $('#purchase-date').text(new Date(p.date).toLocaleString());
    $('#purchase-supplier').text(p.supplier.name);
    $('#purchase-user').text(p.user.username);
    $('#grand-total').text(`Rp ${p.grand_total.toLocaleString('id-ID')}`);

    const table = $('#items-table').empty();

    p.items.forEach((item) => {
        table.append(`
            <tr>
                <td class="px-4 py-3">${item.item_name}</td>
                <td class="px-4 py-3">${item.qty}</td>
                <td class="px-4 py-3">
                    Rp ${item.price.toLocaleString('id-ID')}
                </td>
                <td class="px-4 py-3">
                    Rp ${item.sub_total.toLocaleString('id-ID')}
                </td>
            </tr>
        `);
    });
}
