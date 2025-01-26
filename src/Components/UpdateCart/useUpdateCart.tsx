
import { useAppContext, CartItem, CartProductBase } from "../../Context/AppContext";


export type UpdateActon = CartProductBase & {
    updateAction: "PLUS" | "MINUS" | "DELETE",
}
export const useUpdateCart = () => {
    const { cartItem, setCartItem } = useAppContext();

    const updateCart = ({ id, updateAction, title, price, images }: UpdateActon) => {
        const updatedShoppingCart = [...cartItem];

        const itemInCartIndex = updatedShoppingCart.findIndex(cI => cI.id === id);

        // Item nie znaleziono
        if (itemInCartIndex === -1) {
            const newCarItem: CartItem = { id: id, quantity: 1, title: title, price: price, images: images }
            setCartItem(prev => [...prev, newCarItem]);
            return;
        }

        if (updateAction === 'PLUS') {
            const findedElement = updatedShoppingCart[itemInCartIndex];
            findedElement.quantity = findedElement.quantity + 1;
            setCartItem(updatedShoppingCart);
            return;
        }

        if (updateAction === 'MINUS') {
            const findedElement = updatedShoppingCart[itemInCartIndex];
            findedElement.quantity = findedElement.quantity - 1;

            if (findedElement.quantity <= 0) {
                const newCart = updatedShoppingCart.filter(cI => cI.id !== id);
                setCartItem(newCart);
                return;
            }

            setCartItem(updatedShoppingCart);
            return;
        }

        if (updateAction === 'DELETE') {
            const newCart = updatedShoppingCart.filter(cI => cI.id !== id);
            setCartItem(newCart);
            return;
        }
    };

    return updateCart;
};