import Style from './App.module.scss';
import { useState } from 'react';
import Home from './Components/Step/Home/Home';
// import Header from './Components/Header/Header';
import Store from './Components/Step/Store/Store';
import Cart from './Components/Step/Cart/Cart';
import Nav from './Components/Nav/Nav';

function App() {
  const [currentStep, setCurrentStep] = useState<string>('Home');

  const getStepComponent = () => {
    switch (currentStep) {
      case 'Home':
        return <Home />;
      case 'Store':
        return <Store />;
      case 'Cart':
        return <Cart />;
      // case 'Store':
      //   return <Store />;
    }
  };

  return (
    <>
      <div className={Style.wrap}>
        <h1 className={Style.title}>Mantine</h1>
        <Nav setCurrentStep={setCurrentStep} />
      </div>
      <div>{getStepComponent()}</div>
    </>
  );
}

export default App;
