import { StyleColors, Subtitle, useAppContext } from '../../../Context/AppContext';
import { Box } from '@mui/joy';
import { Button, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Products from './Products';

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
          '&:hover': {
            backgroundColor: StyleColors.bgHover,
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
          '&:hover': {
            backgroundColor: '#eee',
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
        margin: '10px'
      }
    }>
      <Box sx={{
        width: 200
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
              fontSize: '2rem'
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
        <Products />
      </Box>
    </Box>

  );
};

export default Store;


