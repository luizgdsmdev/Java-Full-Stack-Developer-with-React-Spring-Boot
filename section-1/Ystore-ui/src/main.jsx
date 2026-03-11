import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import AboutPage from './components/about/AboutPage.jsx';
import Contact from './components/contact/Contact.jsx';
import Login from './components/login/Login.jsx';
import Cart from './components/cart/Cart.jsx';
import Home from './components/homePage/Home.jsx';
import PageNotFund from './components/pageNotFund/PageNotFund.jsx';
import { fetchProductsAPI } from './API/product/ProductFetch.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Try 2x on fail
      staleTime: 1000 * 60, // 1 minute of fresh cache
      gcTime: 1000 * 60 * 5, // Garbage collect after 5 minutes
    },
  },
});

// Loader for home page to fetch products
const homeLoader = async () => {
  const products = await fetchProductsAPI();
  return products;
};

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFund />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={reactRouter} />
    </QueryClientProvider>
  </StrictMode>,
)
