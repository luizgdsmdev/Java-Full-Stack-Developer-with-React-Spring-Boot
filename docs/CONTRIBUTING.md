# Contributing Guide

## Overview

Thank you for your interest in contributing to the Ystore Project! This guide provides comprehensive information on how to contribute to our full-stack e-commerce platform. We welcome contributions of all types, including code, documentation, bug reports, and feature suggestions.

## How to Contribute

### Ways to Contribute

1. **Report Bugs**: Help us identify and fix issues
2. **Suggest Features**: Propose new features and improvements
3. **Submit Pull Requests**: Contribute code and documentation
4. **Improve Documentation**: Help us keep documentation up-to-date
5. **Answer Questions**: Help other contributors in discussions
6. **Review Code**: Provide constructive feedback on pull requests

### Getting Started

1. **Fork the Repository**: Click the "Fork" button on GitHub
2. **Clone Your Fork**: Clone your fork to your local machine
3. **Set Up Development Environment**: Follow the setup instructions
4. **Create a Branch**: Create a feature branch for your changes
5. **Make Changes**: Implement your contribution
6. **Test Your Changes**: Ensure everything works correctly
7. **Submit Pull Request**: Open a pull request for review

## Development Setup

### Prerequisites

Before you start contributing, make sure you have the following installed:

- **Java 21** or higher
- **Maven 3.6** or higher
- **Node.js 18** or higher
- **npm 9** or higher
- **Git** for version control
- **IDE** (IntelliJ IDEA, VS Code, or similar)

### Local Development Setup

```bash
# 1. Clone your fork
git clone https://github.com/your-username/Java-Full-Stack-Developer-with-React-Spring-Boot.git
cd Java-Full-Stack-Developer-with-React-Spring-Boot

# 2. Add upstream repository
git remote add upstream https://github.com/luizgdsmdev/Java-Full-Stack-Developer-with-React-Spring-Boot.git

# 3. Start backend development environment
cd section-1/Ystore-backend
mvn clean install
mvn spring-boot:run

# 4. Start frontend development environment (in another terminal)
cd section-1/Ystore-ui
npm install
npm run dev

# 5. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Environment Variables

```bash
# Database Configuration (for MySQL)
MYSQL_DATABASE=ystore
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_PORT=3306

# Spring Boot Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ystore
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password

# For H2 (in-memory database)
SPRING_DATASOURCE_URL=jdbc:h2:mem:testdb
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=password
```

### Development Workflow

```bash
# 1. Create and switch to a new branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# Edit files, add new features, fix bugs, etc.

# 3. Test your changes
cd section-1/Ystore-backend && mvn test
cd ../section-1/Ystore-ui && npm test

# 4. Commit your changes
git add .
git commit -m "feat: add new feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Create a pull request
# Visit GitHub and create a pull request from your branch
```

## Code Standards

### Backend (Java/Spring Boot)

#### Code Style

We follow Google Java Style Guide with some modifications:

```java
// Package declaration
package com.ystore.controller;

// Imports (grouped and sorted)
import com.ystore.service.ProductService;
import com.ystore.dto.ProductCreateDTO;
import com.ystore.dto.ProductResponseDTO;

// Class documentation
/**
 * Controller for managing product operations.
 * 
 * @author Your Name
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/products")
@Validated
public class ProductController {

    // Constants
    private static final String PRODUCT_NOT_FOUND = "Product not found";
    
    // Dependencies (injected via constructor)
    private final ProductService productService;

    // Constructor injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Methods with proper documentation
    /**
     * Creates a new product.
     * 
     * @param productCreateDTO the product creation data
     * @return the created product
     */
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @Valid @RequestBody ProductCreateDTO productCreateDTO) {
        ProductResponseDTO createdProduct = productService.createProduct(productCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
}
```

#### Naming Conventions

- **Classes**: PascalCase (e.g., `ProductController`, `ProductService`)
- **Methods**: camelCase (e.g., `createProduct`, `findById`)
- **Variables**: camelCase (e.g., `productService`, `productDto`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `PRODUCT_NOT_FOUND`)
- **Packages**: lowercase with dots (e.g., `com.ystore.controller`)

#### Package Structure

Follow the existing package structure:

```text
com.ystore/
├── config/        # Configuration classes
├── controller/    # REST Controllers
├── dto/           # Data Transfer Objects
├── entity/        # JPA Entities
├── repository/    # JPA Repositories
├── service/       # Business Logic
└── exception/     # Custom Exceptions
```

#### Testing Standards

```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    @DisplayName("Should create product successfully")
    void shouldCreateProductSuccessfully() {
        // Given
        ProductCreateDTO productCreateDTO = new ProductCreateDTO(
            "Test Product", 
            "Test Description", 
            99.99
        );
        
        Product expectedProduct = new Product();
        expectedProduct.setName("Test Product");
        expectedProduct.setDescription("Test Description");
        expectedProduct.setPrice(99.99);
        
        when(productRepository.save(any(Product.class))).thenReturn(expectedProduct);

        // When
        ProductResponseDTO result = productService.createProduct(productCreateDTO);

        // Then
        assertThat(result.getName()).isEqualTo("Test Product");
        assertThat(result.getPrice()).isEqualTo(99.99);
        verify(productRepository).save(any(Product.class));
    }
}
```

### Frontend (React/TypeScript)

#### Code Style

We follow Airbnb JavaScript Style Guide:

```tsx
// Component structure
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';

import Button from '../shared/button/Button';
import Loading from '../shared/loading/Loading';

/**
 * Product card component
 * @param {Object} props - Component props
 * @param {Product} props.product - Product data
 * @param {Function} props.onAddToCart - Add to cart handler
 */
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
  });

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch products:', error);
    }
  }, [error]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await onAddToCart(product.id, quantity);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="error">Failed to load product</div>;

  return (
    <div className="product-card">
      <h2 className="product-card__name">{product.name}</h2>
      <p className="product-card__price">${product.price}</p>
      <Button onClick={handleAddToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
```

#### Component Structure

```text
src/
├── components/
│   ├── shared/
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── loading/
│   │       ├── Loading.tsx
│   │       ├── Loading.module.css
│   │       ├── Loading.test.tsx
│   │       └── index.ts
│   └── pages/
│       └── products/
│           ├── Products.tsx
│           ├── Products.module.css
│           ├── Products.test.tsx
│           └── index.ts
├── hooks/
├── services/
├── types/
└── utils/
```

#### Testing Standards

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

// Test wrapper
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </BrowserRouter>
);

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    description: 'Test Description',
  };

  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  test('calls onAddToCart when button is clicked', async () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </TestWrapper>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockOnAddToCart).toHaveBeenCalledWith(1, 1);
    });
  });
});
```

## Commit Guidelines

### Commit Message Format

We follow Conventional Commits specification:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples

```bash
feat(products): add product search functionality
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
style(frontend): fix linting errors in product card
refactor(database): optimize product query performance
test(backend): add unit tests for order service
chore(deps): update spring boot version
```

### Commit Message Guidelines

1. **Use the present tense**: "add feature" not "added feature"
2. **Use the imperative mood**: "move cursor to..." not "moves cursor to..."
3. **Limit the subject line to 50 characters**
4. **Capitalize the subject line**
5. **Do not end the subject line with a period**
6. **Use the body to explain what and why vs. how**
7. **Wrap the body at 72 characters**

## Testing Guidelines

### Backend Testing

#### Unit Tests

```bash
# Run all tests
cd section-1/Ystore-backend
mvn test

# Run specific test class
mvn test -Dtest=ProductServiceTest

# Run tests with coverage
mvn jacoco:report

# Run integration tests
mvn test -Pintegration-test
```

#### Test Coverage

- **Minimum coverage**: 80% for new code
- **Critical paths**: 100% coverage required
- **Business logic**: High coverage priority
- **Utility classes**: High coverage priority

### Frontend Testing

#### Unit Tests

```bash
# Run all tests
cd section-1/Ystore-ui
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ProductCard.test.tsx
```

#### Test Types

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test user workflows (planned)

### Testing Best Practices

1. **Write tests before code** (TDD when possible)
2. **Test edge cases and error conditions**
3. **Keep tests simple and focused**
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Maintain test independence**

## Bug Reports

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Actual Behavior**
A clear and concise description of what actually happened.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**
- OS: [e.g. Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional Context**
Add any other context about the problem here.
```

### Bug Reporting Guidelines

1. **Search existing issues**: Check if the bug has already been reported
2. **Use the template**: Fill out all sections of the bug report template
3. **Be specific**: Provide detailed information about the issue
4. **Include steps to reproduce**: Make it easy for us to reproduce the issue
5. **Provide environment details**: Include OS, browser, and version information

## Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve? What pain points does it address?

**Proposed Solution**
How do you envision this feature working? What would the user experience be?

**Alternatives Considered**
What other approaches have you considered? Why did you choose this one?

**Additional Context**
Add any other context, mockups, or examples about the feature request.
```

### Feature Request Guidelines

1. **Search existing requests**: Check if the feature has already been requested
2. **Use the template**: Fill out all sections of the feature request template
3. **Explain the problem**: Clearly explain what problem this feature solves
4. **Provide context**: Include any relevant background information
5. **Be realistic**: Consider the scope and complexity of the feature

## Pull Request Process

### Pull Request Template

```markdown
**Description**
Brief description of changes made in this pull request.

**Type of Change**
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

**Testing**
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing completed (for frontend changes)

**Checklist**
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
```

### Pull Request Guidelines

1. **Use descriptive titles**: Make it clear what the PR does
2. **Link to issues**: Reference any related issues
3. **Include tests**: Ensure your changes are properly tested
4. **Update documentation**: Keep documentation up-to-date
5. **Keep PRs focused**: One PR should address one issue or feature
6. **Respond to feedback**: Address reviewer comments promptly

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Maintainers review the code for quality and correctness
3. **Approval**: At least one maintainer must approve the PR
4. **Merge**: PR is merged after approval and all checks pass

## Documentation Guidelines

### Code Documentation

#### Java Documentation

```java
/**
 * Service for managing product operations.
 * 
 * <p>This service provides methods for creating, updating, and retrieving products.
 * It follows the business rules defined in the domain layer.</p>
 * 
 * @author Your Name
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
public class ProductService {
    
    /**
     * Creates a new product.
     * 
     * @param productCreateDTO the product creation data
     * @return the created product
     * @throws BusinessException if product with name already exists
     */
    public ProductResponseDTO createProduct(ProductCreateDTO productCreateDTO) {
        // Implementation
    }
}
```

#### TypeScript Documentation

```tsx
/**
 * Product card component
 * 
 * Displays product information and provides options to add to cart.
 * Automatically fetches product data when component mounts.
 * 
 * @param {Object} props - Component props
 * @param {Product} props.product - The product to display
 * @param {Function} props.onAddToCart - Callback function when add to cart button is clicked
 * @returns {JSX.Element} The product card component
 */
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Implementation
}
```

### README Documentation

- **Keep it up-to-date**: Update documentation when code changes
- **Be comprehensive**: Include all necessary information
- **Use examples**: Provide code examples where helpful
- **Include screenshots**: Add visual documentation for UI components
- **Link to resources**: Reference other documentation as needed

## Security Guidelines

### Secure Coding Practices

1. **Input validation**: Validate all user inputs
2. **SQL injection prevention**: Use parameterized queries
3. **XSS prevention**: Sanitize user-generated content
4. **Authentication**: Implement proper authentication mechanisms
5. **Authorization**: Check user permissions for sensitive operations
6. **Data encryption**: Encrypt sensitive data at rest and in transit

### Security Checklist

- [ ] No hardcoded secrets or credentials
- [ ] Proper input validation implemented
- [ ] SQL injection vulnerabilities addressed
- [ ] XSS vulnerabilities addressed
- [ ] Authentication and authorization implemented
- [ ] Sensitive data encrypted
- [ ] Dependencies are up-to-date
- [ ] Security headers configured

## Release Process

### Versioning

We follow Semantic Versioning (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. **Code Review**: All changes reviewed and approved
2. **Tests**: All tests passing
3. **Documentation**: Documentation updated
4. **Security**: Security review completed
5. **Performance**: Performance testing completed
6. **Changelog**: Update CHANGELOG.md
7. **Version bump**: Update version numbers
8. **Tag**: Create release tag
9. **Deploy**: Deploy to production

## Getting Help

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Email**: For private or sensitive matters

### Resources

- **Project Documentation**: [docs/](./)
- **API Documentation**: [API.md](./API.md)
- **Backend Documentation**: [BACKEND.md](./BACKEND.md)
- **Frontend Documentation**: [FRONTEND.md](./FRONTEND.md)
- **Database Documentation**: [DATABASE.md](./DATABASE.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## Recognition

### Contributor Recognition

We value all contributions and recognize contributors in various ways:

1. **Contributors List**: All contributors are listed in our README
2. **Release Notes**: Contributors are mentioned in release notes
3. **Hall of Fame**: Significant contributors are highlighted in our documentation
4. **Community Recognition**: Outstanding contributors may receive special recognition

### Types of Contributions

All contributions are valuable, including:

- **Code contributions**: New features, bug fixes, performance improvements
- **Documentation**: Improving documentation, writing guides
- **Testing**: Writing tests, improving test coverage
- **Design**: UI/UX improvements, graphics, icons
- **Community**: Answering questions, reviewing pull requests
- **Translation**: Adding or improving translations

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone, regardless of:

- **Experience level**: From beginners to experts
- **Background**: Personal, professional, or cultural
- **Identity**: Gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality

### Expected Behavior

- **Be respectful**: Treat others with respect and consideration
- **Be inclusive**: Welcome and include all participants
- **Be constructive**: Provide helpful and constructive feedback
- **Be collaborative**: Work together to achieve common goals
- **Be professional**: Maintain professional conduct at all times

### Unacceptable Behavior

- **Harassment**: Any form of harassment is unacceptable
- **Discrimination**: No discrimination of any kind
- **Personal attacks**: No personal attacks or insults
- **Spam**: No spam or irrelevant content
- **Disruption**: No disruptive behavior

### Reporting Issues

If you experience or witness unacceptable behavior, please:

1. **Report privately**: Send a private message to project maintainers
2. **Provide details**: Include specific details about the incident
3. **Be prompt**: Report issues as soon as possible

### Enforcement

Project maintainers reserve the right to:

- **Remove comments**: Remove inappropriate comments
- **Issue warnings**: Issue warnings for inappropriate behavior
- **Temporarily ban**: Temporarily ban repeat offenders
- **Permanently ban**: Permanently ban serious or repeat offenders

---

Thank you for contributing to Ystore! Your contributions help make this project better for everyone.
