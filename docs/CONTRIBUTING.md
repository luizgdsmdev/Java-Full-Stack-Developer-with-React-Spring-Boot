# Contributing Guidelines

This document provides guidelines and instructions for contributing to the Ystore project. We welcome contributions from the community and appreciate your interest in improving this project.

## Getting Started

### Prerequisites

Before you start contributing, make sure you have the following installed:

- **Java 21** or higher
- **Maven 3.6** or higher
- **Node.js 18** or higher
- **npm 9** or higher
- **Git** for version control
- **IDE** (IntelliJ IDEA, VS Code, or similar)

### Development Setup

1. **Fork the Repository**

   Click the "Fork" button on the GitHub repository page to create your own copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Java-Full-Stack-Developer-with-React-Spring-Boot.git
   cd Java-Full-Stack-Developer-with-React-Spring-Boot
   ```

3. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/luizgdsmdev/Java-Full-Stack-Developer-with-React-Spring-Boot.git
   ```

4. **Set Up Development Environment**

   ```bash
   # Backend setup
   cd section-1/Ystore-backend
   mvn clean install
   mvn spring-boot:run

   # Frontend setup (in another terminal)
   cd section-1/Ystore-ui
   npm install
   npm run dev
   ```

## Contribution Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/your-bugfix-name
```

### 2. Make Changes

Follow the coding standards and guidelines outlined in this document.

### 3. Test Your Changes

Ensure your changes work correctly:

```bash
# Backend tests
cd section-1/Ystore-backend
mvn test

# Frontend linting
cd section-1/Ystore-ui
npm run lint
```

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: Add user authentication feature"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with a clear description of your changes.

## Coding Standards

### Backend (Java/Spring Boot)

#### Code Style

- Follow Java naming conventions
- Use meaningful variable and method names
- Keep methods small and focused
- Use proper exception handling
- Add Javadoc comments for public methods

```java
/**
 * Retrieves all products from the database.
 * 
 * @return List of ProductDTO objects
 * @throws ProductNotFoundException if no products are found
 */
public List<ProductDTO> getAllProducts() throws ProductNotFoundException {
    // Implementation
}
```

#### Package Structure

Follow the existing package structure:

```
com.Ystore/
├── DTO/           # Data Transfer Objects
├── config/        # Configuration classes
├── controller/    # REST Controllers
├── entity/        # JPA Entities
├── repository/    # JPA Repositories
├── service/       # Business Logic
└── exception/     # Custom Exceptions
```

#### Best Practices

- Use dependency injection with `@RequiredArgsConstructor`
- Implement proper input validation
- Use `@RestController` for API endpoints
- Follow RESTful API design principles
- Use appropriate HTTP status codes

```java
@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    
    private final IProductService productService;
    
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        
        if (products.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(products);
    }
}
```

### Frontend (React/TypeScript)

#### Code Style

- Use TypeScript for type safety
- Follow React hooks rules
- Use functional components
- Implement proper error boundaries
- Use descriptive component names

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  return (
    <div className="product-card">
      {/* Component JSX */}
    </div>
  );
}

export default ProductCard;
```

#### Component Organization

- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper state management
- Use CSS modules for styling
- Follow accessibility guidelines

#### Best Practices

- Use React Query for server state
- Implement proper error handling
- Use loading states for async operations
- Follow responsive design principles
- Test components thoroughly

## Testing Guidelines

### Backend Testing

#### Unit Tests

Write unit tests for service classes and business logic:

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

#### Integration Tests

Test API endpoints and database interactions:

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.properties")
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

### Frontend Testing

#### Unit Tests

Test React components and hooks:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    imageUrl: 'test.jpg',
  };

  const mockOnAddToCart = vi.fn();

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart} 
      />
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledWith(1, 1);
  });
});
```

## Documentation Guidelines

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error responses
- Update API.md when making changes

### Code Comments

- Add comments for complex logic
- Document public methods and classes
- Explain business rules
- Use TODO comments for temporary solutions

### README Updates

- Update README.md when adding new features
- Include setup instructions for new dependencies
- Update technology stack information
- Add troubleshooting information

## Pull Request Guidelines

### Before Creating a PR

1. **Test thoroughly** - Ensure all tests pass
2. **Update documentation** - Update relevant documentation
3. **Check formatting** - Ensure code follows style guidelines
4. **Squash commits** - Clean up commit history if needed

### PR Template

Use the following template for pull requests:

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Self-Review** - Review your own changes first
2. **Peer Review** - Another team member reviews the PR
3. **Testing** - Ensure all tests pass
4. **Merge** - Merge after approval

## Issue Reporting

### Bug Reports

When reporting bugs, include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - Detailed steps to reproduce the bug
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - OS, browser, versions
6. **Screenshots** - If applicable
7. **Logs** - Relevant error logs

### Feature Requests

When requesting features, include:

1. **Description** - Clear description of the feature
2. **Use Case** - Why this feature is needed
3. **Proposed Solution** - How you envision it working
4. **Alternatives** - Any alternative approaches considered

## Release Process

### Version Management

We use semantic versioning:

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

### Release Checklist

1. **Update version numbers**
2. **Update CHANGELOG.md**
3. **Run full test suite**
4. **Create release tag**
5. **Deploy to staging**
6. **Test in staging**
7. **Deploy to production**
8. **Monitor for issues**

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions
- Be patient and understanding

### Communication

- Use GitHub issues for bug reports and feature requests
- Use discussions for general questions
- Be clear and concise in communications
- Provide context when asking for help

## Recognition

### Contributors

All contributors are recognized in:

- README.md contributors section
- Release notes
- Annual contributor summary

### Recognition Criteria

- Code contributions
- Documentation improvements
- Bug reports
- Feature suggestions
- Community support

## Getting Help

### Resources

- **Documentation**: Check the `docs/` directory
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Wiki**: Check the project wiki for additional resources

### Contact

- **Maintainers**: Tag maintainainers in issues for urgent matters
- **Community**: Use discussions for general questions
- **Security**: Report security issues privately

## Development Tools

### Recommended IDE Setup

#### IntelliJ IDEA

1. Install Spring Boot plugin
2. Install Lombok plugin
3. Configure code style settings
4. Set up code formatting

#### VS Code

1. Install Java Extension Pack
2. Install Spring Boot Extension Pack
3. Install ESLint and Prettier extensions
4. Configure settings.json

### Useful Extensions

- **SonarLint** - Code quality analysis
- **GitLens** - Git integration
- **Rainbow Brackets** - Bracket matching
- **Auto Rename Tag** - HTML/XML tag renaming

## Performance Guidelines

### Backend Performance

- Use appropriate database indexes
- Implement pagination for large datasets
- Cache frequently accessed data
- Optimize database queries
- Monitor application performance

### Frontend Performance

- Implement code splitting
- Use React.memo for expensive components
- Optimize bundle size
- Implement lazy loading
- Monitor Core Web Vitals

## Security Guidelines

### Backend Security

- Validate all input data
- Use parameterized queries
- Implement proper authentication
- Use HTTPS in production
- Keep dependencies updated

### Frontend Security

- Sanitize user input
- Use Content Security Policy
- Implement proper authentication
- Validate data on client side
- Keep dependencies updated

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Java version compatibility
   - Verify Maven dependencies
   - Clean and rebuild project

2. **Database Issues**
   - Check database connection
   - Verify schema is up to date
   - Check database permissions

3. **Frontend Issues**
   - Clear node_modules and reinstall
   - Check Node.js version
   - Verify environment variables

### Getting Help

1. **Check Documentation** - Look in the `docs/` directory
2. **Search Issues** - Check existing GitHub issues
3. **Ask Questions** - Use GitHub Discussions
4. **Contact Maintainers** - Tag maintainers for urgent issues

Thank you for contributing to Ystore! Your contributions help make this project better for everyone.
