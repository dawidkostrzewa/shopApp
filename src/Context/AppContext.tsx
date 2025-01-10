import { createContext, useContext, useState } from 'react'



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

}


export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState('Jarosław');
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const [selectedCategories, setSelectedCategories] = useState(0);

    console.log(cartItem)

    return (
        <AppContext.Provider
            value={{
                name: userName,
                setUserName: setUserName,
                cartItem: cartItem,
                setCartItem: setCartItem,
                selectedCategories: selectedCategories,
                setSelectedCategories: setSelectedCategories
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