# Ystore - Full Stack E-commerce Application

> **⚠️ Development Status**: This project is currently under development. New features and improvements are being actively developed. Please check the issues and projects sections to see what's being worked on.

A comprehensive full-stack e-commerce platform built with modern Spring Boot backend and React frontend, demonstrating enterprise-grade development practices and scalable architecture patterns.

## Project Overview

Ystore is a production-ready e-commerce solution that showcases the seamless integration between a robust Spring Boot REST API and a responsive React frontend. This project serves as an extensive learning resource for full-stack development, implementing modern design patterns, best practices, and industry-standard technologies.

The application features a clean architecture with separation of concerns, comprehensive error handling, and a scalable codebase that can be extended for real-world e-commerce scenarios.

## Technologies Used

### Backend (Spring Boot)
- Java 21
- Spring Boot 3.2.5
- Spring Data JPA
- MySQL 8.0.33 / H2 Database
- Lombok
- Maven

### Frontend (React)
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Axios 1.13.5
- React Query (TanStack) 5.90.21

## Quick Start

### Prerequisites
- Java 21 or higher
- Maven 3.6 or higher
- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/luizgdsmdev/Java-Full-Stack-Developer-with-React-Spring-Boot
   cd Java-Full-Stack-Developer-with-React-Spring-Boot
   ```

2. Start the backend:
   ```bash
   cd section-1/Ystore-backend
   mvn spring-boot:run
   ```

3. Start the frontend:
   ```bash
   cd section-1/Ystore-ui
   npm install
   npm run dev
   ```

## Documentation

For detailed information about the project, please refer to the documentation in the `docs/` directory:

- [API Documentation](docs/API.md) - Complete API reference
- [Backend Architecture](docs/BACKEND.md) - Backend setup and architecture
- [Frontend Architecture](docs/FRONTEND.md) - Frontend setup and architecture
- [Database Setup](docs/DATABASE.md) - Database schema and configuration
- [Deployment Guide](docs/DEPLOYMENT.md) - Production deployment instructions
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute to the project

## Project Structure

```
Java-Full-Stack-Developer-with-React-Spring-Boot/
├── section-1/
│   ├── Ystore-backend/          # Spring Boot Backend Application
│   └── Ystore-ui/              # React Frontend Application
├── docs/                       # Detailed Documentation
├── package.json                # Root package configuration
└── README.md                   # This file
```

## License

This project is for educational purposes. Please refer to the license file for more information.
