# Folkatech — Full-Stack Developer Technical Test

Implementasi aplikasi katalog produk kopi yang terdiri dari REST API backend dan aplikasi web frontend. Dokumen ini merangkum pemenuhan spesifikasi teknis untuk membantu proses review.

## Checklist spesifikasi

### Fitur aplikasi dan REST API

- [x] **Register** — `POST /register` membuat akun dengan validasi input dan password yang di-hash.
- [x] **Login** — `POST /login` memvalidasi kredensial dan mengembalikan JWT.
- [x] **Product List** — `GET /list-product` menyediakan katalog dengan pencarian, filter, pengurutan, dan paginasi.
- [x] **Product Detail** — `GET /product/:id` menyediakan detail produk, spesifikasi, dan gambar.
- [x] **Filter produk** — `GET /product-filters` menyediakan nilai filter untuk katalog.
- [x] **Authorization JWT** — seluruh endpoint produk memerlukan header `Authorization: Bearer <token>`.
- [x] **Frontend register dan login** — halaman login dan registrasi tersedia; registrasi dibagi menjadi dua langkah.
- [x] **Frontend katalog dan detail** — halaman `/products` dan `/products/:id` terhubung ke API.
- [x] **Proteksi halaman** — halaman produk hanya dapat diakses setelah autentikasi.

### Spesifikasi teknis

- [x] **Desain mengikuti referensi Figma** — halaman autentikasi, katalog, dan detail produk dibangun berdasarkan [referensi desain Figma](https://www.figma.com/file/7KmSWRMsKoPnc8VGOGhI/Folka-Technical-Test---FEDev?node-id=0%3A1).
- [x] **Database MySQL** — skema database dan indeks dikelola melalui migration SQL.
- [x] **Pengujian API melalui Postman** — collection tersedia di `Backend/postman/Folkatech.postman_collection.json`.
- [x] **Satu repository** — kode backend dan frontend berada di repository yang sama.

### Bonus

- [x] **Mode response JSON:API** — tersedia ketika request menggunakan `Accept: application/vnd.api+json`; format JSON biasa tetap menjadi default.
- [x] **Database tuning** — indeks pada kolom filter/pengurutan dan lookup gambar; query berparameter dengan whitelist sorting; daftar produk menghindari N+1 dan membatasi `limit` maksimal 100.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| Frontend | React, React Router, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MySQL |
| Autentikasi | JWT dan bcrypt |
| Validasi API | express-validator |

## Struktur repository

```text
Backend/
  database/       Migration dan seeder MySQL
  postman/        Postman collection
  src/            Routes, controller, service, middleware, dan validator
  README.md       Panduan setup backend
Frontend/
  src/            Halaman, komponen, context, dan integrasi API
  README.md       Panduan setup frontend
```

## Menjalankan aplikasi lokal

### 1. Siapkan backend

```bash
cd Backend
npm install
```

Buat `Backend/.env` dari `.env.example`, lalu sesuaikan konfigurasi koneksi MySQL dan `JWT_SECRET`. Setelah MySQL berjalan, siapkan skema dan data contoh:

```bash
npm run db:setup
npm run dev
```

Backend berjalan di `http://localhost:3000` secara default.

### 2. Siapkan frontend

Buka terminal lain:

```bash
cd Frontend
npm install
```

Buat `Frontend/.env` dari `.env.example` dan pastikan alamat API sesuai:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Jalankan frontend:

```bash
npm run dev
```

Gunakan alamat lokal yang ditampilkan Vite di terminal.

## Ringkasan endpoint

| Method | Endpoint | Akses | Fungsi |
| --- | --- | --- | --- |
| `GET` | `/health` | Publik | Memeriksa status backend |
| `POST` | `/register` | Publik | Registrasi pengguna |
| `POST` | `/login` | Publik | Login dan mendapatkan JWT |
| `GET` | `/product-filters` | JWT | Mendapatkan pilihan filter |
| `GET` | `/list-product` | JWT | Mendapatkan daftar produk |
| `GET` | `/product/:id` | JWT | Mendapatkan detail produk |

Daftar produk menerima parameter `page`, `limit`, `search`, `sort`, `order`, `origin`, `species`, `roast_level`, `tasted`, `processing`, `min_price`, dan `max_price`. Rincian request, response, serta contoh pemakaian tersedia di `Backend/README.md` dan Postman collection.

## Verifikasi

Frontend telah diverifikasi dengan perintah berikut:

```bash
cd Frontend
npm run build
npm run lint
```

Backend menyediakan Postman collection untuk verifikasi endpoint. Script test otomatis belum dikonfigurasi di `Backend/package.json`.

## Dokumentasi lanjutan

- [Panduan backend](Backend/README.md)
- [Panduan frontend](Frontend/README.md)
- [Postman collection](Backend/postman/Folkatech.postman_collection.json)
