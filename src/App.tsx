
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Components/Step/Home/Home';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import Sign from './Components/Step/SingIn/SingIn';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import { AppProvider } from './Context/AppContext';
import ProductCard from './Components/Step/ProductCard/ProductCard';
import Registration from './Components/Step/SingIn/Registration';


const Layout = () => {

  return (
    <div >
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

const theme = createTheme({

  colorSchemes: {
    light: {
      palette: {

        secondary: {
          main: '#1976d2',
          dark: '#ddd',
        }
      },


    },
    dark: {
      palette: {
        text: {
          primary: '#eee',
          secondary: '#ddd',


        },
        background: {
          default: '#333', // Tło strony
          paper: '#333'     // Tło elementów takich jak karty
        },
        primary: {
          main: '#1769aa',
          light: '#lighter shade',
          dark: '#2196f3',
          contrastText: '#eee',
        },
        secondary: {
          main: '#ddd',
          dark: '#777',
        }


      },


    },
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  },


});




function App() {

  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Store" element={<Store />} />
            <Route path="Cart" element={<Cart />} />
            <Route path=":id" element={<ProductCard />} />
            <Route path="Sing" element={<Sign />} />
            <Route path="Registration" element={<Registration />} />
          </Route>
        </Routes>
      </AppProvider>
    </ThemeProvider>


  );
}
export default App;


{/*
   <AppProvider>
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="Home" element={<Home />} />
    <Route path="Store" element={<Store />} />
    <Route path="Cart" element={<Cart />} />
    <Route path=":id" element={<ProductCard />} />
    <Route path="Sing" element={<Sign />} />
    <Route path="Registration" element={<Registration />} />
  </Route>
</Routes>
</AppProvider >
 */}

