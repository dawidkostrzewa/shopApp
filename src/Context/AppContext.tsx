import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../Components/API/API';
import { SxProps } from '@mui/material';


export const CartStyle: SxProps = {
    maxWidth: 300,
    height: 'fit-content',
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0px 0px 10px 0.1px #eee',
    margin: '20px auto',
}

export const TitleStyle: SxProps = {
    margin: '5px 0 ',
    color: '#333'
}
export const DescriptionStyle: SxProps = {
    color: 'text.secondary',
    height: 100,
    overflow: 'hidden',
    flex: 1
}



export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

export type CartProductBase = {
    id: number;
    title?: string,
    price?: number,
    images?: string[]
}
export type CartItem = CartProductBase & {
    quantity: number
};

type AppContextProps = {
    name: string,
    setUserName: (name: string) => void,
    // TODO: change to CartItem
    // // export type ShoppingCart
    cartItem: CartItem[],
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>
    selectedCategories: number,
    setSelectedCategories: (setSelectedCategories: number) => void
    categories: Product['category'][],
    setCategories: (categories: Product['category'][]) => void,
    wrapProduct: Product[],
    setWrapProduct: (wrapProduct: Product[]) => void

}


export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState('Jarosław');
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const [selectedCategories, setSelectedCategories] = useState(0);
    const [categories, setCategories] = useState<Product['category'][]>([]);
    const [wrapProduct, setWrapProduct] = useState<Product[]>([]);



    useEffect(() => {
        //TODO: uzyc async/await
        api('categories').then((result) => {
            setCategories(result);
        });
    }, []);
    useEffect(() => {
        api(selectedCategories === 0 ? 'products' : `products/?categoryId=${selectedCategories}`).then((result) => {
            setWrapProduct(result);
        });
    }, [selectedCategories]);

    return (
        <AppContext.Provider
            value={{
                name: userName,
                setUserName: setUserName,
                cartItem: cartItem,
                setCartItem: setCartItem,
                selectedCategories: selectedCategories,
                setSelectedCategories: setSelectedCategories,
                categories: categories,
                setCategories: setCategories,
                wrapProduct: wrapProduct,
                setWrapProduct: setWrapProduct,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}



export const useAppContext = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useAppContext must be used within AppContextProvider')
    }
    return context
}