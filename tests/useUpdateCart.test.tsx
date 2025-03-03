import { renderHook, act } from '@testing-library/react';
import { useUpdateCart } from '../src/Components/UpdateCart/useUpdateCart';
import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock dla AppContext - używa wyłącznie używanych właściwości
vi.mock('../src/Context/AppContext', async () => {
  const originalModule = await vi.importActual('../src/Context/AppContext');
  
  // Definiujemy dane testowe WEWNĄTRZ funkcji mocka
  const mockCartItem = [
    { id: 1, quantity: 2, title: 'Test Product', price: 99.99 }
  ];
  
  const mockSetCartItem = vi.fn();
  
  return {
    ...originalModule,
    useAppContext: vi.fn().mockReturnValue({
      cartItem: mockCartItem,
      setCartItem: mockSetCartItem,
      // Inne właściwości nie są używane w useUpdateCart
      name: 'Test User',
      setUserName: vi.fn(),
      selectedCategories: 0,
      setSelectedCategories: vi.fn(),
      categories: [],
      setCategories: vi.fn(),
      wrapProduct: [],
      setWrapProduct: vi.fn()
    }),
    AppProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
  };
});

describe('useUpdateCart Hook', () => {
  let mockSetCartItem: ReturnType<typeof vi.fn>;
  
  beforeEach(async () => {
    mockSetCartItem = vi.fn();
    
    // Importujemy i mockujemy
    const { useAppContext } = await import('../src/Context/AppContext');
    
    vi.mocked(useAppContext).mockReturnValue({
      cartItem: [{ id: 1, quantity: 2, title: 'Test Product', price: 99.99 }],
      setCartItem: mockSetCartItem,
      name: 'Test User',
      setUserName: vi.fn(),
      selectedCategories: 0,
      setSelectedCategories: vi.fn(),
      categories: [],
      setCategories: vi.fn(),
      wrapProduct: [],
      setWrapProduct: vi.fn()
    });
  });

  test('dodaje nowy produkt do koszyka', () => {
    const { result } = renderHook(() => useUpdateCart());

    act(() => {
      result.current({
        id: 2,
        title: 'New Product',
        price: 49.99,
        images: ['image.jpg'],
        updateAction: 'PLUS'
      });
    });

    // Sprawdź, czy setCartItem został wywołany z nowym produktem
    expect(mockSetCartItem).toHaveBeenCalled();
  });

  test('zwiększa ilość produktu w koszyku', () => {
    const { result } = renderHook(() => useUpdateCart());

    act(() => {
      result.current({
        id: 1,
        updateAction: 'PLUS'
      });
    });

    // Sprawdź, czy setCartItem został wywołany
    expect(mockSetCartItem).toHaveBeenCalled();
  });

  test('zmniejsza ilość produktu w koszyku', () => {
    const { result } = renderHook(() => useUpdateCart());

    act(() => {
      result.current({
        id: 1,
        updateAction: 'MINUS'
      });
    });

    // Sprawdź, czy setCartItem został wywołany
    expect(mockSetCartItem).toHaveBeenCalled();
  });

  test('usuwa produkt z koszyka przy akcji DELETE', () => {
    const { result } = renderHook(() => useUpdateCart());

    act(() => {
      result.current({
        id: 1,
        updateAction: 'DELETE'
      });
    });

    // Sprawdź, czy setCartItem został wywołany
    expect(mockSetCartItem).toHaveBeenCalled();
  });
}); 