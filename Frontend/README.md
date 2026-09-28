# Folkatech Frontend

Aplikasi web katalog produk kopi Folkatech. Frontend dibuat dengan React, React Router, Vite, dan Tailwind CSS. Aplikasi menggunakan REST API backend untuk autentikasi dan data produk.

## Fitur

- Registrasi dan login pengguna.
- Halaman katalog dengan pencarian, filter, pengurutan, dan paginasi.
- Halaman detail produk dengan galeri, spesifikasi, rating, dan rekomendasi.
- Proteksi halaman produk untuk pengguna yang sudah login.
- Token autentikasi dikirim sebagai Bearer token pada permintaan API.

## Persyaratan

- Node.js dan npm.
- Backend Folkatech berjalan dan dapat diakses dari frontend.

## Menjalankan secara lokal

Dari direktori `Frontend`, pasang dependensi:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`, lalu sesuaikan alamat backend:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Perintah yang tersedia

```bash
npm run dev      # Menjalankan server pengembangan
npm run build    # Membuat build produksi di direktori dist
npm run preview  # Menjalankan preview build produksi
npm run lint     # Memeriksa kode dengan ESLint
```

## Halaman aplikasi

| Rute | Keterangan | Akses |
| --- | --- | --- |
| `/login` | Masuk ke aplikasi | Publik |
| `/register` | Membuat akun | Publik |
| `/products` | Melihat dan mencari katalog produk | Perlu login |
| `/products/:id` | Melihat detail produk | Perlu login |

Rute `/` akan mengarahkan pengguna ke halaman login.

## API yang digunakan

Alamat dasar API ditentukan oleh `VITE_API_BASE_URL`. Frontend mengakses endpoint berikut:

- `POST /login` — login.
- `POST /register` — registrasi.
- `GET /list-product` — daftar produk beserta parameter pencarian, filter, urutan, dan halaman.
- `GET /product-filters` — pilihan filter katalog.
- `GET /product/:id` — detail produk.

Pastikan backend aktif dan konfigurasi CORS backend mengizinkan origin frontend saat pengembangan lokal.
