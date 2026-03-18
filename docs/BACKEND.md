# Backend Architecture

This document provides detailed information about the Spring Boot backend architecture, configuration, and development guidelines.

## Technology Stack

- **Java 21** - Modern Java with latest language features
- **Spring Boot 3.2.5** - Application framework
- **Spring Data JPA** - Database access layer
- **Spring Web** - REST API framework
- **MySQL 8.0.33** - Production database
- **H2 Database** - Development database
- **Lombok** - Code generation utility
- **Maven** - Build and dependency management

## Project Structure

```
Ystore-backend/
├── src/
│   ├── main/
│   │   ├── java/com/Ystore/
│   │   │   ├── DTO/                    # Data Transfer Objects
│   │   │   ├── config/                 # Configuration classes
│   │   │   ├── controller/             # REST Controllers
│   │   │   ├── entity/                 # JPA Entities
│   │   │   ├── repository/             # Data Access Layer
│   │   │   ├── service/               # Business Logic Layer
│   │   │   └── DTO/transformation/    # DTO Transformers
│   │   └── resources/
│   │       ├── application.properties   # Application Configuration
│   │       └── sql/                  # Database Scripts
│   └── test/                        # Test Classes
└── pom.xml                          # Maven Configuration
```

## Architecture Layers

### Controller Layer

Controllers handle HTTP requests and responses, implementing RESTful API endpoints.

**Key Responsibilities:**
- Request validation
- Response formatting
- HTTP status code management
- CORS configuration

**Example:**

```java
@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    
    private final IProductService productService;
    private final ProductDtoTransfor productDtoTransfor;
    
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts()
                .stream()
                .map(productDtoTransfor::transformProductToProductDto)
                .toList();
        
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(products);
    }
}
```

### Service Layer

Service classes contain business logic and orchestrate data operations.

**Key Responsibilities:**
- Business rule implementation
- Transaction management
- Data validation
- Integration between multiple repositories

### Repository Layer

Repositories handle data access operations using Spring Data JPA.

**Key Responsibilities:**
- Database operations
- Query optimization
- Entity management
- Data persistence

### Entity Layer

JPA entities represent database tables and relationships.

**Key Responsibilities:**
- Database mapping
- Relationship definitions
- Data validation annotations
- Lifecycle callbacks

### DTO Layer

Data Transfer Objects provide clean data contracts between layers.

**Key Responsibilities:**
- Data encapsulation
- API response formatting
- Input validation
- Separation of concerns

## Configuration

### Application Properties

```properties
# Server Configuration
server.port=8080

# Database Configuration (H2 - Development)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### Maven Dependencies

Key dependencies in `pom.xml`:

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Utilities -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

## Development Guidelines

### Code Style

- Use Lombok annotations to reduce boilerplate code
- Follow Spring Boot best practices
- Implement proper exception handling
- Use DTOs for API communication
- Apply SOLID principles

### Exception Handling

Implement global exception handling using `@ControllerAdvice`:

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
            ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(
            "RESOURCE_NOT_FOUND", 
            ex.getMessage()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        // Handle validation errors
    }
}
```

### Validation

Use Bean Validation annotations:

```java
public class ProductDTO {
    
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;
}
```

## Testing

### Unit Testing

Use JUnit 5 and Mockito for unit tests:

```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    
    @Mock
    private ProductRepository productRepository;
    
    @InjectMocks
    private ProductServiceImpl productService;
    
    @Test
    void shouldReturnAllProducts() {
        // Given
        List<Product> products = Arrays.asList(
            new Product(1L, "Product 1", "Description 1"),
            new Product(2L, "Product 2", "Description 2")
        );
        when(productRepository.findAll()).thenReturn(products);
        
        // When
        List<Product> result = productService.getAllProducts();
        
        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Product 1");
    }
}
```

### Integration Testing

Use `@SpringBootTest` for integration tests:

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProductControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void shouldReturnAllProducts() {
        ResponseEntity<ProductDTO[]> response = restTemplate.getForEntity(
            "/api/v1/products", 
            ProductDTO[].class
        );
        
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotEmpty();
    }
}
```

## Database Configuration

### Development (H2)

- In-memory database for fast development
- Auto-creates schema on startup
- H2 console available at `/h2-console`
- Data is lost on application restart

### Production (MySQL)

```properties
# Production Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3307/ystoredb
spring.datasource.username=ystore_user
spring.datasource.password=secure_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration for Production
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

## Security Considerations

### Current State

- No authentication/authorization implemented
- CORS configured for development frontend
- Input validation on DTOs
- SQL injection prevention through JPA

### Future Enhancements

- JWT-based authentication
- Role-based authorization
- API rate limiting
- Input sanitization
- HTTPS enforcement

## Performance Optimization

### Database Optimization

- Use appropriate indexes
- Implement pagination for large datasets
- Use DTO projections for read operations
- Cache frequently accessed data

### Application Optimization

- Enable Spring Boot Actuator for monitoring
- Implement connection pooling
- Use async processing for long operations
- Configure appropriate JVM settings

## Deployment

### Local Development

```bash
mvn spring-boot:run
```

### Production Build

```bash
mvn clean package
java -jar target/ystore-backend-0.0.1-SNAPSHOT.jar
```

### Docker Deployment

```dockerfile
FROM openjdk:21-jdk-slim

WORKDIR /app
COPY target/ystore-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Monitoring and Logging

### Application Logs

Configure logging in `application.properties`:

```properties
logging.level.com.Ystore=DEBUG
logging.level.org.springframework.web=INFO
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```

### Health Checks

Spring Boot Actuator provides health endpoints:

- `/actuator/health` - Application health status
- `/actuator/info` - Application information
- `/actuator/metrics` - Application metrics

## Best Practices

1. **Code Organization**: Follow package-by-feature structure
2. **Error Handling**: Implement global exception handling
3. **Validation**: Use Bean Validation annotations
4. **Testing**: Write comprehensive unit and integration tests
5. **Documentation**: Keep API documentation updated
6. **Security**: Implement proper authentication and authorization
7. **Performance**: Monitor and optimize database queries
8. **Logging**: Use structured logging for better debugging
