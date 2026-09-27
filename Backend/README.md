# Folkatech Backend

## 1. Description

REST API backend for the Folkatech technical test. This project provides user authentication and a product catalog API for frontend clients.

Available main endpoints include registration, login, product listing, product details, and a health check.

## 2. Features

- User registration with input validation and duplicate email detection.
- Email and password login.
- Password hashing with bcrypt.
- JWT authentication for product endpoints.
- Product listing with pagination.
- Search by product name, brand, or description.
- Filtering by `origin`, `species`, `roast_level`, `tasted`, and `processing`.
- Sorting by `name`, `price`, `rating`, `review_count`, `created_at`, or `id`.
- Product details with specifications and images.
- Public health check at `/health`.
- JSON:API response mode using `application/vnd.api+json`.
- Database indexes for filtering, sorting, and product image lookup.

## 3. Tech Stack

- Node.js
- Express.js
- MySQL
- `mysql2`
- `jsonwebtoken`
- `bcrypt`
- `express-validator`
- `dotenv`
- `cors`
- `nodemon` for development

## 4. Project Structure

```text
Backend/
├── src/
│   ├── app.js                         Express configuration and global middleware
│   ├── server.js                      Entry point and database connection check
│   ├── config/database.js              MySQL connection pool configuration
│   ├── controllers/                   HTTP request and response handlers
│   ├── middleware/                    JWT authentication and error handling
│   ├── routes/                        API route definitions
│   ├── services/                      Authentication and product query logic
│   ├── utils/json-api.js              JSON:API response formatters
│   └── validators/                    Request validation
├── database/
│   ├── migrate.js                     Runs migration files in order
│   ├── seed.js                        Runs seeder files in order
│   ├── migrations/                    Database tables and indexes
│   └── seeders/                       Test users, products, and images
├── postman/
│   └── Folkatech.postman_collection.json
├── .env.example                       Environment configuration template
├── package.json                       Dependencies and npm scripts
└── README.md
```

## 5. Requirements

- Node.js and npm.
- MySQL compatible with the project SQL scripts.
- Git to clone the repository.
- Postman to run the included collection.

The minimum Node.js version is not defined in `package.json`. Existing project documentation uses Node.js 18 or newer.

## 6. Installation

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   ```

2. Enter the backend directory:

   ```bash
   cd Folkatech_Test/Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create the environment file from the template:

   ```bash
   copy .env.example .env
   ```

   Set the values for the local MySQL instance and create your own JWT secret.

5. Create the database, tables, indexes, and test data:

   ```bash
   npm run db:setup
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

The server runs at `http://localhost:3000` by default.

## 7. Environment Configuration

The following variables are defined in `.env.example`:

| Variable         | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `PORT`           | Express server port. Source default: `3000`.     |
| `DB_HOST`        | MySQL host.                                      |
| `DB_PORT`        | MySQL port. Source default: `3306`.              |
| `DB_NAME`        | Database name. Source default: `folkatech_test`. |
| `DB_USER`        | MySQL user.                                      |
| `DB_PASSWORD`    | MySQL password.                                  |
| `JWT_SECRET`     | Secret used to sign and verify JWTs.             |
| `JWT_EXPIRES_IN` | JWT lifetime. Service default: `1d`.             |

Example `.env` using placeholders:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=folkatech_test
DB_USER=root
DB_PASSWORD=your-database-password

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

Do not commit `.env` or put real credentials in this README.

## 8. Database

The project uses MySQL.

### Create the schema and indexes

The migration script creates the database if it does not exist, then runs all SQL files in `database/migrations/` in sorted order:

```bash
npm run migrate
```

The migrations create these tables:

- `users`: user data and password hashes.
- `products`: product data, prices, stock, ratings, specifications, and filter attributes.
- `product_images`: product images with a foreign key to `products`.

Migration `005_optimize_product_sorting.sql` adds indexes for sorting, the `tasted` and `processing` filters, and primary-image lookup.

### Run the seeders

```bash
npm run seed
```

The seeders create one test user, 16 products, and product images. Test-user credentials are intentionally not listed in this README.

### Complete setup

```bash
npm run db:setup
```

This command runs the migrations and then the seeders.

## 9. Running the Project

Development mode uses `nodemon`:

```bash
npm run dev
```

The direct Node.js start command is:

```bash
npm start
```

There is no separate build script in `package.json`.

## 10. API Endpoints

### Endpoint summary

| Method | Endpoint        | Auth | Description                          |
| ------ | --------------- | ---- | ------------------------------------ |
| `POST` | `/register`     | No   | Create a new user                    |
| `POST` | `/login`        | No   | Validate credentials and issue a JWT |
| `GET`  | `/list-product` | Yes  | Retrieve a product list              |
| `GET`  | `/product/:id`  | Yes  | Retrieve one product                 |
| `GET`  | `/health`       | No   | Check server status                  |

### POST `/register`

Request with `Content-Type: application/json`:

```json
{
  "first_name": "First",
  "last_name": "User",
  "email": "user@example.com",
  "phone": "0800000000",
  "password": "password123",
  "password_confirmation": "password123"
}
```

Successful response, status `201`:

```json
{
  "message": "Registration successful",
  "data": {
    "id": 1,
    "first_name": "First",
    "last_name": "User",
    "email": "user@example.com",
    "phone": "0800000000",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

Possible statuses: `201`, `409` when the email is already registered, `422` for validation errors, and `500` for server errors.

### POST `/login`

Request with `Content-Type: application/json`:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Successful response, status `200`:

```json
{
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>"
  }
}
```

Possible statuses: `200`, `401` for invalid credentials, `422` for validation errors, and `500` for server errors.

### GET `/list-product`

Requires this header:

```http
Authorization: Bearer <token>
```

Available query parameters:

| Parameter     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `page`        | Page number, minimum `1`, default `1`.                            |
| `limit`       | Number of items, minimum `1`, maximum `100`, default `12`.        |
| `search`      | Searches `name`, `brand`, and `description`.                      |
| `sort`        | `name`, `price`, `rating`, `review_count`, `created_at`, or `id`. |
| `order`       | `asc` or `desc`, default `asc`.                                   |
| `origin`      | Origin filter.                                                    |
| `species`     | Species filter.                                                   |
| `roast_level` | Roast-level filter.                                               |
| `tasted`      | Taste-profile filter.                                             |
| `processing`  | Processing-method filter.                                         |

Example URL:

```text
GET /list-product?page=1&limit=12&search=coffee&sort=name&order=asc
```

Successful response, status `200`:

```json
{
  "data": [
    {
      "id": 1,
      "name": "HARIO CAFE PRESS SLIM GREY 240ML",
      "brand": "Hario",
      "price": 480000,
      "image": "/images/products/hario-press-1.jpg",
      "rating": 5,
      "review_count": 7
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 16,
    "total_pages": 2
  }
}
```

Possible statuses: `200`, `401` when the JWT is missing or invalid, `422` for invalid query parameters, and `500` for server errors.

### GET `/product/:id`

Requires this header:

```http
Authorization: Bearer <token>
```

Example URL:

```text
GET /product/1
```

Successful response, status `200`:

```json
{
  "data": {
    "id": 1,
    "name": "HARIO CAFE PRESS SLIM GREY 240ML",
    "brand": "Hario",
    "price": 480000,
    "rating": 5,
    "review_count": 7,
    "stock": 15,
    "description": "...",
    "specifications": {
      "dimensions": "11x16,5x8cm",
      "weight": "350gr",
      "capacity": "240ml",
      "color": "Abu-abu / Grey",
      "brand": "Hario"
    },
    "images": [
      {
        "url": "/images/products/hario-press-1.jpg",
        "is_primary": true
      }
    ]
  }
}
```

Possible statuses: `200`, `401` when the JWT is missing or invalid, `404` when the product does not exist, `422` when `id` is not a positive integer, and `500` for server errors.

### GET `/health`

Public endpoint with no request body.

Successful response, status `200`:

```json
{
  "status": "ok",
  "message": "Folkatech backend is running",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

The `timestamp` value is generated when the request is received.

## 11. Authentication

After a successful login, send the JWT to protected product endpoints using:

```http
Authorization: Bearer <token>
```

The JWT is verified using `JWT_SECRET`, and its lifetime is controlled by `JWT_EXPIRES_IN`. Requests without a token, with an invalid header format, or with an invalid/expired token receive status `401`.

## 12. Postman

The collection is available at:

```text
postman/Folkatech.postman_collection.json
```

Usage:

1. Start the backend on the required port.
2. Import the collection into Postman.
3. Set the `base_url` variable to the backend URL.
4. Run the included login request.
5. The collection stores the login token in the `token` variable for subsequent product requests.

The collection includes registration, login, validation, duplicate email, product listing, pagination, search, filtering, sorting, unauthorized access, product detail, and not-found scenarios.

## 13. Error Responses

The default response format is a JSON object:

```json
{
  "message": "Invalid email or password"
}
```

Validation errors use this format:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

When the request uses or requests the JSON:API media type, errors are returned as JSON:API error documents:

```json
{
  "errors": [
    {
      "status": "401",
      "title": "Unauthorized",
      "detail": "Unauthorized"
    }
  ]
}
```

Internal server errors with status `500` do not expose internal error details.

## 14. Security

Implemented security practices include:

- Passwords are hashed with bcrypt before storage.
- Passwords and password hashes are not returned in responses.
- JWT protects the product endpoints.
- Secrets and database configuration are read from environment variables.
- Database queries use parameterized values through `pool.execute`.
- Body, query, and product ID inputs are validated with `express-validator`.
- User email has a unique index in the `users` table.
- CORS is enabled through the `cors` middleware.

## 15. Bonus Features

### JSON:API

The current implementation provides JSON:API response mode when a request includes `Accept: application/vnd.api+json` or `Content-Type: application/vnd.api+json`. The mode includes resource `type`/`id`, `attributes`, product image relationships, `included` resources, and error documents.

Support is not complete. Authentication validators still read registration and login fields directly from the request body rather than from the standard JSON:API `data.attributes` envelope. JSON:API is therefore documented as partial support, not full compliance.

### Database and query optimization

Database tuning has been implemented through:

- A unique email index on `users`.
- Product filter indexes on `name`, `origin`, `species`, `roast_level`, `tasted`, and `processing`.
- Product sorting indexes on `price`, `rating`, `review_count`, and `created_at`.
- A `product_images` index covering `product_id`, `is_primary`, and `id`.
- Parameterized queries and a sorting-column whitelist.
- Primary image lookup in the product-list query to avoid one query per product.

## 16. Implementation Status

- [x] Register
- [x] Login
- [x] JWT authentication
- [x] Product list
- [x] Product detail
- [x] Search
- [x] Filtering
- [x] Sorting
- [x] Pagination
- [x] Validation and error handling
- [x] Database migrations and seeders
- [x] Postman collection
- [x] Database indexing and query tuning
- [ ] Full JSON:API compliance; response mode is available, but the standard request envelope is not supported by the validators

## 17. Notes

- Run `npm run db:setup` against a local database before starting the server if the schema and test data do not exist.
- `npm run migrate` and `npm run seed` are available as separate commands.
- Seeder users and products are local test data, not production data.
- There is no automated test script in `package.json`; endpoint verification is covered by the Postman collection.
- The repository URL cannot be verified from the project files, so the clone command uses the `<REPOSITORY_URL>` placeholder.

# Folkatech Backend

## 1. Deskripsi

Backend REST API untuk technical test Folkatech. Project ini menyediakan autentikasi pengguna dan katalog produk yang dapat digunakan oleh frontend.

Endpoint utama yang tersedia adalah registrasi, login, daftar produk, detail produk, dan health check.

## 2. Fitur

- Registrasi pengguna dengan validasi input dan pengecekan email duplikat.
- Login menggunakan email dan password.
- Password di-hash menggunakan bcrypt.
- JWT authentication untuk endpoint produk.
- Daftar produk dengan pagination.
- Pencarian berdasarkan nama, brand, atau deskripsi.
- Filter berdasarkan `origin`, `species`, `roast_level`, `tasted`, dan `processing`.
- Sorting berdasarkan `name`, `price`, `rating`, `review_count`, `created_at`, atau `id`.
- Detail produk beserta spesifikasi dan gambar.
- Health check pada `/health`.
- Dukungan response JSON:API melalui media type `application/vnd.api+json`.
- Indeks database untuk kolom filter, sorting, dan pengambilan gambar produk.

## 3. Tech Stack

- Node.js
- Express.js
- MySQL
- `mysql2`
- `jsonwebtoken`
- `bcrypt`
- `express-validator`
- `dotenv`
- `cors`
- `nodemon` untuk development

## 4. Struktur Project

```text
Backend/
├── src/
│   ├── app.js                         Konfigurasi Express dan middleware global
│   ├── server.js                      Entry point dan pemeriksaan koneksi database
│   ├── config/database.js              Konfigurasi connection pool MySQL
│   ├── controllers/                   Handler request dan response HTTP
│   ├── middleware/                    JWT authentication dan error handler
│   ├── routes/                        Definisi route API
│   ├── services/                      Logika autentikasi dan query produk
│   ├── utils/json-api.js              Formatter response JSON:API
│   └── validators/                    Validasi request
├── database/
│   ├── migrate.js                     Menjalankan file migration berurutan
│   ├── seed.js                        Menjalankan file seeder berurutan
│   ├── migrations/                    Schema tabel dan indeks database
│   └── seeders/                       Data uji pengguna, produk, dan gambar
├── postman/
│   └── Folkatech.postman_collection.json
├── .env.example                       Template konfigurasi environment
├── package.json                       Dependency dan npm script
├── AI_CONTEXT.md                      Context pengembangan backend
└── README.md
```

## 5. Persyaratan

- Node.js dan npm.
- MySQL yang kompatibel dengan script SQL project.
- Git untuk mengambil repository.
- Postman, jika ingin menjalankan collection yang disediakan.

Versi minimum Node.js tidak didefinisikan pada `package.json`. Dokumentasi project menggunakan Node.js 18 atau lebih baru.

## 6. Instalasi

1. Clone repository:

   ```bash
   git clone <URL_REPOSITORY>
   ```

2. Masuk ke folder backend:

   ```bash
   cd Folkatech_Test/Backend
   ```

3. Install dependency:

   ```bash
   npm install
   ```

4. Buat file environment dari template:

   ```bash
   copy .env.example .env
   ```

   Isi nilai environment sesuai MySQL lokal dan buat JWT secret sendiri.

5. Buat database, tabel, indeks, dan data uji:

   ```bash
   npm run db:setup
   ```

6. Jalankan server development:

   ```bash
   npm run dev
   ```

Server berjalan pada `http://localhost:3000` secara default.

## 7. Konfigurasi Environment

Variable yang digunakan berdasarkan `.env.example`:

| Variable         | Fungsi                                              |
| ---------------- | --------------------------------------------------- |
| `PORT`           | Port server Express. Default di source: `3000`.     |
| `DB_HOST`        | Host MySQL.                                         |
| `DB_PORT`        | Port MySQL. Default di source: `3306`.              |
| `DB_NAME`        | Nama database. Default di source: `folkatech_test`. |
| `DB_USER`        | User MySQL.                                         |
| `DB_PASSWORD`    | Password MySQL.                                     |
| `JWT_SECRET`     | Secret untuk signing dan verifikasi JWT.            |
| `JWT_EXPIRES_IN` | Masa berlaku JWT. Default di service: `1d`.         |

Contoh `.env` menggunakan placeholder:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=folkatech_test
DB_USER=root
DB_PASSWORD=your-database-password

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

Jangan commit file `.env` atau mengisi README dengan credential asli.

## 8. Database

Database yang digunakan adalah MySQL.

### Membuat schema dan indeks

Script migration membuat database jika belum ada, lalu menjalankan semua file SQL dalam `database/migrations/` secara berurutan:

```bash
npm run migrate
```

Migration membuat tabel:

- `users`: data pengguna dan password hash.
- `products`: data produk, harga, stok, rating, spesifikasi, dan atribut filter.
- `product_images`: gambar produk dengan foreign key ke `products`.

Migration `005_optimize_product_sorting.sql` menambahkan indeks untuk sorting, filter `tasted` dan `processing`, serta pengambilan image berdasarkan produk dan status primary.

### Menjalankan seeder

```bash
npm run seed
```

Seeder menyediakan satu pengguna uji, 16 produk, dan gambar produk. Nilai credential pengguna uji tidak dicantumkan di README.

### Setup lengkap

```bash
npm run db:setup
```

Command tersebut menjalankan migration lalu seeder.

## 9. Menjalankan Project

Mode development menggunakan `nodemon`:

```bash
npm run dev
```

Mode start menggunakan Node.js langsung:

```bash
npm start
```

Tidak ada script build terpisah pada `package.json`.

## 10. API Endpoint

### Ringkasan endpoint

| Method | Endpoint        | Auth  | Deskripsi                                 |
| ------ | --------------- | ----- | ----------------------------------------- |
| `POST` | `/register`     | Tidak | Membuat pengguna baru                     |
| `POST` | `/login`        | Tidak | Memeriksa credential dan mengeluarkan JWT |
| `GET`  | `/list-product` | Ya    | Mengambil daftar produk                   |
| `GET`  | `/product/:id`  | Ya    | Mengambil detail satu produk              |
| `GET`  | `/health`       | Tidak | Memeriksa status server                   |

### POST `/register`

Request menggunakan `Content-Type: application/json`:

```json
{
  "first_name": "Nama",
  "last_name": "Pengguna",
  "email": "user@example.com",
  "phone": "0800000000",
  "password": "password123",
  "password_confirmation": "password123"
}
```

Response berhasil, status `201`:

```json
{
  "message": "Registration successful",
  "data": {
    "id": 1,
    "first_name": "Nama",
    "last_name": "Pengguna",
    "email": "user@example.com",
    "phone": "0800000000",
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

Kemungkinan status: `201`, `409` jika email sudah terdaftar, `422` jika validasi gagal, dan `500` jika terjadi kesalahan server.

### POST `/login`

Request menggunakan `Content-Type: application/json`:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response berhasil, status `200`:

```json
{
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>"
  }
}
```

Kemungkinan status: `200`, `401` untuk credential tidak valid, `422` jika validasi gagal, dan `500` jika terjadi kesalahan server.

### GET `/list-product`

Memerlukan header:

```http
Authorization: Bearer <token>
```

Query parameter yang tersedia:

| Parameter     | Keterangan                                                          |
| ------------- | ------------------------------------------------------------------- |
| `page`        | Nomor halaman, minimum `1`, default `1`.                            |
| `limit`       | Jumlah item, minimum `1`, maksimum `100`, default `12`.             |
| `search`      | Mencari pada `name`, `brand`, dan `description`.                    |
| `sort`        | `name`, `price`, `rating`, `review_count`, `created_at`, atau `id`. |
| `order`       | `asc` atau `desc`, default `asc`.                                   |
| `origin`      | Filter origin.                                                      |
| `species`     | Filter species.                                                     |
| `roast_level` | Filter tingkat roast.                                               |
| `tasted`      | Filter profil rasa.                                                 |
| `processing`  | Filter metode processing.                                           |

Contoh URL:

```text
GET /list-product?page=1&limit=12&search=coffee&sort=name&order=asc
```

Response berhasil, status `200`:

```json
{
  "data": [
    {
      "id": 1,
      "name": "HARIO CAFE PRESS SLIM GREY 240ML",
      "brand": "Hario",
      "price": 480000,
      "image": "/images/products/hario-press-1.jpg",
      "rating": 5,
      "review_count": 7
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 16,
    "total_pages": 2
  }
}
```

Kemungkinan status: `200`, `401` jika JWT tidak ada atau tidak valid, `422` jika parameter query tidak valid, dan `500` jika terjadi kesalahan server.

### GET `/product/:id`

Memerlukan header:

```http
Authorization: Bearer <token>
```

Contoh URL:

```text
GET /product/1
```

Response berhasil, status `200`:

```json
{
  "data": {
    "id": 1,
    "name": "HARIO CAFE PRESS SLIM GREY 240ML",
    "brand": "Hario",
    "price": 480000,
    "rating": 5,
    "review_count": 7,
    "stock": 15,
    "description": "...",
    "specifications": {
      "dimensions": "11x16,5x8cm",
      "weight": "350gr",
      "capacity": "240ml",
      "color": "Abu-abu / Grey",
      "brand": "Hario"
    },
    "images": [
      {
        "url": "/images/products/hario-press-1.jpg",
        "is_primary": true
      }
    ]
  }
}
```

Kemungkinan status: `200`, `401` jika JWT tidak ada atau tidak valid, `404` jika produk tidak ditemukan, `422` jika `id` bukan bilangan positif, dan `500` jika terjadi kesalahan server.

### GET `/health`

Endpoint publik tanpa body request.

Response berhasil, status `200`:

```json
{
  "status": "ok",
  "message": "Folkatech backend is running",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

Nilai `timestamp` dibuat saat request diterima.

## 11. Authentication

Setelah login berhasil, gunakan token JWT pada endpoint produk dengan format:

```http
Authorization: Bearer <token>
```

JWT diverifikasi menggunakan `JWT_SECRET` dan masa berlaku menggunakan `JWT_EXPIRES_IN`. Request tanpa token, dengan format header yang salah, atau dengan token invalid/expired akan menerima status `401`.

## 12. Postman

Collection tersedia di:

```text
postman/Folkatech.postman_collection.json
```

Cara menjalankan:

1. Jalankan backend pada port yang sesuai.
2. Import file collection ke Postman.
3. Pastikan variable `base_url` menunjuk ke URL backend.
4. Jalankan request login yang tersedia.
5. Collection menyimpan token hasil login ke variable `token` untuk request produk berikutnya.

Collection mencakup skenario register, login, validasi, duplicate email, daftar produk, pagination, search, filter, sorting, unauthorized, detail produk, dan produk tidak ditemukan.

## 13. Error Response

Response default menggunakan object JSON dengan format berikut:

```json
{
  "message": "Invalid email or password"
}
```

Validation error menggunakan format:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email must be valid"
    }
  ]
}
```

Jika request menggunakan atau meminta media type JSON:API, error dikirim sebagai JSON:API error document, misalnya:

```json
{
  "errors": [
    {
      "status": "401",
      "title": "Unauthorized",
      "detail": "Unauthorized"
    }
  ]
}
```

Kesalahan server dengan status `500` tidak mengembalikan detail internal.

## 14. Keamanan

Implementasi yang tersedia:

- Password di-hash dengan bcrypt sebelum disimpan.
- Password dan password hash tidak dikembalikan pada response.
- JWT digunakan untuk melindungi endpoint produk.
- Secret dan konfigurasi database dibaca dari environment variable.
- Query database menggunakan parameterized query melalui `pool.execute`.
- Input body, query, dan parameter product ID divalidasi dengan `express-validator`.
- Email memiliki unique index pada tabel `users`.
- CORS diaktifkan melalui middleware `cors`.

## 15. Bonus

### JSON:API

Implementasi saat ini menyediakan mode response JSON:API ketika request memiliki `Accept: application/vnd.api+json` atau `Content-Type: application/vnd.api+json`. Mode ini mencakup resource `type`/`id`, `attributes`, relationship gambar produk, `included`, dan error document.

Dukungan ini belum penuh. Validator autentikasi masih membaca field register/login pada level body langsung, bukan envelope JSON:API standar `data.attributes`. Karena itu, JSON:API dicatat sebagai dukungan parsial, bukan compliance penuh.

### Database dan query optimization

Bonus tuning sudah diimplementasikan melalui:

- Indeks email unik pada `users`.
- Indeks filter produk pada `name`, `origin`, `species`, `roast_level`, `tasted`, dan `processing`.
- Indeks sorting pada `price`, `rating`, `review_count`, dan `created_at`.
- Indeks `product_images` untuk `product_id`, `is_primary`, dan `id`.
- Parameterized query dan whitelist kolom sorting.
- Pengambilan gambar utama dalam query daftar produk untuk menghindari query per produk.

## 16. Status Implementasi

- [x] Register
- [x] Login
- [x] JWT Authentication
- [x] List Product
- [x] Product Detail
- [x] Search
- [x] Filter
- [x] Sorting
- [x] Pagination
- [x] Validation dan error handling
- [x] Database migration dan seeder
- [x] Postman collection
- [x] Database indexing/query tuning
- [x] JSON:API compliance penuh; mode response tersedia

## 17. Catatan

- Jalankan `npm run db:setup` pada database lokal sebelum menjalankan server jika schema dan data uji belum tersedia.
- `npm run migrate` dan `npm run seed` tersedia untuk dijalankan secara terpisah.
- Produk dan pengguna dari seeder adalah data uji lokal, bukan data produksi.
- Tidak ada script test otomatis pada `package.json`; verifikasi endpoint dilakukan melalui collection Postman.
- URL repository asli tidak dapat diverifikasi dari file project, sehingga command clone menggunakan placeholder `<URL_REPOSITORY>`.

# Folkatech Backend

REST API for the Folkatech technical test. The backend uses Node.js, Express, MySQL, JWT, bcrypt, and express-validator.

## Requirements

- Node.js 18 or newer
- MySQL 8 or compatible
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   copy .env.example .env
   ```

   Set the MySQL credentials and a local JWT secret in `.env`.

3. Create the database tables and seed test data:

   ```bash
   npm run db:setup
   ```

4. Start the API:

   ```bash
   npm run dev
   ```

   The default server URL is `http://localhost:3000`.

## Test credentials

The seed user is:

- Email: `test@folkatech.com`
- Password: `password123`

Do not use these credentials outside local testing.

## API endpoints

All product endpoints require `Authorization: Bearer <token>` from a successful login.

| Method | Path            | Auth | Description                    |
| ------ | --------------- | ---- | ------------------------------ |
| POST   | `/register`     | No   | Register a user                |
| POST   | `/login`        | No   | Authenticate and receive a JWT |
| GET    | `/list-product` | Yes  | List products                  |
| GET    | `/product/:id`  | Yes  | Get product detail             |
| GET    | `/health`       | No   | Check API availability         |

### Product list query parameters

`page`, `limit`, `search`, `sort`, `order`, `origin`, `species`, `roast_level`, `tasted`, and `processing` are supported. The default page size is 12 and the maximum is 100.

Example:

```text
GET /list-product?page=1&limit=12&search=coffee&sort=name&order=asc
```

## Database commands

```bash
npm run migrate
npm run seed
npm run db:setup
```

Migrations are in `database/migrations/`. Seed data is in `database/seeders/` and includes 16 products with product images.

## Postman

Import `postman/Folkatech.postman_collection.json` into Postman. Set the collection variable `base_url` if the server is not running on port 3000. Run `Login - Success` first; its test script stores the returned JWT in the collection variable `token`.

The collection includes successful and failure cases for authentication, validation, duplicate registration, product listing, filters, sorting, pagination, authorization, product detail, and not-found handling.

## JSON:API bonus mode

The existing response format remains the default. To request JSON:API documents, send:

```http
Accept: application/vnd.api+json
```

For JSON:API request bodies, use:

```http
Content-Type: application/vnd.api+json
```

Register and login request attributes use the standard JSON:API envelope:

```json
{
  "data": {
    "type": "users",
    "attributes": {
      "email": "test@folkatech.com",
      "password": "password123"
    }
  }
}
```

JSON:API responses use resource objects, `type`/`id`, `attributes`, relationships for product images, `included` image resources, and JSON:API error documents. This mode is supported for the required authentication and product endpoints without changing their existing paths or default responses.

## Database tuning bonus

Product sorting fields have dedicated indexes for `price`, `rating`, `review_count`, and `created_at`, while filter fields include `origin`, `species`, `roast_level`, `tasted`, and `processing`. Product image lookup uses a composite index on `product_id`, `is_primary`, and `id` to support primary-image ordering. The migrations are repeatable and preserve parameterized filtering queries.

## Security notes

- Passwords are hashed with bcrypt and are never returned.
- JWT secrets and database credentials are read from environment variables.
- SQL queries use parameterized values.
- `.env` is ignored by Git; commit `.env.example` instead.
