# Simple Procurement System – Frontend

## Overview

**Simple Procurement System – Frontend** adalah aplikasi frontend berbasis **HTML + jQuery + AJAX** yang dibangun untuk berkomunikasi dengan Backend REST API Procurement System.

Frontend ini dibuat **tanpa framework SPA (React/Vue)** dan berfokus pada:

- Pemahaman fundamental frontend (HTML, CSS, JS)
- Clean separation antar file JavaScript
- Reusable AJAX handler
- UI responsif & rapi
- Integrasi REST API + JWT Authentication

---

## Application Flow (High Level)

Urutan penggunaan aplikasi oleh user adalah sebagai berikut:

1. **Landing Page (`index.html`)**
    - Halaman awal aplikasi
    - Menyediakan pilihan **Login** dan **Register**

2. **Register (`register.html`)**
    - User melakukan pendaftaran akun
    - Setelah register berhasil, user diarahkan ke halaman login

3. **Login (`login.html`)**
    - User login menggunakan akun terdaftar
    - Backend mengembalikan **JWT Access Token**

4. **Dashboard (`dashboard.html`)**
    - Ditampilkan setelah login berhasil
    - Menjadi entry point ke seluruh fitur aplikasi

5. **Master Data Management**
    - CRUD **Items**
    - CRUD **Suppliers**

6. **Purchasing Flow**
    - Pilih supplier
    - Tambahkan item & quantity
    - Submit purchasing
    - Lihat daftar purchasing & detail purchasing

---

## Features

- Landing Page (Login & Register)
- Authentication (Register, Login & Logout)
- Dashboard Overview
- Item Management (CRUD)
- Supplier Management (CRUD)
- Purchasing Transaction
- Purchasing List & Detail View
- SweetAlert2 untuk feedback user
- Navbar dynamic (active state & dropdown)
- JWT Token handling (localStorage)

---

## Tech Stack

- **HTML5**
- **Tailwind CSS** – Utility-first styling
- **jQuery** – DOM manipulation & AJAX
- **AJAX (REST API)**
- **SweetAlert2** – Alert & confirmation dialog
- **Font Awesome** – Icons

---

## Project Structure

```
client/
│
├── assets/
│   ├── js/
│   │   ├── config.js            # Base API URL & global config
│   │   ├── api.js               # Reusable AJAX wrapper
│   │   ├── utils.js             # Helper (token, alert, formatter)
│   │   ├── auth.js              # Authentication & auth guard logic
│   │   ├── navbar.js            # Navbar logic (dropdown, active state)
│   │   └── pages/
│   │       ├── dashboard.js
│   │       ├── items.js
│   │       ├── suppliers.js
│   │       ├── purchase.js
│   │       ├── purchase-list.js
│   │       └── purchase-view.js
│   │
│   ├── css/
│   │   └── style.css            # Custom styling
│   │
│   └── partials/
│       └── navbar.html          # Reusable navbar partial
│
├── index.html                   # Landing page (Login / Register)
├── login.html
├── register.html
├── dashboard.html
├── items.html
├── suppliers.html
├── purchase.html
├── purchase-list.html
├── purchase-view.html
├── README.md
└──
```

---

## Authentication Flow

1. User membuka **index.html**
2. User memilih **Register** → `register.html`
3. Setelah register berhasil, user melakukan **Login** → `login.html`
4. Backend mengembalikan **JWT Access Token**
5. Token disimpan di `localStorage`
6. User diarahkan ke **dashboard.html**
7. Setiap request AJAX otomatis menyertakan header:

```http
Authorization: Bearer <token>
```

8. Jika token invalid atau expired:
    - User otomatis diarahkan kembali ke halaman login

Logic autentikasi dan proteksi halaman di-handle di:

```
assets/js/auth.js
assets/js/api.js
```

---

## AJAX Architecture

Semua request API **tidak dipanggil langsung dari page**, melainkan melalui wrapper:

```
assets/js/api.js
```

Keuntungan:

- Konsistensi request
- Centralized error handling
- Mudah dikembangkan dan di-maintain

Flow request:

```
Page JS → api.js → Backend API → Response → SweetAlert2
```

---

## CRUD Flow (Items & Suppliers)

1. User mengakses menu **Items** atau **Suppliers** dari Navbar
2. Data di-load menggunakan AJAX (GET)
3. User dapat:
    - Create data baru
    - Update data existing
    - Delete data (dengan confirmation dialog)

4. Setelah aksi berhasil:
    - Data otomatis di-refresh
    - Feedback ditampilkan menggunakan SweetAlert2

Validasi utama tetap dilakukan di backend.

---

## Purchasing Flow (Frontend)

1. User memilih **Supplier**
2. User menambahkan **Item + Quantity** ke cart
3. Frontend menghitung:
    - Subtotal per item
    - Grand total

4. Payload purchasing dikirim ke backend via AJAX
5. Backend memproses transaksi
6. Frontend menampilkan status sukses

> Frontend hanya mengirim payload — validasi bisnis utama berada di backend.

---

## Purchasing View

Halaman `purchase-view.html` digunakan untuk:

- Menampilkan detail purchasing
- Informasi supplier
- List item, qty, price, subtotal
- Grand total

Data diambil menggunakan endpoint:

```
GET /purchasings/:id
```

---

## Navbar System

- Navbar di-load sebagai **HTML partial**
- Digunakan di seluruh halaman setelah login
- Active menu otomatis berdasarkan URL

File terkait:

```
assets/partials/navbar.html
assets/js/navbar.js
```

---

## User Feedback

Semua feedback user menggunakan **SweetAlert2**:

- Success alert
- Error alert
- Confirmation dialog (delete / submit)

Tujuan:

- UX lebih jelas
- Tidak menggunakan alert bawaan browser

---

## Configuration

### Base API URL

Sesuaikan backend URL di:

```
assets/js/config.js
```

Contoh:

```js
const BASE_URL = 'http://localhost:8888/api/v1';
```

---

## Running Frontend

Frontend **tidak memerlukan build step**.

Langkah menjalankan:

1. Jalankan backend REST API
2. Jalankan static server atau Live Server
3. Buka `index.html` sebagai halaman awal

Direkomendasikan:

- VSCode Live Server
- Local static server

---

## Author

**Restu Adi Wahyujati**
Junior Backend / Fullstack Developer (Golang)
