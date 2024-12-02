import { Moon } from '../Icon/Moon';
import Style from '../Nav/Nav.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    minWidth: '15px',
    width: '15px',
    height: '15px',
    fontSize: '11px',
  },
}));

function CustomizedBadges() {
  return (
    <IconButton
      aria-label="cart"
      sx={{
        padding: '5px 3px',

        '& .MuiSvgIcon-root': {
          margin: '0px',
          fontSize: '18px',
        },
      }}
    >
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}

//
const Nav = ({ setCurrentStep }) => {
  const navigate = useNavigate();
  const [stanNav, setStanNav] = useState(false);
  const STEPS = ['Home', 'Store', 'Cart'];

  const btn = STEPS.map((step) => {
    return (
      <li
        className={Style.nameElement}
        onClick={() => {
          navigate(`${step}`);
          // setCurrentStep(step);
          setStanNav(false);
        }}
      >
        {step}

        {step == 'Cart' ? CustomizedBadges() : ''}
      </li>
    );
  });

  const elementNav = () => {
    return (
      <>
        <ul className={Style.wrapNav}>{btn}</ul>
        <div className={Style.wrapSing}>
          <button className={Style.btnSing}>Sing in </button>
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
