# Database Documentation

This document provides comprehensive information about the database schema, configuration, and management for the Ystore application.

## Database Systems

### Development Environment (H2)

- **Type**: In-memory database
- **Purpose**: Development and testing
- **Advantages**: Fast setup, no external dependencies
- **Data Persistence**: Lost on application restart

### Production Environment (MySQL)

- **Type**: Relational database
- **Purpose**: Production deployment
- **Version**: MySQL 8.0.33
- **Advantages**: Persistent storage, scalability, performance

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    Categories   │       │    Products     │       │      Orders     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)        │◄──────│ id (PK)        │──────►│ id (PK)        │
│ name           │       │ name           │       │ user_id (FK)    │
│ description    │       │ description    │       │ total_amount    │
│ created_at     │       │ price          │       │ status         │
│ updated_at     │       │ category_id(FK) │       │ created_at     │
└─────────────────┘       │ image_url      │       │ updated_at     │
                        │ stock          │       └─────────────────┘
                        │ created_at     │       
                        │ updated_at     │       
                        └─────────────────┘       
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Order_Items   │
                        ├─────────────────┤
                        │ id (PK)        │
                        │ order_id (FK)  │
                        │ product_id (FK) │
                        │ quantity       │
                        │ unit_price     │
                        └─────────────────┘
```

### Tables

#### Categories

Stores product categories for organization and classification.

```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category_name (name)
);
```

**Fields:**
- `id` - Primary key, auto-increment
- `name` - Category name, unique and required
- `description` - Optional category description
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Sample Data:**

```sql
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Physical and digital books'),
('Home & Garden', 'Home improvement and garden supplies'),
('Sports', 'Sports equipment and accessories');
```

#### Products

Stores product information and inventory details.

```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category_id BIGINT NOT NULL,
    image_url VARCHAR(500),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_product_name (name),
    INDEX idx_product_category (category_id),
    INDEX idx_product_price (price)
);
```

**Fields:**
- `id` - Primary key, auto-increment
- `name` - Product name, required
- `description` - Detailed product description
- `price` - Product price with 2 decimal places
- `category_id` - Foreign key to categories table
- `image_url` - URL to product image
- `stock` - Available inventory quantity
- `created_at` - Timestamp when record was created
- `updated_at` - Timestamp when record was last updated

**Constraints:**
- Price must be non-negative
- Stock must be non-negative
- Category must exist before product can reference it

**Sample Data:**

```sql
INSERT INTO products (name, description, price, category_id, image_url, stock) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 1, 'https://example.com/laptop.jpg', 50),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 1, 'https://example.com/mouse.jpg', 200),
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 19.99, 2, 'https://example.com/tshirt.jpg', 150),
('JavaScript Guide', 'Comprehensive guide to modern JavaScript', 39.99, 3, 'https://example.com/jsbook.jpg', 75);
```

#### Users

Stores user account information and authentication data.

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_user_email (email)
);
```

**Fields:**
- `id` - Primary key, auto-increment
- `email` - User email, unique and required
- `password_hash` - Hashed password (never store plain text)
- `first_name` - User's first name
- `last_name` - User's last name
- `phone` - Optional phone number
- `created_at` - Timestamp when account was created
- `updated_at` - Timestamp when account was last updated

#### Orders

Stores order information and transaction details.

```sql
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_order_user (user_id),
    INDEX idx_order_status (status),
    INDEX idx_order_created (created_at)
);
```

#### Order_Items

Stores individual items within an order (junction table).

```sql
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    UNIQUE KEY unique_order_product (order_id, product_id)
);
```

## Database Configuration

### H2 Configuration (Development)

```properties
# Database connection
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA settings
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### MySQL Configuration (Production)

```properties
# Database connection
spring.datasource.url=jdbc:mysql://localhost:3307/ystoredb?useSSL=false&serverTimezone=UTC
spring.datasource.username=ystore_user
spring.datasource.password=secure_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA settings
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# Connection pool
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

## Database Migration

### Flyway Configuration

Add Flyway to `pom.xml`:

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-mysql</artifactId>
</dependency>
```

### Migration Scripts

Create migration files in `src/main/resources/db/migration/`:

```sql
-- V1__Create_initial_tables.sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category_id BIGINT NOT NULL,
    image_url VARCHAR(500),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
```

```sql
-- V2__Add_indexes.sql
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_product_price ON products(price);
CREATE INDEX idx_category_name ON categories(name);
```

## Database Operations

### Common Queries

#### Get Products by Category

```sql
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.stock,
    c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name = 'Electronics'
ORDER BY p.price ASC;
```

#### Search Products

```sql
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.stock,
    c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.name LIKE '%laptop%' 
   OR p.description LIKE '%laptop%'
ORDER BY 
    CASE 
        WHEN p.name LIKE '%laptop%' THEN 1
        ELSE 2
    END,
    p.name;
```

#### Get Order Details

```sql
SELECT 
    o.id as order_id,
    o.total_amount,
    o.status,
    o.created_at,
    u.email as user_email,
    COUNT(oi.id) as item_count
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = 1
GROUP BY o.id, u.email;
```

#### Inventory Report

```sql
SELECT 
    c.name as category,
    COUNT(p.id) as product_count,
    SUM(p.stock) as total_stock,
    SUM(p.stock * p.price) as inventory_value
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
ORDER BY inventory_value DESC;
```

## Performance Optimization

### Indexing Strategy

```sql
-- Primary indexes (automatically created)
PRIMARY KEY (id)

-- Foreign key indexes
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_item_order ON order_items(order_id);
CREATE INDEX idx_order_item_product ON order_items(product_id);

-- Search indexes
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_product_price ON products(price);
CREATE INDEX idx_category_name ON categories(name);

-- Composite indexes for common queries
CREATE INDEX idx_product_category_price ON products(category_id, price);
CREATE INDEX idx_order_user_status ON orders(user_id, status);
```

### Query Optimization

```sql
-- Use EXPLAIN to analyze query performance
EXPLAIN SELECT * FROM products WHERE category_id = 1 AND price < 100;

-- Use LIMIT for pagination
SELECT * FROM products ORDER BY created_at DESC LIMIT 20 OFFSET 0;

-- Use JOIN instead of subqueries
SELECT p.*, c.name as category_name
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.name = 'Electronics';
```

## Backup and Recovery

### MySQL Backup

```bash
# Full database backup
mysqldump -u username -p ystoredb > ystore_backup.sql

# Compressed backup
mysqldump -u username -p ystoredb | gzip > ystore_backup.sql.gz

# Specific tables backup
mysqldump -u username -p ystoredb products categories > tables_backup.sql
```

### MySQL Recovery

```bash
# Restore from backup
mysql -u username -p ystoredb < ystore_backup.sql

# Restore from compressed backup
gunzip < ystore_backup.sql.gz | mysql -u username -p ystoredb
```

### Automated Backup Script

```bash
#!/bin/bash
# backup_database.sh

DB_NAME="ystoredb"
DB_USER="ystore_user"
DB_PASS="secure_password"
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/ystoredb_$DATE.sql.gz

# Remove backups older than 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: ystoredb_$DATE.sql.gz"
```

## Security Considerations

### User Permissions

```sql
-- Create application user with limited privileges
CREATE USER 'ystore_app'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ystoredb.* TO 'ystore_app'@'localhost';

-- Create read-only user for reporting
CREATE USER 'ystore_readonly'@'localhost' IDENTIFIED BY 'readonly_password';
GRANT SELECT ON ystoredb.* TO 'ystore_readonly'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;
```

### Data Validation

```sql
-- Add check constraints for data integrity
ALTER TABLE products 
ADD CONSTRAINT chk_price_positive CHECK (price >= 0),
ADD CONSTRAINT chk_stock_non_negative CHECK (stock >= 0);

ALTER TABLE order_items 
ADD CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
ADD CONSTRAINT chk_unit_price_positive CHECK (unit_price >= 0);
```

## Monitoring and Maintenance

### Database Health Check

```sql
-- Check table sizes
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables 
WHERE table_schema = 'ystoredb'
ORDER BY size_mb DESC;

-- Check index usage
SELECT 
    table_name,
    index_name,
    cardinality,
    sub_part,
    packed,
    nullable,
    index_type
FROM information_schema.statistics 
WHERE table_schema = 'ystoredb'
ORDER BY table_name, index_name;
```

### Performance Monitoring

```sql
-- Slow query log
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- Process list
SHOW PROCESSLIST;

-- Connection status
SHOW STATUS LIKE 'Connections';
SHOW STATUS LIKE 'Threads_connected';
```

## Best Practices

1. **Normalization**: Follow database normalization principles
2. **Indexing**: Create appropriate indexes for query performance
3. **Constraints**: Use foreign keys and check constraints for data integrity
4. **Backup**: Implement regular backup strategies
5. **Security**: Use proper user permissions and password hashing
6. **Monitoring**: Monitor database performance and slow queries
7. **Migration**: Use version-controlled migration scripts
8. **Testing**: Test database changes in development environment first
