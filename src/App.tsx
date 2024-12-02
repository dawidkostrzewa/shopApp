// import Style from './App.module.scss';

import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';

import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';

const Layout = () => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
      share across all the pages on your site, like navigation. */}
      <Header />
      {/* An <Outlet> renders whatever child route is currently active,
      so you can think about this <Outlet> as a placeholder for
      the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Store" element={<Store />} />
        <Route path="Cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
export default App;

// function App() {
//   const [currentStep, setCurrentStep] = useState<string>('Home');

//   // Zmiana na routing
//   const getStepComponent = () => {
//     switch (currentStep) {
//       case 'Home':
//         return <Home />;
//       case 'Store':
//         return <Store />;
//       case 'Cart':
//         return <Cart />;
//       // case 'Store':
//       //   return <Store />;
//     }
//   };

//   return (
//     <>
//       <div className={Style.wrap}>
//         {/* <Typography /> */}
//         <h1 className={Style.title}>Mantine</h1>
//         <Nav setCurrentStep={setCurrentStep} />
//       </div>
//       <div>{getStepComponent()}</div>
//     </>
//   );
// }

// export default App;
