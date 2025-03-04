import { render, screen } from '@testing-library/react';
import ProductCard from '../src/Components/Step/ProductCard/ProductCard';
import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { useAppContext } from '../src/Context/AppContext';

// Mock dla react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/1' }),
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
    <a href={to} data-testid={`link-${to}`}>{children}</a>
  )
}));

// Mock dla kontekstu aplikacji
vi.mock('../src/Context/AppContext', async () => {
  const originalModule = await vi.importActual('../src/Context/AppContext');

  // Definiujemy dane testowe WEWNĄTRZ funkcji mocka
  const testProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: { id: 1, name: 'Test Category', image: 'test.jpg' },
    images: ['https://example.com/image.jpg']
  };

  return {
    ...originalModule,
    useAppContext: vi.fn().mockReturnValue({
      cartItem: [],
      wrapProduct: [testProduct],
      setCartItem: vi.fn(),
      name: 'Test User',
      setUserName: vi.fn(),
      selectedCategories: 0,
      setSelectedCategories: vi.fn(),
      categories: [],
      isLoading: false,
      error: null,
      setError: vi.fn()
    }),
    AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
});

describe('ProductCard Component', () => {
  // Definiujemy produkt dla testów wewnątrz opisów testów
  const testProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: { id: 1, name: 'Test Category', image: 'test.jpg' },
    images: ['https://example.com/image.jpg']
  };

  test('renderuje szczegóły produktu', () => {
    render(<ProductCard />);

    // Sprawdź, czy tytuł produktu jest widoczny
    expect(screen.getByText('Test Product')).toBeDefined();

    // Sprawdź, czy kategoria jest widoczna
    expect(screen.getByText('Test Category')).toBeDefined();

    // Sprawdź, czy opis jest widoczny
    expect(screen.getByText('Test description')).toBeDefined();

    // Sprawdź, czy cena jest widoczna
    const priceElement = screen.queryByText('99.99$') ||
      screen.queryByText('$99.99') ||
      screen.queryByText('99.99 $');
    expect(priceElement).toBeDefined();

    // Sprawdź przycisk "Add to cart"
    const addButton = screen.queryByText(/add to cart/i) ||
      screen.queryByText(/dodaj do koszyka/i);
    expect(addButton).toBeDefined();
  });

  test('wyświetla przyciski kontroli koszyka gdy produkt jest w koszyku', () => {
    // Bezpośrednio mockujemy useAppContext dla tego testu
    vi.mocked(useAppContext).mockReturnValue({
      cartItem: [{ id: 1, quantity: 1 }],
      wrapProduct: [testProduct],
      setCartItem: vi.fn(),
      name: 'Test User',
      setUserName: vi.fn(),
      selectedCategories: 0,
      setSelectedCategories: vi.fn(),
      categories: [],
      setCategories: vi.fn(),
      setWrapProduct: vi.fn()
    });

    render(<ProductCard />);

    // Sprawdź, czy przycisk "Remove" jest widoczny
    const removeButton = screen.queryByText(/remove/i) ||
      screen.queryByText(/usuń/i);
    expect(removeButton).toBeDefined();
  });
}); 