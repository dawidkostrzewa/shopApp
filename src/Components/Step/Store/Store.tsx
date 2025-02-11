import { Subtitle, useAppContext } from '../../../Context/AppContext';
import { Box } from '@mui/joy';
import { Button, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Products from './Products';


import * as React from 'react';
import Menu from '@mui/material/Menu';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';


function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          display: { xs: 'flex', sm: 'none' },

        }}
      >
        <Typography variant='body1' color='text.secondary'>
          Categories
        </Typography>
        <ArrowDropDownCircleOutlinedIcon color='action' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <AllCategories />
      </Menu>
    </div>
  );
}

const AllCategories = () => {
  const { setSelectedCategories, categories } = useAppContext()

  const wrapCategories = categories.map((category) => {
    return (
      <Button
        color="primary"
        onClick={() => {
          setSelectedCategories(category.id)

        }}
        sx={{
          justifyContent: 'start',
          borderLeft: ' 1px solid #ccc',
          borderRadius: '5px',
          color: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          }
        }}
      >{category.name}</Button>

    )
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

      }}>
      <Button
        onClick={() => {
          setSelectedCategories(0)

        }}
        sx={{
          justifyContent: 'start',
          borderLeft: ' 1px solid #ccc',
          borderRadius: '5px',
          color: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          }
        }}
      >All</Button>
      {wrapCategories}
    </Box>
  )

}

const Store = () => {
  return (
    <Box sx={
      {
        display: 'flex',
        width: '100%',
        margin: { xs: '0', sm: '10px' }
      }
    }>

      {/*  */}
      <Box sx={{
        width: '200',
        display: { xs: 'none', sm: 'block' }
      }}>
        <Box
          sx={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            color: '#333',
            borderBottom: '1px solid #ccc'
          }}

        >  <ManageSearchIcon
            sx={{
              margin: '5px',
              fontSize: '2rem',
              color: 'text.primary'
            }} />
          <Typography variant='body1' sx={Subtitle}>

            Categories
          </Typography>

        </Box>
        <AllCategories />
      </Box>
      <Box sx={{
        flex: 1

      }} >
        <BasicMenu />
        <Products />
      </Box>
    </Box>

  );
};

export default Store;


