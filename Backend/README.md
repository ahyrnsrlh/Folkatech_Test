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

JSON:API responses use resource objects, `type`/`id`, `attributes`, relationships for product images, `included` image resources, and JSON:API error documents. This mode is supported for the required authentication and product endpoints without changing their existing paths or default responses.

## Database tuning bonus

Product sorting fields have dedicated indexes for `price`, `rating`, `review_count`, and `created_at`. Product image lookup uses the foreign-key index on `product_id`; the existing primary-image ordering remains limited to the small per-product image set. The migrations are repeatable and preserve parameterized filtering queries.

## Security notes

- Passwords are hashed with bcrypt and are never returned.
- JWT secrets and database credentials are read from environment variables.
- SQL queries use parameterized values.
- `.env` is ignored by Git; commit `.env.example` instead.
