
import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import HomeProductCard from './Components/Step/ProductCard/ProductCard';
import Sign from './Components/Step/Sign/Sign';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { useState } from 'react';

// TODO: change to CartItem
export type ShoppingCart = { id: number; quantity: number };

const Layout = ({ shoppingCart }: { shoppingCart: ShoppingCart }) => {

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <Header shoppingCart={shoppingCart} />
      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    </div>
  );
};



function App() {

  // TODO: przenieść do Context
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number>(0);


  const updateCart = (id: number, updateAction: "PLUS" | "MINUS" | "DELETE") => {
    const updatedShoppingCart = [...shoppingCart];

    const itemInCartIndex = updatedShoppingCart.findIndex(cI => cI.id === id);

    // Item nie znaleziono
    if (itemInCartIndex === -1) {
      const newCarItem:ShoppingCart = {id: id, quantity: 1}
      setShoppingCart(prev => [...prev, newCarItem])
      return;
    }

    if (updateAction === 'PLUS') {
      const findedElement = updatedShoppingCart[itemInCartIndex]
      findedElement.quantity = findedElement.quantity + 1
      setShoppingCart(updatedShoppingCart);
      return;
    }

    if (updateAction === 'MINUS') {
      const findedElement = updatedShoppingCart[itemInCartIndex]
      findedElement.quantity = findedElement.quantity - 1;

      if (findedElement.quantity <= 0) {
        const newCart = updatedShoppingCart.filter(cI => cI.id !== id)
        setShoppingCart(newCart);
        return
      }

      setShoppingCart(updatedShoppingCart);
      return;
    }

    if (updateAction === 'DELETE') {
      const newCart = updatedShoppingCart.filter(cI => cI.id !== id)
      setShoppingCart(newCart);
      return
    }
  }

  const statusCart = (e: number, updateQuantity: number) => {
    if (updateQuantity === 1) {
      setShoppingCart(prevCart =>
        prevCart
          .map(item =>
            item.id === e
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0)
      );
    } else if (updateQuantity === 0) {
      setShoppingCart(prevCart =>
        prevCart.filter(item => item.id !== e)
      );

    }
    else {
      setShoppingCart((prevCart: ShoppingCart) => {
        if (prevCart?.some(item => item.id === e)) {
          return (
            prevCart.map(item =>
              item.id === e
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ))
        } else {
          return [...prevCart, { id: e, quantity: 1 }]
        }

      }
      );
    }
  }



  return (
    <Routes>
      <Route path="/" element={<Layout shoppingCart={shoppingCart} />}>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home setSelectedCategories={setSelectedCategories} />} />
        <Route path="Store" element={<Store shoppingCart={shoppingCart} statusCart={statusCart} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />} />
        <Route path="Cart" element={<Cart shoppingCart={shoppingCart} statusCart={statusCart} updateCart={updateCart} />} />
        <Route path=":id" element={<HomeProductCard shoppingCart={shoppingCart} statusCart={statusCart} />} />
        <Route path="Sign" element={<Sign />} />
      </Route>
    </Routes>
  );
}
export default App;


