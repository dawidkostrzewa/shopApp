import { createContext, useContext, useState, useEffect } from 'react'
import { fetchData } from '../Components/API/API';
import { SxProps } from '@mui/material';

const primary = {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
};



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
    // color: 'text.secondary',
    height: 100,
    overflow: 'hidden',


}

export const ContainerLogin: SxProps = {
    height: '70vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
}

export const BoxLogin: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 10px 1px  #ddd',
    padding: '20px',
    borderRadius: '5px',
    '& .MuiTextField-root': { m: 1, width: '40ch' }
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

export const StyleColors = {
    // Text colors
    // colorText: '#333',
    // colorSubtitle: '#333',
    // colorDisabled: '#333',
    // colorNav: '#00000099',

    // // Background colors
    // bgPrimary: '#ffffff',
    // bgSecondary: '#f5f5f5',
    // bgHover: "#eee",
    // //Button 
    // colorBtn: '#1871c2',
    // colorBtnHover: '#185EA5'

} as const;




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