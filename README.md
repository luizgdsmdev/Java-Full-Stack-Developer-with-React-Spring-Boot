# Ystore - Full Stack E-commerce Application

A modern full-stack e-commerce application built with Spring Boot backend and React frontend, demonstrating best practices in Java development and React development.

## 🏗️ Project Overview

Ystore is a complete e-commerce platform that showcases the integration of a robust Spring Boot REST API with a responsive React frontend. This project serves as a comprehensive learning resource for full-stack development using modern Java and JavaScript technologies.

## 🚀 Technologies Used

### Backend (Spring Boot)
- **Java 21** - Modern Java with latest features
- **Spring Boot 3.2.5** - Framework for building production-ready applications
- **Spring Data JPA** - Database access layer with Hibernate
- **MySQL 8.0.33** - Primary database for production
- **H2 Database** - In-memory database for development and testing
- **Lombok** - Reduces boilerplate code
- **Spring Boot DevTools** - Development-time tools
- **Maven** - Build and dependency management

### Frontend (React)
- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript development
- **Vite 7.2.4** - Fast build tool and development server
- **Axios 1.13.5** - HTTP client for API communication
- **React Query (TanStack) 5.90.21** - Server state management
- **Lucide React 0.577.0** - Beautiful icon library
- **React Icons 5.6.0** - Comprehensive icon collection
- **Font Awesome React 3.1.1** - Premium icons
- **ESLint 10.0.1** - Code quality and linting

## 📁 Project Structure

```
Java-Full-Stack-Developer-with-React-Spring-Boot/
├── section-1/
│   ├── Ystore-backend/          # Spring Boot Backend Application
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/Ystore/
│   │   │   │   │   ├── DTO/           # Data Transfer Objects
│   │   │   │   │   ├── config/        # Configuration classes
│   │   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   │   ├── entity/         # JPA Entities
│   │   │   │   │   ├── repository/     # JPA Repositories
│   │   │   │   │   └── service/       # Business Logic
│   │   │   │   └── resources/
│   │   │   │       ├── application.properties
│   │   │   │       └── sql/           # Database scripts
│   │   │   └── test/
│   │   └── pom.xml
│   └── Ystore-ui/              # React Frontend Application
│       ├── public/
│       ├── src/
│       │   ├── API/            # API integration layer
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── utils/          # Utility functions
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── package.json
├── package.json                # Root package configuration
└── README.md                   # This file
```

## 🛠️ Prerequisites

Before running this application, ensure you have the following installed:

- **Java 21** or higher
- **Maven 3.6** or higher
- **Node.js 18** or higher
- **npm 9** or higher
- **MySQL Server** (for production database)
- **Git** (for version control)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/luizgdsmdev/Java-Full-Stack-Developer-with-React-Spring-Boot
cd Java-Full-Stack-Developer-with-React-Spring-Boot
```

### 2. Database Setup

#### Option A: MySQL (Production)
1. Install MySQL Server
2. Create database:
   ```sql
   CREATE DATABASE ystoredb;
   ```
3. Update database credentials in `section-1/Ystore-backend/src/main/resources/application.properties` if needed

#### Option B: H2 (Development)
The application is configured to use H2 console for development. Access it at:
```
http://localhost:8080/h2-console
```
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

### 3. Backend Setup

```bash
cd section-1/Ystore-backend

# Install dependencies and compile
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd section-1/Ystore-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### Backend Configuration

Key configuration files:
- `application.properties` - Main application configuration
- `pom.xml` - Maven dependencies and build configuration

### Frontend Configuration

Key configuration files:
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite build configuration
- `tsconfig.json` - TypeScript configuration

## 📊 Database Schema

The application uses JPA entities with automatic schema generation. Key entities include:

- **Products** - Product catalog
- **Categories** - Product categorization
- **Users** - User management
- **Orders** - Order processing

## 🎯 Features

### Backend Features
- RESTful API endpoints
- JPA entity management
- Database migrations
- Input validation
- Error handling
- CORS configuration
- H2 console for development

### Frontend Features
- Component-based architecture
- Responsive design
- State management with React Query
- API integration with Axios
- Modern UI with Lucide icons
- TypeScript support
- Hot module replacement

## 🧪 Testing

### Backend Testing
```bash
cd section-1/Ystore-backend
mvn test
```

### Frontend Testing
```bash
cd section-1/Ystore-ui
npm run lint
```

## 📦 Build & Deployment

### Backend Build
```bash
cd section-1/Ystore-backend
mvn clean package
```

### Frontend Build
```bash
cd section-1/Ystore-ui
npm run build
```

## 🔍 API Documentation

Once the backend is running, you can access:
- **H2 Console**: `http://localhost:8080/h2-console`
- **API Endpoints**: Base URL `http://localhost:8080/api`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 Development Notes

- The backend uses Spring Boot DevTools for automatic restarts
- The frontend uses Vite for fast development and building
- Database schema is automatically generated/updated
- Both applications support hot reloading during development

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running on port 3307
   - Check database credentials in application.properties

2. **Port Conflicts**
   - Backend defaults to port 8080
   - Frontend defaults to port 5173
   - Change ports if conflicts occur

3. **Maven Build Issues**
   - Ensure Java 21 is installed and configured
   - Run `mvn clean install` to resolve dependencies

## 📄 License

This project is for educational purposes. Please refer to the license file for more information.

## 🙏 Acknowledgments

- Spring Boot Team for the excellent framework
- React Team for the powerful UI library
- All contributors and developers who made this project possible