
import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import HomeProductCard from './Components/Step/ProductCard/ProductCard';
import Sign from './Components/Step/SingIn/SingIn';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { useState } from 'react';

// TODO: change to CartItem
export type ShoppingCart = { id: number; quantity: number };

const Layout = ({ totalQuantity }: { totalQuantity: number }) => {

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <Header totalQuantity={totalQuantity} />
      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    </div>
  );
};



function App() {

  // TODO: przenieść do Context !!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number>(0);


  const updateCart = (id: number, updateAction: "PLUS" | "MINUS" | "DELETE") => {
    const updatedShoppingCart = [...shoppingCart];

    const itemInCartIndex = updatedShoppingCart.findIndex(cI => cI.id === id);

    // Item nie znaleziono
    if (itemInCartIndex === -1) {
      const newCarItem: ShoppingCart = { id: id, quantity: 1 }
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
  const totalQuantity: number = shoppingCart
    .map((item) => item.quantity)
    .reduce((acc: number, curr: number) => acc + curr, 0);


  return (
    <Routes>
      <Route path="/" element={<Layout totalQuantity={totalQuantity} />}>
        <Route index element={<Home setSelectedCategories={setSelectedCategories} />} />
        <Route path="Home" element={<Home setSelectedCategories={setSelectedCategories} />} />
        <Route path="Store" element={<Store updateCart={updateCart} shoppingCart={shoppingCart} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />} />
        <Route path="Cart" element={<Cart shoppingCart={shoppingCart} updateCart={updateCart} />} />
        <Route path=":id" element={<HomeProductCard updateCart={updateCart} shoppingCart={shoppingCart} />} />
        <Route path="Sign" element={<Sign />} />
      </Route>
    </Routes>
  );
}
export default App;


