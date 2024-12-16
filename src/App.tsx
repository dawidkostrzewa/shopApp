// import Style from './App.module.scss';

import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import HomeProductCard from './Components/Step/ProductCard/ProductCard';

import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { useState } from 'react';



export type ShoppingCart = { id: number; quantity: number }[];

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
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([])


  // console.log(shoppingCart.map((e) => e.quantity))

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
        <Route path="Home" element={<Home />} />
        <Route path="Store" element={<Store shoppingCart={shoppingCart} statusCart={statusCart} />} />
        <Route path="Cart" element={<Cart shoppingCart={shoppingCart} statusCart={statusCart} />} />
        <Route path=":id" element={<HomeProductCard shoppingCart={shoppingCart} statusCart={statusCart} />} />
      </Route>
    </Routes>
  );
}
export default App;


