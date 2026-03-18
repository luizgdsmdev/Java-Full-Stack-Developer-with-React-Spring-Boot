# API Documentation

This document provides comprehensive information about the Ystore REST API endpoints, request/response formats, and usage examples.

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently, the API does not require authentication. This will be implemented in future versions.

## Response Format

All API responses follow a consistent JSON format:

### Success Response

```json
{
  "data": {},
  "status": "success",
  "timestamp": "2024-03-17T21:00:00.000Z"
}
```

### Error Response

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "status": "error",
  "timestamp": "2024-03-17T21:00:00.000Z"
}
```

## Endpoints

### Products

#### Get All Products

Retrieves a list of all products in the system.

**Endpoint:** `GET /api/v1/products`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "category": {
      "id": 1,
      "name": "Category Name"
    },
    "imageUrl": "https://example.com/image.jpg",
    "stock": 100,
    "createdAt": "2024-03-17T21:00:00.000Z",
    "updatedAt": "2024-03-17T21:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Products retrieved successfully
- `204 No Content` - No products found

#### Get Product by ID

Retrieves a specific product by its ID.

**Endpoint:** `GET /api/v1/products/{id}`

**Path Parameters:**
- `id` (integer) - Product ID

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": {
    "id": 1,
    "name": "Category Name"
  },
  "imageUrl": "https://example.com/image.jpg",
  "stock": 100,
  "createdAt": "2024-03-17T21:00:00.000Z",
  "updatedAt": "2024-03-17T21:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Product retrieved successfully
- `404 Not Found` - Product not found

#### Create Product

Creates a new product in the system.

**Endpoint:** `POST /api/v1/products`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "categoryId": 1,
  "imageUrl": "https://example.com/image.jpg",
  "stock": 100
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": {
    "id": 1,
    "name": "Category Name"
  },
  "imageUrl": "https://example.com/image.jpg",
  "stock": 100,
  "createdAt": "2024-03-17T21:00:00.000Z",
  "updatedAt": "2024-03-17T21:00:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Product created successfully
- `400 Bad Request` - Invalid input data
- `422 Unprocessable Entity` - Validation errors

#### Update Product

Updates an existing product.

**Endpoint:** `PUT /api/v1/products/{id}`

**Path Parameters:**
- `id` (integer) - Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated product description",
  "price": 149.99,
  "categoryId": 2,
  "imageUrl": "https://example.com/new-image.jpg",
  "stock": 150
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated product description",
  "price": 149.99,
  "category": {
    "id": 2,
    "name": "New Category Name"
  },
  "imageUrl": "https://example.com/new-image.jpg",
  "stock": 150,
  "createdAt": "2024-03-17T21:00:00.000Z",
  "updatedAt": "2024-03-17T21:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Product updated successfully
- `404 Not Found` - Product not found
- `400 Bad Request` - Invalid input data
- `422 Unprocessable Entity` - Validation errors

#### Delete Product

Deletes a product from the system.

**Endpoint:** `DELETE /api/v1/products/{id}`

**Path Parameters:**
- `id` (integer) - Product ID

**Status Codes:**
- `204 No Content` - Product deleted successfully
- `404 Not Found` - Product not found

### Categories

#### Get All Categories

Retrieves a list of all categories.

**Endpoint:** `GET /api/v1/categories`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Category Name",
    "description": "Category description",
    "createdAt": "2024-03-17T21:00:00.000Z",
    "updatedAt": "2024-03-17T21:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Categories retrieved successfully
- `204 No Content` - No categories found

#### Get Category by ID

Retrieves a specific category by its ID.

**Endpoint:** `GET /api/v1/categories/{id}`

**Path Parameters:**
- `id` (integer) - Category ID

**Response:**
```json
{
  "id": 1,
  "name": "Category Name",
  "description": "Category description",
  "createdAt": "2024-03-17T21:00:00.000Z",
  "updatedAt": "2024-03-17T21:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Category retrieved successfully
- `404 Not Found` - Category not found

#### Create Category

Creates a new category.

**Endpoint:** `POST /api/v1/categories`

**Request Body:**
```json
{
  "name": "Category Name",
  "description": "Category description"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Category Name",
  "description": "Category description",
  "createdAt": "2024-03-17T21:00:00.000Z",
  "updatedAt": "2024-03-17T21:00:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Category created successfully
- `400 Bad Request` - Invalid input data
- `422 Unprocessable Entity` - Validation errors

## Error Codes

| Code | Description |
|------|-------------|
| PRODUCT_NOT_FOUND | Product with specified ID not found |
| CATEGORY_NOT_FOUND | Category with specified ID not found |
| INVALID_INPUT | Invalid input data provided |
| VALIDATION_ERROR | Input data failed validation |
| INTERNAL_ERROR | Internal server error |

## Rate Limiting

Currently, there are no rate limits applied to the API. This will be implemented in future versions.

## CORS

The API supports Cross-Origin Resource Sharing (CORS) for the following origins:
- `http://localhost:5173` (development frontend)

## Testing the API

You can test the API using tools like:
- Postman
- curl
- Insomnia

### Example curl Commands

```bash
# Get all products
curl -X GET http://localhost:8080/api/v1/products

# Get product by ID
curl -X GET http://localhost:8080/api/v1/products/1

# Create a new product
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "categoryId": 1,
    "imageUrl": "https://example.com/image.jpg",
    "stock": 100
  }'
```

## Versioning

The API is versioned using URL path versioning. Current version: `v1`

Future versions will maintain backward compatibility when possible.
