$(document).ready(function () {
    // Load navbar + protection
    $('#navbar').load('partials/navbar.html', function () {
        if (!getAccessToken()) {
            window.location.href = 'index.html';
            return;
        }

        $('#logout-btn').on('click', () => {
            clearToken();
            window.location.href = 'login.html';
        });

        initNavbar();
        setActiveNav?.();
    });

    // Load data
    loadSuppliers();

    // Event
    $('#add-supplier-btn').on('click', () => openModal());
    $('#cancel-btn').on('click', closeModal);
    $('#supplier-form').on('submit', submitSupplier);
});

function loadSuppliers() {
    apiRequest({ url: '/suppliers', method: 'GET' })
        .done((res) => renderSuppliers(res.data))
        .fail((xhr) => showError(xhr.responseJSON?.message));
}

function submitSupplier(e) {
    e.preventDefault();

    const id = $('#supplier-id').val();
    const payload = {
        name: $('#supplier-name').val(),
        email: $('#supplier-email').val(),
        address: $('#supplier-address').val(),
    };

    const isEdit = Boolean(id);

    apiRequest({
        url: isEdit ? `/suppliers/${id}` : '/suppliers',
        method: isEdit ? 'PUT' : 'POST',
        data: payload,
    })
        .done(() => {
            closeModal();
            loadSuppliers();
            showSuccess('Success', 'Supplier saved', 'success');
        })
        .fail((xhr) => showError(xhr.responseJSON?.message));
}

function deleteSupplier(id) {
    Swal.fire({
        title: 'Delete supplier?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
    }).then((result) => {
        if (!result.isConfirmed) return;

        apiRequest({
            url: `/suppliers/${id}`,
            method: 'DELETE',
        })
            .done(() => {
                loadSuppliers();
                showSuccess(
                    'Deleted successfully',
                    'Supplier removed',
                    'success'
                );
            })
            .fail((xhr) => showError(xhr.responseJSON?.message));
    });
}

function renderSuppliers(suppliers) {
    const table = $('#suppliers-table');
    table.empty();

    if (!suppliers.length) {
        table.append(`
            <tr>
                <td colspan="4" class="px-6 py-6 text-center text-gray-500">
                    No suppliers
                </td>
            </tr>
        `);
        return;
    }

    suppliers.forEach((supplier) => {
        table.append(`
            <tr>
                <td class="px-6 py-4 font-medium">${supplier.name}</td>
                <td class="px-6 py-4">${supplier.email}</td>
                <td class="px-6 py-4">${supplier.address}</td>
                <td class="px-6 py-4 flex gap-3">
                    <button onclick='editSupplier(${JSON.stringify(supplier)})' class="text-blue-600 hover:underline">
                        Edit
                    </button>
                    <button onclick="deleteSupplier(${supplier.id})" class="text-red-600 hover:underline">
                        Delete
                    </button>
                </td>
            </tr>
        `);
    });
}

function openModal(supplier = null) {
    $('#supplier-modal').removeClass('hidden').addClass('flex');

    if (supplier) {
        $('#modal-title').text('Edit Supplier');
        $('#supplier-id').val(supplier.id);
        $('#supplier-name').val(supplier.name);
        $('#supplier-email').val(supplier.email);
        $('#supplier-address').val(supplier.address);
    } else {
        $('#modal-title').text('Add Supplier');
        $('#supplier-form')[0].reset();
        $('#supplier-id').val('');
    }
}

function closeModal() {
    $('#supplier-modal').addClass('hidden').removeClass('flex');
}

function editSupplier(supplier) {
    openModal(supplier);
}
