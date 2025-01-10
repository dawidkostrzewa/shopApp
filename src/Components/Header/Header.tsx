
import { useState } from 'react';

import Typography from '@mui/joy/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useAppContext } from '../../Context/AppContext';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



const Header = () => {
  const { cartItem } = useAppContext()

  const totalQuantity: number = cartItem
    .map((item) => item.quantity)
    .reduce((acc: number, curr: number) => acc + curr, 0);

  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  const [isNightMode, setIsNightMode] = useState(false);

  const handleButtonClick = () => {
    setIsNightMode(!isNightMode);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
    setValue(newValue);
  };
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          margin: '0 auto',
          width: '95%',
          maxWidth: '1400px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid>
          <Tabs
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
              setValue('');
            }}
          >
            <Typography level="h1">Mantine</Typography>
          </Tabs>
        </Grid>
        <Grid>
          {/* zmienić tab na link !!!!!*/}
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {/* <Typography level="h1">Mantine</Typography> */}
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"
              selectionFollowsFocus // strzałki automatycznie ładują przycisk po najechaniu
            // orientation="vertical"
            >

              <Tab label="Home" value="" />
              <Tab label="Store" value="Store" />
              <Tab iconPosition="end" label="Cart" value="Cart" icon={
                <StyledBadge badgeContent={totalQuantity} color='primary'>
                  <ShoppingCartIcon />
                </StyledBadge>} />
            </Tabs>


          </Box>
        </Grid>
        <Grid container>
          <Button onClick={() => {
            navigate('/Sign');
            setValue('');
          }} >Sing in</Button>
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="neutral"
            sx={{ marginLeft: '10px' }}
          >
            {isNightMode ? <BedtimeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
        </Grid>
      </Grid >
    </>
  );
};

export default Header;
