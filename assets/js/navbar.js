function initNavbar() {
    // ===== FORCE CLOSE SAAT LOAD =====
    $('#purchase-dropdown').addClass('hidden');
    $('#mobile-purchase-dropdown').addClass('hidden');

    // ===== HAMBURGER =====
    $('#hamburger-btn').on('click', function () {
        $('#nav-mobile').toggleClass('hidden');
    });

    // ===== DESKTOP PURCHASE TOGGLE =====
    $('#nav-purchase').on('click', function (e) {
        e.stopPropagation();

        $('#purchase-dropdown').toggleClass('hidden');
    });

    // ===== MOBILE PURCHASE TOGGLE =====
    $('#mobile-purchase-btn').on('click', function () {
        $('#mobile-purchase-dropdown').toggleClass('hidden');
    });

    // ===== AUTO CLOSE SAAT KLIK ITEM DROPDOWN =====
    $(document).on(
        'click',
        '#purchase-dropdown a, #mobile-purchase-dropdown a',
        function () {
            $('#purchase-dropdown').addClass('hidden');
            $('#mobile-purchase-dropdown').addClass('hidden');
            $('#nav-mobile').addClass('hidden');
        }
    );

    // ===== CLOSE SAAT KLIK LUAR =====
    $(document).on('click', function (e) {
        if (
            !$(e.target).closest('#nav-purchase').length &&
            !$(e.target).closest('#purchase-dropdown').length
        ) {
            $('#purchase-dropdown').addClass('hidden');
        }
    });

    // ===== LOGOUT =====
    $(document).on(
        'click',
        '#logout-btn-desktop, #mobile-logout',
        function (e) {
            e.preventDefault();

            Swal.fire({
                title: 'Logout?',
                text: 'Are you sure you want to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Logout',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#dc2626',
                cancelButtonColor: '#6b7280',
            }).then((result) => {
                if (result.isConfirmed) {
                    clearToken();
                    window.location.href = 'login.html';
                }
            });
        }
    );
}
