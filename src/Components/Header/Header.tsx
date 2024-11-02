// import React from 'react';
import Style from '../Header/Header.module.scss';
import Nav from '../Nav/Nav';

const Header = () => {
  return (
    <div className={Style.wrap}>
      <h1 className={Style.title}>Mantine</h1>
      <Nav />
    </div>
  );
};

export default Header;
