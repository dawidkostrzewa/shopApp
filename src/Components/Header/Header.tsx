// import React from 'react';
// import Style from '../Header/Header.module.scss';
// import Nav from '../Nav/Nav';
import { useState } from 'react';
// import Nav from '../Nav/Nav';

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

const Header = () => {
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
        // sx={{ flexGrow: 1 }}
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
            {/* <Typography level="h1">Mantine</Typography> */}
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"
              selectionFollowsFocus // strzałki automatycznie ładują przycisk po najechaniu
              // orientation="vertical"
            >
              <Tab label="Home" value="Home" />
              <Tab label="Store" value="Store" />
              <Tab label="Cart" value="Cart" />
            </Tabs>
          </Box>
        </Grid>
        <Grid container>
          <Button>Sing in</Button>
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="neutral"
            sx={{ marginLeft: '10px' }}
          >
            {isNightMode ? <BedtimeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
