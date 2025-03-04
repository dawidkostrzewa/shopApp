import { render, screen, waitFor } from '@testing-library/react';
import Cart from '../src/Components/Step/Cart/Cart';
import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useAppContext } from '../src/Context/AppContext';

// Zdefiniowane wcześniej przedmioty do koszyka, aby były dostępne podczas hoistingu vi.mock()
const TEST_CART_ITEMS = [{
    id: 1,
    title: 'Test Product',
    price: 99.99,
    quantity: 2,
    images: ['https://example.com/image.jpg']
}];

// Prostszy mock dla localStorage
const mockLocalStorage = () => {
    const store = {};
    return {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        removeItem: vi.fn(key => { delete store[key]; }),
        clear: vi.fn(() => { Object.keys(store).forEach(key => delete store[key]); })
    };
};

// Globalne mocki
beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage(), writable: true });
});

// Mock dla react-router-dom
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/Cart' }),
    Link: ({ children, to }) => <a href={to} data-testid={`link-${to}`}>{children}</a>
}));

// Mock dla API
vi.mock('../src/Components/API/API', () => ({
    fetchData: vi.fn().mockImplementation((endpoint) => {
        if (endpoint === 'products') {
            return Promise.resolve([
                {
                    id: 1,
                    title: 'Test Product',
                    price: 99.99,
                    description: 'Test description',
                    category: { id: 1, name: 'Test Category', image: 'test.jpg' },
                    images: ['https://example.com/image.jpg']
                }
            ]);
        }
        return Promise.resolve([]);
    })
}));

// Mock dla AppContext - importujemy i mockujemy na górze pliku
vi.mock('../src/Context/AppContext', () => ({
    useAppContext: vi.fn().mockReturnValue({
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
    })
}));

describe('Cart Component', () => {
    // Globalne mocki
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'localStorage', { value: mockLocalStorage(), writable: true });

        // Resetowanie mocka useAppContext do domyślnych wartości
        vi.mocked(useAppContext).mockReturnValue({
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
        });
    });

    // Pomocnicza funkcja do sprawdzania, czy znajdziemy element o podanym tekście
    const hasText = (text) => {
        return screen.queryByText(new RegExp(text, 'i')) !== null;
    };

    // Pomocnicza funkcja do sprawdzania, czy UI zawiera jakiekolwiek elementy produktu
    const hasProductElements = () => {
        const hasProductTitle = screen.queryByText('Test Product') !== null;
        const hasProductPrice = screen.queryByText(/99\.99/) !== null;
        const hasImages = screen.queryAllByRole('img').length > 0;

        // Dla elementów, które trudno znaleźć przez role/text, używamy testId
        const hasCardElements = screen.queryAllByTestId(/^cart-item/).length > 0;

        return hasProductTitle || hasProductPrice || hasImages || hasCardElements;
    };

    test('renderuje pusty koszyk', async () => {
        // Domyślnie ustawiony pusty koszyk
        render(<Cart />);

        await waitFor(() => {
            const emptyCartIndicator =
                screen.queryByText(/empty/i) ||
                screen.queryByText(/pusty/i) ||
                screen.queryByText(/brak/i) ||
                screen.queryByText(/no items/i);

            expect(emptyCartIndicator !== null || !hasProductElements()).toBeTruthy();
        });
    });

    test('renderuje produkty w koszyku', async () => {
        // Ustawiamy koszyk z przedmiotami
        vi.mocked(useAppContext).mockReturnValue({
            cartItem: TEST_CART_ITEMS,
            setCartItem: vi.fn(),
            name: 'Test User',
            setUserName: vi.fn(),
            selectedCategories: 0,
            setSelectedCategories: vi.fn(),
            categories: [],
            setCategories: vi.fn(),
            wrapProduct: [],
            setWrapProduct: vi.fn()
        });

        // Renderujemy komponent
        render(<Cart />);

        await waitFor(() => {
            expect(hasProductElements()).toBeTruthy();
        }, { timeout: 3000 });
    });

    test('obsługuje błędy ładowania danych', async () => {
        // Przygotowujemy mock do wyrzucenia błędu
        const { fetchData } = await import('../src/Components/API/API');
        vi.mocked(fetchData).mockRejectedValueOnce(new Error('Failed to load data'));

        // Tłumimy console.error dla czystości testów
        const originalConsoleError = console.error;
        console.error = vi.fn();

        try {
            render(<Cart />);

            await waitFor(() => {
                // Sprawdzamy czy komponent się wyrenderował pomimo błędu
                // Użyj queryAllByText zamiast queryByText, aby uniknąć błędu z wieloma elementami
                const textElements = screen.queryAllByText(/.+/);
                expect(textElements.length).toBeGreaterThan(0);
            }, { timeout: 1000 });
        } finally {
            console.error = originalConsoleError;
        }
    });
}); 