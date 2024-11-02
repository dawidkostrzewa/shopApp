import { Moon } from '../Icon/Moon';
import Style from '../Nav/Nav.module.scss';
import { useState } from 'react';

const Nav = ({ setCurrentStep }) => {
  const [stanNav, setStanNav] = useState(false);
  const STEPS = ['Home', 'Store', 'Cart'];

  const btn = STEPS.map((step) => {
    return (
      <li
        className={Style.nameElement}
        onClick={() => {
          setCurrentStep(step);
          setStanNav(false);
        }}
      >
        {step}
      </li>
    );
  });

  const elementNav = () => {
    return (
      <>
        <ul className={Style.wrapNav}>{btn}</ul>
        <div className={Style.wrapSing}>
          <button className={Style.btnSing}>Sing in</button>
          <button className={Style.btnDay}>
            <Moon />
          </button>
        </div>
      </>
    );
  };

  const navMobile = () => {
    return (
      <div
        className={Style.wrapNavMobile}
        onClick={() => {
          setStanNav(false);
        }}
      >
        <p className={Style.navTitle}>Navigation</p>
        {elementNav()}
      </div>
    );
  };

  return (
    <>
      <button
        className={`${Style.btnBurger}`}
        onClick={() => {
          setStanNav(!stanNav);
        }}
      >
        <svg width="auto" height="auto" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12H20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
          <path
            d="M5 17H20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
          <path
            d="M5 7H20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </button>
      {stanNav ? navMobile() : ''}
      <div className={Style.wrap}> {elementNav()}</div>
    </>
  );
};

export default Nav;
