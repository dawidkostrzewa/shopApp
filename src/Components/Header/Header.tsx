
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
import { StyleColors, useAppContext } from '../../Context/AppContext';
import Btn from '../Utils/Btn/Btn';



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

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
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
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"

              selectionFollowsFocus // strzałki automatycznie ładują przycisk po najechaniu
              // orientation="vertical"
              sx={{
                color: StyleColors.colorNav
              }}
            >

              <Tab component='a' label="Home" value="" sx={{
                color: 'inherit'
              }} />
              <Tab component='a' label="Store" value="Store" sx={{
                color: 'inherit'
              }} />
              <Tab component='a' iconPosition="end" label="Cart" value="Cart" sx={{
                color: 'inherit'
              }} icon={
                <StyledBadge badgeContent={totalQuantity} color='primary' >
                  <ShoppingCartIcon />
                </StyledBadge>} />
            </Tabs>

          </Box>
        </Grid>
        <Grid container>
          <Btn web={'/Sing'} >Sing in</Btn>
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
