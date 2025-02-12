import { createContext, useContext, useState, useEffect } from 'react'
import { fetchData } from '../Components/API/API';
import { SxProps } from '@mui/material';



export const CartStyle: SxProps = {
    width: 300,
    height: 'fit-content',
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0px 0px 10px 0.1px #eee',
    margin: '20px auto',
}

export const TitleStyle: SxProps = {
    margin: '5px 0 ',
    whiteSpace: 'nowrap',
    fontSize: `clamp(12px, 100%, 20px)`,
    textShadow: '.1px .1px '
}
export const DescriptionStyle: SxProps = {
    height: 100,
    overflow: 'hidden',
}

export const ContainerLogin: SxProps = {
    height: '70vh',
    maxWidth: '95vw',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5px'
}

export const BoxLogin: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    width: { xs: '100%', sm: 'auto' },
    maxWidth: '95vw',
    minWidth: { xs: 'auto', sm: '370px' },
    boxShadow: '0 0 10px 1px  #ddd',
    padding: { xs: '15px 5px', sm: '20px' },
    borderRadius: '5px',
    overflow: 'hidden',
    '& .MuiTextField-root': { width: '100%' }
}

export const wrapTextField: SxProps = {
    width: '100%', padding: '5px 0'
}

export const CartCategory: SxProps = {
    width: '250px',
    height: '400px',
    borderRadius: 3,
    padding: '30px 15px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    boxShadow: '0px 0px 10px 0.1px #eee',
    margin: '20px auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
}

export const Subtitle: SxProps = {
    fontSize: '24px',
    color: "text.primary"

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
    cartItem: CartItem[],
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>
    selectedCategories: number,
    setSelectedCategories: (setSelectedCategories: number) => void
    categories: Product['category'][],
    setCategories: (categories: Product['category'][]) => void,
    wrapProduct: Product[],
    setWrapProduct: (wrapProduct: Product[]) => void,

}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState('Jarosław');
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const [selectedCategories, setSelectedCategories] = useState(0);
    const [categories, setCategories] = useState<Product['category'][]>([]);
    const [wrapProduct, setWrapProduct] = useState<Product[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData('categories');
                setCategories(result);
            } catch (error) {
                console.error('An error occurred while retrieving data:', error);
                throw error;
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData(selectedCategories === 0 ? 'products' : `products/?categoryId=${selectedCategories}`);
                setWrapProduct(result);
            } catch (error) {
                console.error('An error occurred while retrieving data:', error);
                throw error;
            }
        };
        loadData();
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