# Frontend Architecture

This document provides detailed information about the React frontend architecture, configuration, and development guidelines.

## Technology Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.2.4** - Build tool and development server
- **Axios 1.13.5** - HTTP client for API communication
- **React Query (TanStack) 5.90.21** - Server state management
- **Lucide React 0.577.0** - Icon library
- **React Icons 5.6.0** - Additional icon collection
- **Font Awesome React 3.1.1** - Premium icons
- **ESLint 10.0.1** - Code quality and linting

## Project Structure

```
Ystore-ui/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── API/                    # API integration layer
│   │   ├── api.js              # Axios configuration
│   │   └── endpoints.js       # API endpoints
│   ├── components/             # Reusable React components
│   │   ├── common/            # Common UI components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── pages/                 # Page components
│   ├── styles/                # CSS and styling files
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript type definitions
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.js         # ESLint configuration
```

## Architecture Patterns

### Component-Based Architecture

The frontend follows a component-based architecture where the UI is broken down into reusable, self-contained components.

**Component Hierarchy:**

```
App
├── Layout
│   ├── Header
│   ├── Navigation
│   └── Footer
├── Pages
│   ├── Home
│   ├── Products
│   ├── ProductDetail
│   └── Cart
└── Components
    ├── ProductCard
    ├── ProductList
    ├── Button
    └── Modal
```

### State Management

#### Local State

Use React's built-in state management for component-specific state:

```typescript
import { useState, useEffect } from 'react';

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(product.id, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      {/* Component JSX */}
    </div>
  );
}
```

#### Server State

Use React Query for server state management:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct } from '../API/endpoints';

function ProductList() {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleCreateProduct = (productData) => {
    createProductMutation.mutate(productData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## API Integration

### Axios Configuration

```typescript
// src/API/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Endpoints

```typescript
// src/API/endpoints.js
import api from './api';

export const productAPI = {
  getAll: () => api.get('/v1/products'),
  getById: (id) => api.get(`/v1/products/${id}`),
  create: (data) => api.post('/v1/products', data),
  update: (id, data) => api.put(`/v1/products/${id}`, data),
  delete: (id) => api.delete(`/v1/products/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/v1/categories'),
  getById: (id) => api.get(`/v1/categories/${id}`),
  create: (data) => api.post('/v1/categories', data),
};
```

## Custom Hooks

### useApi Hook

```typescript
// src/hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../API/api';

export function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiFunction();
        if (isMounted) {
          setData(result.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}
```

### useLocalStorage Hook

```typescript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

## Styling

### CSS Architecture

The application uses a modular CSS architecture with CSS modules and utility classes.

```css
/* src/styles/components/ProductCard.module.css */
.productCard {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: transform 0.2s ease;
}

.productCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.productImage {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.productTitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 12px 0 8px 0;
  color: #333;
}

.productPrice {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
}
```

### Responsive Design

```css
/* src/styles/responsive.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .productGrid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .productGrid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
```

## Configuration

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
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
});
```

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks rules
- Use functional components with hooks
- Implement proper error boundaries
- Use descriptive component and variable names
- Keep components small and focused

### Component Best Practices

```typescript
// Good example
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
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>
      <div className="quantity-controls">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
```

## Testing

### Unit Testing with Vitest

```typescript
// src/components/__tests__/ProductCard.test.tsx
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

  it('calls onAddToCart when add to cart button is clicked', () => {
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

## Performance Optimization

### Code Splitting

```typescript
// Lazy loading components
import { lazy, Suspense } from 'react';

const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

const ProductList = memo(({ products, onAddToCart }) => {
  const expensiveCalculation = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  const handleAddToCart = useCallback((productId, quantity) => {
    onAddToCart(productId, quantity);
  }, [onAddToCart]);

  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  );
});
```

## Build and Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Environment Variables

```bash
# .env.development
VITE_API_URL=http://localhost:8080/api
VITE_APP_TITLE=Ystore Development

# .env.production
VITE_API_URL=https://api.ystore.com/api
VITE_APP_TITLE=Ystore
```

## Best Practices

1. **Type Safety**: Use TypeScript for all components and functions
2. **Performance**: Implement code splitting and memoization
3. **Accessibility**: Follow WCAG guidelines and use semantic HTML
4. **Error Handling**: Implement error boundaries and proper error states
5. **Testing**: Write comprehensive unit and integration tests
6. **Code Organization**: Follow a consistent folder structure
7. **State Management**: Use appropriate state management patterns
8. **Security**: Sanitize user inputs and implement proper authentication
