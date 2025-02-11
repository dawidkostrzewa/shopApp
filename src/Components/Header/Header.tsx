
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppContext } from '../../Context/AppContext';
import Btn from '../Utils/Btn/Btn';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Grid from '@mui/joy/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled, } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useColorScheme } from '@mui/material/styles';



const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({

  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    // color: theme.palette.background.paper,
    // backgroundColor: theme.palette.text.secondary

  },
}));


const Header = () => {
  const { cartItem } = useAppContext()
  const { mode, setMode } = useColorScheme();
  const totalQuantity: number = cartItem
    .map((item) => item.quantity)
    .reduce((acc: number, curr: number) => acc + curr, 0);

  const [value, setValue] = React.useState('');
  const navigate = useNavigate();
  const handleButtonClick = () => {
    setMode(mode === 'light' ? 'dark' : 'light')



  };

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
    setValue(newValue);
  };


  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          margin: '0 auto',
          width: '95%',
          maxWidth: '1400px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }
        }
      >
        <Grid>
          <Tabs
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
              setValue('');
            }}
          >
            <Typography variant="h1"  >Mantine</Typography>
          </Tabs>
        </Grid>
        <Grid xs={12} sm='auto' sx={{ order: { xs: 2, sm: 0 } }}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"

              selectionFollowsFocus // strzałki automatycznie ładują przycisk po najechaniu
              sx={{
                color: 'inherit',
              }}
            >
              <Tab component='a' label="Home" value="" />
              <Tab component='a' label="Store" value="Store" />
              <Tab component='a' iconPosition="end" label="Cart" value="Cart" sx={{ minHeight: '50px', }} icon={
                <StyledBadge badgeContent={totalQuantity} color='primary'>
                  <ShoppingCartIcon />
                </StyledBadge>} />
            </Tabs>
          </Box>
        </Grid>
        <Grid container >
          <Btn web={'/Sing'} >Sing in</Btn>
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="inherit"
            sx={{ marginLeft: '10px' }}
          >
            {mode === 'light' ? <BedtimeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
        </Grid>
      </Grid >
    </>
  );
};

export default Header;
