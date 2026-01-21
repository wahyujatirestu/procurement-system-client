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

    $('#today-date').text(
        new Date().toLocaleDateString('en-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    );

    loadStats();
    loadRecentPurchases();
});

function loadStats() {
    apiRequest({ url: '/items' }).done((res) => {
        $('#total-items').text(res.data.length);
        $('#low-stock').text(res.data.filter((i) => i.stock <= 2).length);
    });

    apiRequest({ url: '/suppliers' }).done((res) => {
        $('#total-suppliers').text(res.data.length);
    });
}

function loadRecentPurchases() {
    apiRequest({ url: '/purchases' }).done((res) => {
        const data = res.data.slice(0, 5);
        const container = $('#recent-purchases').empty();

        if (!data.length) {
            container.append(`
            <div class="py-6 text-center text-gray-400 text-sm">
              No purchase activity yet
            </div>
          `);
            return;
        }

        data.forEach((p) => {
            container.append(`
            <div class="py-4 flex justify-between items-center">
              <div>
                <div class="font-medium">Purchase #${p.id}</div>
                <div class="text-xs text-gray-500">
                  ${new Date(p.date).toLocaleString()} • ${p.supplier.name}
                </div>
              </div>
              <div class="font-semibold text-gray-900">
                Rp ${p.grand_total.toLocaleString('id-ID')}
              </div>
            </div>
          `);
        });
    });
}
