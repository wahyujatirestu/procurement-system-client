let cart = [];

$(document).ready(function () {
    // load navbar + protect page
    $('#navbar').load('partials/navbar.html', function () {
        if (!getAccessToken()) {
            window.location.href = 'index.html';
            return;
        }
        $('#logout-btn').on('click', function () {
            clearToken();
            window.location.href = 'login.html';
        });

        initNavbar?.();
        setActiveNav?.();
    });

    loadSuppliers();
    loadItems();
});

function loadSuppliers() {
    apiRequest({ url: '/suppliers' }).done((res) => {
        res.data.forEach((s) => {
            $('#supplier-select').append(
                `<option value="${s.id}">${s.name}</option>`
            );
        });
    });
}

function loadItems() {
    apiRequest({ url: '/items' }).done((res) => {
        res.data.forEach((i) => {
            $('#item-select').append(
                `<option value="${i.id}" data-price="${i.price}" data-stock="${i.stock}">${i.name}</option>`
            );
        });
    });
}

$('#add-cart-btn').on('click', function () {
    const itemId = $('#item-select').val();
    const qty = Number($('#item-qty').val());

    if (!itemId) return showError('Please select an item first');
    if (qty < 1) return showError('Quantity must be at least 1');

    const itemName = $('#item-select option:selected').text();
    const itemStock = Number($('#item-select option:selected').data('stock'));
    const itemPrice = Number($('#item-select option:selected').data('price'));

    if (qty > itemStock) return showError('Insufficient stock');

    const exists = cart.find((c) => c.item_id == itemId);
    if (exists) {
        exists.qty += qty;
    } else {
        cart.push({
            item_id: Number(itemId),
            name: itemName,
            qty,
            price: itemPrice,
        });
    }

    renderCart();
});

// Event delegation for delete button
$(document).on('click', '.remove-cart', function () {
    const id = $(this).data('id');
    cart = cart.filter((c) => c.item_id !== id);
    renderCart();
});

function renderCart() {
    const table = $('#cart-table');
    table.empty();

    if (!cart.length) {
        table.append(`
                <tr>
                    <td colspan="5" class="px-6 py-6 text-center text-gray-500">
                        Cart is empty
                    </td>
                </tr>
            `);
        updateSummary();
        return;
    }

    cart.forEach((c) => {
        const subtotal = c.qty * c.price;
        table.append(`
                <tr>
                    <td class="px-6 py-4 font-medium">${c.name}</td>
                    <td class="px-6 py-4">${c.qty}</td>
                    <td class="px-6 py-4">Rp ${c.price.toLocaleString('id-ID')}</td>
                    <td class="px-6 py-4">Rp ${subtotal.toLocaleString('id-ID')}</td>
                    <td class="px-6 py-4">
                        <button data-id="${c.item_id}" class="remove-cart text-red-600 hover:underline">
                            Remove
                        </button>
                    </td>
                </tr>
            `);
    });

    updateSummary();
}

function updateSummary() {
    const items = cart.length;
    const totalQty = cart.reduce((a, c) => a + c.qty, 0);
    const total = cart.reduce((a, c) => a + c.qty * c.price, 0);

    $('#summary-items').text(items);
    $('#summary-qty').text(totalQty);
    $('#summary-total').text(`Rp ${total.toLocaleString('id-ID')}`);
}

$('#submit-order-btn').on('click', function () {
    const supplierId = $('#supplier-select').val();

    if (!supplierId) return showError('Please select a supplier first');
    if (!cart.length) return showError('Your cart is still empty');

    const payload = {
        supplier_id: Number(supplierId),
        items: cart.map((c) => ({
            item_id: c.item_id,
            qty: c.qty,
        })),
    };

    apiRequest({
        url: '/purchases',
        method: 'POST',
        data: payload,
    })
        .done(() => {
            showSuccess('Purchase has been successfully created');
            cart = [];
            renderCart();
        })
        .fail((xhr) =>
            showError(xhr.responseJSON?.message || 'Failed to create purchase')
        );
});
