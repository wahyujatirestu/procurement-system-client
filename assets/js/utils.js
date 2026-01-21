/* ================= ALERT ================= */

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: '#fff',
    customClass: {
        popup: 'shadow-lg rounded-xl',
    },
});

function showSuccess(message) {
    Toast.fire({
        icon: 'success',
        title: message,
    });
}

function showError(message) {
    Toast.fire({
        icon: 'error',
        title: message,
    });
}

function confirmDelete(onConfirm) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
    }).then((result) => {
        if (result.isConfirmed && typeof onConfirm === 'function') {
            onConfirm();
        }
    });
}

/* ================= AUTH ================= */

function protectPage() {
    if (!getAccessToken()) {
        window.location.href = 'login.html';
    }
}

/* ================= ERROR HANDLER ================= */

function handleError(xhr) {
    const message =
        xhr.responseJSON?.message || xhr.responseText || 'Something went wrong';
    showError(message);
}

/* ================= TABLE HELPER ================= */

function emptyRow(colspan, text = 'No data') {
    return `
        <tr>
            <td colspan="${colspan}" class="px-6 py-6 text-center text-gray-500">
                ${text}
            </td>
        </tr>
    `;
}

/* ================= PASSWORD TOGGLE ================= */

function initPasswordToggle() {
    $(document).on('click', '.toggle-password', function () {
        const targetSelector = $(this).data('target');
        const input = $(targetSelector);
        const icon = $(this).find('i');

        if (!input.length) return;

        const isPassword = input.attr('type') === 'password';
        input.attr('type', isPassword ? 'text' : 'password');

        icon.toggleClass('fa-eye fa-eye-slash');
    });
}

/* ================= ACTIVE NAV ================= */
function setActiveNav() {
    const path = window.location.pathname.split('/').pop();

    $('#nav-dashboard, #nav-items, #nav-suppliers, #nav-purchase').removeClass(
        'text-blue-600 font-semibold'
    );

    if (path === '' || path === 'dashboard.html') {
        $('#nav-dashboard').addClass('text-blue-600 font-semibold');
    } else if (path === 'items.html') {
        $('#nav-items').addClass('text-blue-600 font-semibold');
    } else if (path === 'suppliers.html') {
        $('#nav-suppliers').addClass('text-blue-600 font-semibold');
    } else if (path === 'purchase.html' || path === 'purchase-list.html') {
        // HANYA highlight
        $('#nav-purchase').addClass('text-blue-600 font-semibold');
    }
}
