
import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import HomeProductCard from './Components/Step/ProductCard/ProductCard';
import Sign from './Components/Step/SingIn/SingIn';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';

import { AppProvider } from './Context/AppContext';

// TODO: change to CartItem
// export type ShoppingCart = { id: number; quantity: number };

// const Layout = ({ totalQuantity }: { totalQuantity: number }) => {
const Layout = () => {

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <Header />
      {/* <Header totalQuantity={totalQuantity} /> */}
      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    </div>
  );
};



function App() {

  // TODO: przenieść do Context !!!!!!!!!!!!!!!!!!!!!!!!!!!


  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Store" element={<Store />} />
          <Route path="Cart" element={<Cart />} />
          <Route path=":id" element={<HomeProductCard />} />
          <Route path="Sign" element={<Sign />} />
        </Route>

      </Routes>
    </AppProvider>
  );
}
export default App;


