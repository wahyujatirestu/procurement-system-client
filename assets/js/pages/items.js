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

        initNavbar?.();
        setActiveNav?.();
    });
    protectPage();
    $('#navbar').load('assets/partials/navbar.html');

    loadItems();

    $('#add-item-btn').on('click', () => openModal());
    $('#cancel-btn').on('click', closeModal);
    $('#item-form').on('submit', submitItem);
});

function loadItems() {
    apiRequest({ url: '/items', method: 'GET' })
        .done((res) => renderItems(res.data))
        .fail(handleError);
}

function submitItem(e) {
    e.preventDefault();

    const id = $('#item-id').val();
    const payload = {
        name: $('#item-name').val(),
        stock: Number($('#item-stock').val()),
        price: Number($('#item-price').val()),
    };

    apiRequest({
        url: id ? `/items/${id}` : '/items',
        method: id ? 'PUT' : 'POST',
        data: payload,
    })
        .done(() => {
            closeModal();
            loadItems();
            showSuccess('Item saved');
        })
        .fail(handleError);
}

function deleteItem(id) {
    confirmDelete(() => {
        apiRequest({
            url: `/items/${id}`,
            method: 'DELETE',
        })
            .done(() => {
                loadItems();
                showSuccess('Item deleted');
            })
            .fail(handleError);
    });
}

function renderItems(items) {
    const table = $('#items-table').empty();

    if (!items.length) {
        table.append(emptyRow(4, 'No items'));
        return;
    }

    items.forEach((item) => {
        table.append(`
            <tr>
                <td class="px-6 py-4 font-medium">${item.name}</td>
                <td class="px-6 py-4">${item.stock}</td>
                <td class="px-6 py-4">
                    Rp ${item.price.toLocaleString('id-ID')}
                </td>
                <td class="px-6 py-4 flex flex-col sm:flex-row gap-2">
                    <button
                        onclick='editItem(${JSON.stringify(item)})'
                        class="text-blue-600 hover:underline">
                        Edit
                    </button>
                    <button
                        onclick="deleteItem(${item.id})"
                        class="text-red-600 hover:underline">
                        Delete
                    </button>
                </td>
            </tr>
        `);
    });
}

function editItem(item) {
    openModal(item);
}

function openModal(item = null) {
    $('#item-modal').removeClass('hidden').addClass('flex');

    if (item) {
        $('#modal-title').text('Edit Item');
        $('#item-id').val(item.id);
        $('#item-name').val(item.name);
        $('#item-stock').val(item.stock);
        $('#item-price').val(item.price);
    } else {
        $('#modal-title').text('Add Item');
        $('#item-form')[0].reset();
        $('#item-id').val('');
    }
}

function closeModal() {
    $('#item-modal').addClass('hidden').removeClass('flex');
}
