# Folkatech Backend

REST API untuk autentikasi pengguna dan katalog produk Folkatech. Backend menggunakan Node.js, Express, dan MySQL.

## Teknologi

- Node.js dan Express 5
- MySQL dengan `mysql2`
- JWT untuk autentikasi
- bcrypt untuk hashing password
- express-validator untuk validasi input

## Persyaratan

- Node.js dan npm
- MySQL yang dapat diakses oleh aplikasi

## Instalasi dan menjalankan

Dari direktori `Backend`, pasang dependensi:

```bash
npm install
```

Buat file `.env` dengan menyalin `.env.example`:

```powershell
Copy-Item .env.example .env
```

Atur koneksi MySQL dan `JWT_SECRET` pada `.env`. Contoh konfigurasi:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=folkatech_test
DB_USER=root
DB_PASSWORD=
JWT_SECRET=ganti-dengan-secret-lokal-yang-kuat
JWT_EXPIRES_IN=1d
```

Siapkan database, tabel, indeks, dan data contoh:

```bash
npm run db:setup
```

Jalankan server mode pengembangan:

```bash
npm run dev
```

API berjalan di `http://localhost:3000` secara default. Untuk menjalankan tanpa nodemon, gunakan `npm start`.

## Perintah npm

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan server dengan nodemon |
| `npm start` | Menjalankan server dengan Node.js |
| `npm run migrate` | Menjalankan file migrasi SQL secara berurutan |
| `npm run seed` | Memasukkan data contoh |
| `npm run db:setup` | Menjalankan migrasi, lalu seeder |

## Variabel lingkungan

| Variabel | Keterangan | Nilai default |
| --- | --- | --- |
| `PORT` | Port server | `3000` |
| `DB_HOST` | Host MySQL | `localhost` |
| `DB_PORT` | Port MySQL | `3306` |
| `DB_NAME` | Nama database | `folkatech_test` |
| `DB_USER` | Pengguna MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | kosong |
| `JWT_SECRET` | Secret untuk menandatangani token | Atur di `.env` |
| `JWT_EXPIRES_IN` | Masa berlaku token | `1d` |

Jangan commit file `.env` atau menyimpan kredensial produksi di repository.

## Endpoint API

Semua endpoint tersedia di root API (tanpa prefix `/api`).

| Method | Path | Autentikasi | Keterangan |
| --- | --- | --- | --- |
| `GET` | `/health` | Tidak | Memeriksa status server |
| `POST` | `/register` | Tidak | Membuat akun pengguna |
| `POST` | `/login` | Tidak | Login dan mendapatkan JWT |
| `GET` | `/product-filters` | Bearer token | Mendapatkan pilihan filter produk |
| `GET` | `/list-product` | Bearer token | Mendapatkan daftar produk |
| `GET` | `/product/:id` | Bearer token | Mendapatkan detail produk |

### Registrasi

`POST /register` menerima JSON berikut. Password minimal 8 karakter dan konfirmasi harus sama.

```json
{
  "first_name": "Nama",
  "last_name": "Pengguna",
  "email": "pengguna@example.com",
  "phone": "081234567890",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Login

`POST /login` menerima email dan password:

```json
{
  "email": "pengguna@example.com",
  "password": "password123"
}
```

Gunakan token dari response login untuk endpoint produk:

```http
Authorization: Bearer <token>
```

### Daftar produk

Contoh permintaan:

```text
GET /list-product?page=1&limit=12&search=arabica&sort=price&order=asc
```

Parameter yang didukung:

| Parameter | Keterangan |
| --- | --- |
| `page` | Nomor halaman, minimal `1` |
| `limit` | Jumlah produk per halaman, `1` sampai `100` (default `12`) |
| `search` | Pencarian nama, brand, atau deskripsi |
| `sort` | Kolom: `name`, `price`, `rating`, `review_count`, `created_at`, `id` |
| `order` | Urutan `asc` atau `desc` |
| `origin` | Filter asal produk |
| `species` | Filter varietas |
| `roast_level` | Filter tingkat sangrai |
| `tasted` | Filter cita rasa |
| `processing` | Filter proses |
| `min_price` | Harga minimum, angka non-negatif |
| `max_price` | Harga maksimum, angka non-negatif dan tidak kurang dari `min_price` |

### Contoh cURL

```bash
curl http://localhost:3000/health
```

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:3000/list-product?page=1&limit=12"
```

## Database

Migrasi ada di `database/migrations/` dan seeder ada di `database/seeders/`. `npm run db:setup` menjalankan keduanya. Seeder menyediakan data uji lokal berupa pengguna dan produk.

Collection Postman tersedia di `postman/Folkatech.postman_collection.json`.

## Struktur direktori

```text
src/
  app.js                 Konfigurasi Express dan middleware
  server.js              Entry point server
  config/                Koneksi database
  controllers/           Handler HTTP
  middleware/            Autentikasi dan penanganan error
  routes/                Definisi endpoint
  services/              Logika autentikasi dan produk
  utils/                 Utilitas response JSON:API
  validators/            Validasi request
database/
  migrations/            Skema dan indeks database
  seeders/               Data contoh
postman/                 Koleksi Postman
```

## Format JSON:API

Endpoint dapat mengembalikan format JSON:API saat request menggunakan header `Accept: application/vnd.api+json`. Body request JSON:API menggunakan `Content-Type: application/vnd.api+json`. Format response default tetap JSON biasa.
