import { vi } from 'vitest';
import React from 'react';

// Pomocnicza funkcja do mockowania localStorage
export const mockLocalStorage = (initialData = {}) => {
  const storageData = { ...initialData };
  
  // Implementacja mockowanego localStorage
  const localStorageMock = {
    getItem: vi.fn(key => {
      return storageData[key] ? JSON.stringify(storageData[key]) : null;
    }),
    setItem: vi.fn((key, value) => {
      storageData[key] = JSON.parse(value);
    }),
    removeItem: vi.fn(key => {
      delete storageData[key];
    }),
    clear: vi.fn(() => {
      Object.keys(storageData).forEach(key => {
        delete storageData[key];
      });
    })
  };
  
  // Zastąp globalny localStorage
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
  
  return localStorageMock;
};

// Pomocnicza funkcja do mockowania AppContext
export const mockAppContext = async (customContextValues = {}) => {
  const originalModule = await vi.importActual('../src/Context/AppContext');
  
  // Domyślne wartości dla kontekstu - zgodnie z faktyczną implementacją
  const defaultContextValues = {
    cartItem: [],
    setCartItem: vi.fn(),
    name: 'Test User',
    setUserName: vi.fn(),
    selectedCategories: 0,
    setSelectedCategories: vi.fn(),
    categories: [],
    setCategories: vi.fn(),
    wrapProduct: [],
    setWrapProduct: vi.fn()
  };
  
  return {
    ...originalModule,
    useAppContext: vi.fn().mockReturnValue({
      ...defaultContextValues,
      ...customContextValues
    }),
    AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
};

// Mock dla react-router-dom
export const mockReactRouter = (customRouterValues = {}) => {
  const defaultRouterValues = {
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
    useParams: () => ({}),
    Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
      <a href={to} data-testid={`link-${to}`}>{children}</a>
    )
  };
  
  return {
    ...defaultRouterValues,
    ...customRouterValues
  };
}; 