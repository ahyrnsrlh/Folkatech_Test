Siap. Karena file ini akan dipakai sebagai **context/instruction untuk AI agent yang mengerjakan backend**, sebaiknya isinya bukan PRD panjang, tetapi **Backend Development Context / Specification** yang tegas: requirement, scope, architecture, database, API contract, rules, dan hal-hal yang **jangan diubah oleh agent tanpa alasan**.

Berikut versi final yang bisa kamu simpan sebagai:

`backend/AI_CONTEXT.md`

````md
# Folkatech Technical Test — Backend AI Context

> This document is the single source of context and implementation guidance for AI agents working on the backend of the Folkatech Fullstack Developer Technical Test.
>
> Read this document before creating, modifying, or refactoring backend code.

---

# 1. Project Overview

This project is a Fullstack Web Application technical test for Folkatech.

The application is a product catalog / e-commerce-style web application based on the provided Folkatech Figma design.

The backend is responsible for:

- User registration
- User authentication
- JWT authorization
- Product listing
- Product detail
- Product filtering/search/sorting/pagination
- Database management
- API validation
- API error handling

The frontend will consume the backend REST API.

---

# 2. Official Technical Test Requirements

The official technical test requires a REST API for:

- Register
- Login
- List Product
- Detail Product

Required endpoints:

```text
POST /register
POST /login
GET  /list-product
GET  /product/:id
````

JWT must be used for authorization.

Database must use either:

* MySQL
* PostgreSQL

This project uses:

**MySQL**

The API must be tested using Postman and the Postman collection must be included in the deliverables.

All source code must be stored in one Git repository.

Bonus requirements:

* API compliance with JSON:API
* Database tuning

The technical test deadline is 2 × 24 hours after receiving the test.

---

# 3. Backend Technology Stack

Use the following stack unless there is a strong technical reason to change it:

```text
Runtime:
Node.js

Framework:
Express.js

Database:
MySQL

Database Driver:
mysql2

Authentication:
JWT (jsonwebtoken)

Password Hashing:
bcrypt

Environment Variables:
dotenv

CORS:
cors

Validation:
express-validator

Development:
nodemon
```

Do NOT introduce unnecessary frameworks or libraries.

Prefer simple, maintainable, and understandable solutions.

---

# 4. Backend Architecture

Use a layered architecture.

Recommended structure:

```text
backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── product.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── product.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   └── product.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── product.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── postman/
│   └── Folkatech.postman_collection.json
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── AI_CONTEXT.md
```

---

# 5. Architecture Rules

Follow these rules:

1. Routes define endpoints only.
2. Controllers handle HTTP request/response.
3. Services contain business logic.
4. Database queries should not be placed directly inside routes.
5. Authentication logic belongs in the auth service.
6. JWT verification belongs in middleware.
7. Validation should happen before business logic.
8. Passwords must NEVER be stored as plain text.
9. Passwords must NEVER be returned in API responses.
10. Secrets must NEVER be hardcoded.
11. Use environment variables for sensitive configuration.
12. Keep the implementation simple enough to be completed within the technical-test deadline.

Avoid unnecessary patterns such as:

* excessive abstraction
* unnecessary repositories
* unnecessary factories
* excessive interfaces
* complex dependency injection
* microservices
* unnecessary design patterns

This is a small technical-test project, not a production-scale distributed system.

---

# 6. API Base

The official technical test specifies these endpoint paths:

```text
POST /register
POST /login
GET  /list-product
GET  /product/:id
```

Follow these paths directly.

Do not arbitrarily change them to:

```text
/api/auth/register
/api/auth/login
/api/products
```

unless explicitly required later.

---

# 7. Authentication

Authentication uses JWT.

Authentication flow:

```text
Client
  |
  | POST /login
  v
Backend
  |
  | Validate credentials
  v
User lookup
  |
  | Compare password
  v
Generate JWT
  |
  v
Return token
```

Protected request:

```text
Client
  |
  | Authorization: Bearer <JWT>
  v
JWT Middleware
  |
  | Verify token
  v
Controller
  |
  v
Service
  |
  v
Database
```

---

# 8. JWT Rules

JWT must be generated after successful login.

Use:

```http
Authorization: Bearer <token>
```

JWT secret must come from:

```env
JWT_SECRET=
```

JWT expiration should be configurable through environment variables:

```env
JWT_EXPIRES_IN=
```

Example:

```env
JWT_SECRET=change-this-secret
JWT_EXPIRES_IN=1d
```

Do not hardcode:

```js
jwt.sign(payload, "my-secret")
```

---

# 9. Protected Endpoints

Recommended authentication rules:

```text
POST /register     Public
POST /login        Public

GET /list-product  Protected
GET /product/:id   Protected
```

The product endpoints should require a valid JWT so that the JWT authorization requirement is meaningfully implemented.

---

# 10. Database

Database:

```text
MySQL
```

Database name can be:

```text
folkatech_test
```

Environment configuration:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=folkatech_test
DB_USER=root
DB_PASSWORD=
```

---

# 11. Database Tables

The initial database contains three main tables:

```text
users
products
product_images
```

Relationship:

```text
products 1 ───────── N product_images
```

There is currently no required relationship between users and products.

---

# 12. Users Table

Suggested schema:

```text
users
-------------------------
id
first_name
last_name
email
phone
password
created_at
updated_at
```

Details:

| Column     | Type            | Rules                       |
| ---------- | --------------- | --------------------------- |
| id         | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR(100)    | NOT NULL                    |
| last_name  | VARCHAR(100)    | NOT NULL                    |
| email      | VARCHAR(255)    | NOT NULL, UNIQUE            |
| phone      | VARCHAR(20)     | NOT NULL                    |
| password   | VARCHAR(255)    | NOT NULL                    |
| created_at | TIMESTAMP       |                             |
| updated_at | TIMESTAMP       |                             |

Email must be unique.

Password must contain a bcrypt hash.

Never store:

```text
password_confirmation
```

in the database.

`password_confirmation` is only a request validation field.

---

# 13. Products Table

Suggested schema:

```text
products
-------------------------
id
name
brand
description
price
stock
rating
review_count
origin
species
roast_level
tasted
processing
dimensions
weight
capacity
color
created_at
updated_at
```

Details:

| Column       | Type            | Purpose             |
| ------------ | --------------- | ------------------- |
| id           | BIGINT UNSIGNED | Primary key         |
| name         | VARCHAR(255)    | Product name        |
| brand        | VARCHAR(150)    | Brand               |
| description  | TEXT            | Product description |
| price        | DECIMAL(12,2)   | Product price       |
| stock        | INT             | Available stock     |
| rating       | DECIMAL(2,1)    | Product rating      |
| review_count | INT             | Number of reviews   |
| origin       | VARCHAR(100)    | Product origin      |
| species      | VARCHAR(100)    | Product species     |
| roast_level  | VARCHAR(100)    | Roast level         |
| tasted       | VARCHAR(100)    | Taste profile       |
| processing   | VARCHAR(100)    | Processing method   |
| dimensions   | VARCHAR(100)    | Product dimensions  |
| weight       | VARCHAR(50)     | Product weight      |
| capacity     | VARCHAR(50)     | Product capacity    |
| color        | VARCHAR(100)    | Product color       |
| created_at   | TIMESTAMP       | Creation time       |
| updated_at   | TIMESTAMP       | Update time         |

The product fields are derived from the provided Figma design.

The official PDF does not explicitly define a complete product database schema.

Therefore, do not claim these fields are official API requirements. They are implementation requirements derived from the provided design.

---

# 14. Product Images Table

Suggested schema:

```text
product_images
-------------------------
id
product_id
image_url
is_primary
created_at
updated_at
```

Details:

| Column     | Type            | Rules         |
| ---------- | --------------- | ------------- |
| id         | BIGINT UNSIGNED | PRIMARY KEY   |
| product_id | BIGINT UNSIGNED | FOREIGN KEY   |
| image_url  | VARCHAR(500)    | NOT NULL      |
| is_primary | BOOLEAN         | DEFAULT FALSE |
| created_at | TIMESTAMP       |               |
| updated_at | TIMESTAMP       |               |

Relationship:

```text
products.id
     |
     └──── product_images.product_id
```

One product may have multiple images.

---

# 15. Database Indexing

Database tuning is a bonus requirement.

At minimum, consider:

```sql
UNIQUE INDEX users.email
```

Recommended product indexes:

```text
products.name
products.origin
products.species
products.roast_level
```

Do not create unnecessary indexes.

Every index should have a clear query-performance reason.

---

# 16. API — Register

## Endpoint

```http
POST /register
```

## Request

```json
{
  "first_name": "Akhyar",
  "last_name": "Adilian",
  "email": "akhyar@example.com",
  "phone": "08123456789",
  "password": "password123",
  "password_confirmation": "password123"
}
```

## Validation

```text
first_name:
- required
- string

last_name:
- required
- string

email:
- required
- valid email
- unique

phone:
- required

password:
- required
- minimum reasonable length

password_confirmation:
- required
- must match password
```

## Processing

```text
Validate request
      ↓
Check email uniqueness
      ↓
Hash password
      ↓
Insert user
      ↓
Return safe user data
```

## Important

Never return:

```json
{
  "password": "..."
}
```

---

# 17. API — Login

## Endpoint

```http
POST /login
```

## Request

```json
{
  "email": "akhyar@example.com",
  "password": "password123"
}
```

## Processing

```text
Validate request
      ↓
Find user by email
      ↓
Compare bcrypt password
      ↓
Generate JWT
      ↓
Return token
```

## Successful response

```json
{
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>"
  }
}
```

## Invalid credentials

Return:

```http
401 Unauthorized
```

Do not reveal whether the email exists.

Prefer:

```json
{
  "message": "Invalid email or password"
}
```

---

# 18. API — Product List

## Endpoint

```http
GET /list-product
```

JWT required.

---

# 19. Product List Query Parameters

The Figma design contains product search, filtering, sorting, and pagination.

Support these query parameters:

```text
page
limit
search
sort
order
origin
species
roast_level
tasted
processing
```

Example:

```http
GET /list-product?page=1&limit=12
```

Search:

```http
GET /list-product?search=coffee
```

Sorting:

```http
GET /list-product?sort=name&order=asc
```

Filtering:

```http
GET /list-product?origin=Aceh
```

Combined:

```http
GET /list-product?page=1&limit=12&search=coffee&origin=Aceh&sort=name&order=asc
```

---

# 20. Product List Defaults

Recommended defaults:

```text
page = 1
limit = 12
order = asc
```

The Figma design displays 12 products per page.

Do not allow an excessively large `limit`.

Example:

```text
maximum limit = 100
```

---

# 21. Product List Response

Recommended response:

```json
{
  "data": [
    {
      "id": 1,
      "name": "ABID CLEVER DRIPPER 102",
      "brand": "UBRUKOPI",
      "price": 480000,
      "image": "/images/products/abid.jpg",
      "rating": 5,
      "review_count": 7
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 132,
    "total_pages": 11
  }
}
```

The frontend needs the metadata for pagination.

---

# 22. API — Product Detail

## Endpoint

```http
GET /product/:id
```

JWT required.

Example:

```http
GET /product/1
```

---

# 23. Product Detail Response

Recommended structure:

```json
{
  "data": {
    "id": 1,
    "name": "HARIO CAFE PRESS SLIM GREY 240ML",
    "brand": "UbruKopi",
    "price": 480000,
    "rating": 5,
    "review_count": 7,
    "stock": 10,
    "description": "Product description...",
    "specifications": {
      "dimensions": "11x16,5x8cm",
      "weight": "350gr",
      "capacity": "240ml",
      "color": "Abu-abu / Grey",
      "brand": "Hario"
    },
    "images": [
      {
        "url": "/images/products/hario-1.jpg",
        "is_primary": true
      },
      {
        "url": "/images/products/hario-2.jpg",
        "is_primary": false
      }
    ]
  }
}
```

---

# 24. Product Not Found

If the product does not exist:

```http
404 Not Found
```

Response:

```json
{
  "message": "Product not found"
}
```

---

# 25. HTTP Status Codes

Use appropriate status codes:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

Do not return `200` for every situation.

---

# 26. Error Response Convention

Keep errors simple and consistent.

Example:

```json
{
  "message": "Invalid email or password"
}
```

Validation error:

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

---

# 27. Security Requirements

Mandatory:

* Hash passwords using bcrypt.
* Use JWT for authorization.
* Store JWT secret in `.env`.
* Never commit `.env`.
* Provide `.env.example`.
* Never expose database credentials.
* Never expose password hashes in API responses.
* Validate request input.
* Validate product ID.
* Prevent SQL injection by using parameterized queries.
* Do not concatenate raw user input into SQL queries.

Prefer:

```js
connection.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

Avoid:

```js
`SELECT * FROM users WHERE email = '${email}'`
```

---

# 28. Environment Variables

`.env.example`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=folkatech_test
DB_USER=root
DB_PASSWORD=

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

Never commit actual `.env`.

---

# 29. Seed Data

The project must include seed data so the reviewer can immediately test the application.

Recommended:

```text
1 test user
12–20 products
2–3 images per product
```

The products should resemble the products shown in the provided Figma design.

Seed data is development/test data and should not be treated as official Folkatech product data.

---

# 30. Postman

Postman collection must cover at least:

```text
Authentication
├── Register - Success
├── Register - Validation Error
├── Register - Duplicate Email
├── Login - Success
└── Login - Invalid Credentials

Products
├── List Product
├── List Product - Pagination
├── List Product - Search
├── List Product - Filter
├── List Product - Sort
├── List Product - Unauthorized
├── Product Detail
├── Product Detail - Not Found
└── Product Detail - Unauthorized
```

Environment variables:

```text
base_url
token
```

Example:

```text
{{base_url}}/list-product
```

---

# 31. JSON:API Bonus

JSON:API compliance is a bonus requirement.

Do not sacrifice core functionality in order to implement JSON:API.

First complete:

```text
Register
Login
JWT
Product List
Product Detail
```

Then consider JSON:API compliance.

If implementing JSON:API, follow the official specification rather than creating a custom format and calling it JSON:API.

---

# 32. Out of Scope

Do NOT implement these unless explicitly requested later:

```text
Forgot Password backend
Email verification
OAuth
Google Login
Refresh Token
Admin dashboard
Product CRUD
Create Product
Update Product
Delete Product
Shopping Cart backend
Checkout
Payment
Order management
Wishlist backend
Product review submission
```

Some of these elements may appear visually in the Figma design, but they are not among the four required API endpoints in the technical-test PDF.

Prioritize the official API requirements.

---

# 33. Frontend Assumptions

The backend should provide data required by the Figma UI.

Main UI areas:

```text
Authentication
├── Register Step 1
├── Register Step 2
└── Login

Product
├── Product List
│   ├── Search
│   ├── Filter
│   ├── Sort
│   └── Pagination
│
└── Product Detail
    ├── Image Gallery
    ├── Product Information
    ├── Stock
    ├── Description
    └── Specifications
```

Do not create backend endpoints for UI elements that are not part of the required API unless needed later.

---

# 34. Development Priority

Because the technical test has a 2 × 24 hour deadline, use this priority:

## P0 — Mandatory

```text
1. Express setup
2. MySQL connection
3. Database schema
4. User registration
5. Login
6. Password hashing
7. JWT
8. JWT middleware
9. Product list
10. Product detail
11. Validation
12. Error handling
```

## P1 — Required Quality

```text
13. Pagination
14. Search
15. Filtering
16. Sorting
17. Seed data
18. Postman collection
19. README
20. Environment configuration
```

## P2 — Bonus

```text
21. Database indexing/tuning
22. JSON:API compliance
```

---

# 35. Definition of Done — Backend

Backend is considered complete when:

```text
[ ] Express server runs successfully
[ ] MySQL connection works
[ ] Database migrations/schema exist
[ ] Seed data exists
[ ] POST /register works
[ ] Password is hashed
[ ] POST /login works
[ ] Login returns JWT
[ ] JWT middleware works
[ ] GET /list-product works
[ ] GET /list-product supports pagination
[ ] GET /list-product supports search
[ ] GET /list-product supports filtering
[ ] GET /list-product supports sorting
[ ] GET /product/:id works
[ ] Product not found returns 404
[ ] Unauthorized requests return 401
[ ] Validation errors are handled
[ ] SQL queries are parameterized
[ ] .env is excluded from Git
[ ] .env.example exists
[ ] Postman collection exists
[ ] README contains setup instructions
```

Bonus:

```text
[ ] Database indexes implemented
[ ] JSON:API compliance implemented
```

---

# 36. Coding Guidelines for AI Agent

When modifying this project:

1. Inspect the existing code before creating new files.
2. Reuse existing utilities where possible.
3. Do not duplicate logic.
4. Do not change API contracts without explicit reason.
5. Do not introduce unnecessary dependencies.
6. Do not remove working functionality.
7. Keep functions focused.
8. Use descriptive variable and function names.
9. Use async/await consistently.
10. Handle database errors.
11. Handle authentication errors.
12. Validate all external input.
13. Never expose secrets.
14. Never expose password hashes.
15. Keep SQL parameterized.
16. Keep responses consistent.
17. Preserve the required endpoint paths.
18. Prefer small incremental changes.
19. Test affected endpoints after implementation.
20. Update README when setup or API behavior changes.

---

# 37. Important Requirement Hierarchy

When requirements conflict, follow this priority:

```text
1. Official Folkatech Technical Test PDF
2. Provided Folkatech Figma design
3. This AI_CONTEXT.md
4. Existing project implementation
5. General engineering conventions
```

The PDF is authoritative for mandatory technical requirements.

The Figma is authoritative for visual/UI requirements.

Fields and backend behavior inferred from Figma are implementation decisions unless explicitly stated in the PDF.

Do not invent additional mandatory requirements.

---

# 38. Core Principle

The goal is not to build a complete e-commerce platform.

The goal is to deliver a clean, functional, testable backend that satisfies the Folkatech technical test.

Prioritize:

```text
Correctness
>
Required Features
>
Security
>
Clean Architecture
>
API Consistency
>
Testability
>
Performance
>
Bonus Features
```

Do not sacrifice mandatory functionality for bonus features.

---

# 39. Current Implementation Target

The immediate implementation target is:

```text
Node.js
Express.js
MySQL
JWT
bcrypt
REST API
```

Required endpoints:

```text
POST /register
POST /login
GET  /list-product
GET  /product/:id
```

Start implementation with:

```text
1. Project initialization
2. Dependency installation
3. MySQL connection
4. Database schema
5. Seed data
6. Register API
7. Login + JWT
8. JWT middleware
9. Product list API
10. Product detail API
11. Postman testing
```

Only after the backend core is stable should additional bonus work be implemented.

````

### Rekomendasi saya

Simpan persis sebagai:

```text
backend/
└── AI_CONTEXT.md
````

Kemudian **jangan langsung meminta AI agent "buat backend-nya"**. Lebih aman kasih task secara bertahap:

```text
Task 1 → Initialize project + database
Task 2 → Users + Register
Task 3 → Login + JWT
Task 4 → Products + Seeder
Task 5 → List Product
Task 6 → Product Detail
Task 7 → Validation + Error Handling
Task 8 → Testing + Postman
Task 9 → DB Tuning
Task 10 → Review backend
```

Dengan begitu agent tidak terlalu banyak melakukan perubahan sekaligus dan kamu bisa review setiap tahap.
