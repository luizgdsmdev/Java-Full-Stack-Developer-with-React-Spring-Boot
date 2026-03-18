# Deployment Guide

This document provides comprehensive instructions for deploying the Ystore application to various environments.

## Deployment Overview

The Ystore application consists of two main components:
- **Backend**: Spring Boot application (port 8080)
- **Frontend**: React application (port 5173 in development, built to static files in production)

## Environment Types

### Development Environment

- **Purpose**: Local development and testing
- **Database**: H2 in-memory database
- **Configuration**: Development profiles
- **URLs**: 
  - Backend: `http://localhost:8080`
  - Frontend: `http://localhost:5173`

### Staging Environment

- **Purpose**: Pre-production testing
- **Database**: MySQL with test data
- **Configuration**: Staging profiles
- **URLs**: 
  - Backend: `https://api-staging.ystore.com`
  - Frontend: `https://staging.ystore.com`

### Production Environment

- **Purpose**: Live application
- **Database**: MySQL with production data
- **Configuration**: Production profiles
- **URLs**: 
  - Backend: `https://api.ystore.com`
  - Frontend: `https://ystore.com`

## Prerequisites

### System Requirements

- **Java**: OpenJDK 21 or higher
- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **MySQL**: Version 8.0.33 or higher
- **Web Server**: Nginx or Apache (for production)
- **Reverse Proxy**: Nginx (recommended)
- **SSL Certificate**: For HTTPS (production)

### Database Setup

```sql
-- Create production database
CREATE DATABASE ystoredb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create application user
CREATE USER 'ystore_app'@'localhost' IDENTIFIED BY 'secure_production_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ystoredb.* TO 'ystore_app'@'localhost';
FLUSH PRIVILEGES;
```

## Backend Deployment

### Local Development

```bash
# Navigate to backend directory
cd section-1/Ystore-backend

# Run in development mode
mvn spring-boot:run

# Or with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Production Build

```bash
# Clean and package the application
mvn clean package -DskipTests

# The JAR file will be created in target/
# ystore-backend-0.0.1-SNAPSHOT.jar
```

### Production Configuration

Create `application-prod.properties`:

```properties
# Server Configuration
server.port=8080
server.address=0.0.0.0

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ystoredb?useSSL=false&serverTimezone=UTC
spring.datasource.username=ystore_app
spring.datasource.password=secure_production_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false

# Connection Pool
spring.datasource.hikari.connection-timeout=20000
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=10
spring.datasource.hikari.idle-timeout=300000
spring.datasource.hikari.max-lifetime=1200000

# Logging
logging.level.com.Ystore=INFO
logging.level.org.springframework.web=WARN
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
logging.file.path=/var/log/ystore
logging.file.name=ystore.log

# CORS Configuration
spring.web.cors.allowed-origins=https://ystore.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### Production Deployment

```bash
# Create deployment directory
sudo mkdir -p /opt/ystore
sudo cp target/ystore-backend-0.0.1-SNAPSHOT.jar /opt/ystore/ystore-backend.jar

# Create systemd service
sudo nano /etc/systemd/system/ystore-backend.service
```

Systemd service configuration:

```ini
[Unit]
Description=Ystore Backend Service
After=syslog.target network.target

[Service]
User=ystore
Group=ystore
Type=simple
JavaHome=/usr/lib/jvm/java-21-openjdk-amd64
ExecStart=/usr/lib/jvm/java-21-openjdk-amd64/bin/java -jar /opt/ystore/ystore-backend.jar
SuccessExitStatus=143
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ystore-backend

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable ystore-backend
sudo systemctl start ystore-backend

# Check status
sudo systemctl status ystore-backend
```

## Frontend Deployment

### Local Development

```bash
# Navigate to frontend directory
cd section-1/Ystore-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# The build output will be in dist/ directory
```

### Production Configuration

Create `.env.production`:

```bash
# API Configuration
VITE_API_URL=https://api.ystore.com/api
VITE_APP_TITLE=Ystore
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=true
```

Update `vite.config.js` for production:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
```

### Nginx Configuration

Create Nginx configuration file:

```nginx
# /etc/nginx/sites-available/ystore
server {
    listen 80;
    server_name ystore.com www.ystore.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ystore.com www.ystore.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/ystore.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ystore.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Frontend Static Files
    location / {
        root /var/www/ystore/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API Proxy
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ystore /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Docker Deployment

### Backend Dockerfile

```dockerfile
# Dockerfile.backend
FROM openjdk:21-jdk-slim

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy JAR file
COPY target/ystore-backend-0.0.1-SNAPSHOT.jar app.jar

# Create non-root user
RUN groupadd -r ystore && useradd -r -g ystore ystore
RUN chown -R ystore:ystore /app
USER ystore

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile

```dockerfile
# Dockerfile.frontend
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: ystore-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: ystoredb
      MYSQL_USER: ystore_app
      MYSQL_PASSWORD: app_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - ystore-network

  backend:
    build:
      context: ./section-1/Ystore-backend
      dockerfile: Dockerfile
    container_name: ystore-backend
    environment:
      SPRING_PROFILES_ACTIVE: docker
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/ystoredb
      SPRING_DATASOURCE_USERNAME: ystore_app
      SPRING_DATASOURCE_PASSWORD: app_password
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    networks:
      - ystore-network

  frontend:
    build:
      context: ./section-1/Ystore-ui
      dockerfile: Dockerfile
    container_name: ystore-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - ystore-network

volumes:
  mysql_data:

networks:
  ystore-network:
    driver: bridge
```

```bash
# Deploy with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Cloud Deployment

### AWS Deployment

#### EC2 Setup

```bash
# Launch EC2 instance (Ubuntu 22.04)
# Security Groups: HTTP (80), HTTPS (443), SSH (22)

# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Java 21
sudo apt update
sudo apt install openjdk-21-jdk -y

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Nginx
sudo apt install nginx -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### AWS RDS Configuration

```bash
# Create RDS MySQL instance
# Engine: MySQL 8.0
# Instance class: db.t3.micro (for testing)
# Storage: 20GB
# VPC: Default VPC
# Security Group: Allow access from EC2 instance
```

#### Application Deployment

```bash
# Clone repository
git clone https://github.com/luizgdsmdev/Java-Full-Stack-Developer-with-React-Spring-Boot
cd Java-Full-Stack-Developer-with-React-Spring-Boot

# Build backend
cd section-1/Ystore-backend
mvn clean package -DskipTests

# Create systemd service (as shown earlier)
sudo nano /etc/systemd/system/ystore-backend.service

# Build and deploy frontend
cd ../../section-1/Ystore-ui
npm install
npm run build

# Copy files to nginx directory
sudo cp -r dist/* /var/www/html/

# Configure nginx (as shown earlier)
sudo nano /etc/nginx/sites-available/ystore
```

### Heroku Deployment

#### Backend Deployment

Create `Procfile`:

```
web: java -jar target/ystore-backend-0.0.1-SNAPSHOT.jar
```

Create `system.properties`:

```
java.runtime.version=21
```

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create ystore-backend

# Add MySQL addon
heroku addons:create jawsdb

# Set environment variables
heroku config:set SPRING_PROFILES_ACTIVE=prod

# Deploy
git subtree push --prefix section-1/Ystore-backend heroku main
```

#### Frontend Deployment

```bash
# Create frontend app
heroku create ystore-frontend

# Set build command
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix section-1/Ystore-ui heroku main
```

## Monitoring and Logging

### Application Monitoring

Add Spring Boot Actuator to `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Configure actuator endpoints:

```properties
# Actuator Configuration
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized
management.info.env.enabled=true
```

### Log Management

Configure log rotation:

```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/ystore

/var/log/ystore/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 ystore ystore
    postrotate
        systemctl reload ystore-backend
    endscript
}
```

### Health Checks

```bash
# Create health check script
#!/bin/bash
# /opt/ystore/health-check.sh

response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/actuator/health)

if [ $response -eq 200 ]; then
    echo "Application is healthy"
    exit 0
else
    echo "Application is unhealthy (HTTP $response)"
    exit 1
fi
```

## Security Considerations

### SSL/TLS Configuration

```bash
# Install Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d ystore.com -d www.ystore.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall Configuration

```bash
# Configure UFW
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Security Headers

Add to Nginx configuration:

```nginx
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

## Backup Strategy

### Database Backup

```bash
# Create backup script
#!/bin/bash
# /opt/ystore/backup.sh

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="ystoredb"
DB_USER="ystore_app"

# Create backup
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/ystoredb_$DATE.sql.gz

# Remove old backups (keep last 7 days)
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete

echo "Backup completed: ystoredb_$DATE.sql.gz"
```

```bash
# Schedule daily backups
sudo crontab -e
# Add: 0 2 * * * /opt/ystore/backup.sh
```

### Application Backup

```bash
# Backup application files
#!/bin/bash
# /opt/ystore/app-backup.sh

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup application JAR
cp /opt/ystore/ystore-backend.jar $BACKUP_DIR/ystore-backend_$DATE.jar

# Backup configuration files
tar -czf $BACKUP_DIR/config_$DATE.tar.gz /etc/nginx/sites-available/ystore /etc/systemd/system/ystore-backend.service

echo "Application backup completed"
```

## Troubleshooting

### Common Issues

#### Backend Won't Start

```bash
# Check logs
sudo journalctl -u ystore-backend -f

# Check Java version
java -version

# Check port availability
sudo netstat -tlnp | grep 8080
```

#### Database Connection Issues

```bash
# Test database connection
mysql -u ystore_app -p -h localhost ystoredb

# Check MySQL status
sudo systemctl status mysql

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log
```

#### Frontend Not Loading

```bash
# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

### Performance Issues

```bash
# Check system resources
top
htop
free -h
df -h

# Check application metrics
curl http://localhost:8080/actuator/metrics
```

## Best Practices

1. **Environment Separation**: Use different configurations for dev/staging/prod
2. **Security**: Implement SSL, firewalls, and security headers
3. **Monitoring**: Set up health checks and monitoring
4. **Backup**: Implement regular backup strategies
5. **Scaling**: Consider load balancing for high traffic
6. **Updates**: Plan for zero-downtime deployments
7. **Documentation**: Keep deployment procedures documented
8. **Testing**: Test deployments in staging environment first
