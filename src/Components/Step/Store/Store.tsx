
import { api } from '../../Nav/API/API';
import { useState, useEffect } from 'react';
import { Product } from '../Home/Home';
import { Box } from '@mui/joy';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { SimpleSlider } from '../../Utilis/Slider/Slide'
import { CardMedia } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';





const AllCategories = ({ setSelectedCategories }) => {
  const [categories, setCategories] = useState<Product['category'][]>([]);

  useEffect(() => {
    api('categories').then((result) => {
      setCategories(result);
    });
  }, []);

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
            backgroundColor: '#eee',
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

const Products = ({ shoppingCart, selectedCategories, statusCart }: number) => {
  const [wrapProduct, setWrapProduct] = useState<Product[]>([]);
  const navigate = useNavigate();


  const imgProduct = (photo: string[]) => {
    const photoCarousel = photo.map((element) => {
      return (
        <CardMedia
          component="img"
          height='200px'
          width='80%'
          image={element}
          alt=''
        />
      )
    })
    return photoCarousel
  }


  useEffect(() => {
    // api('products').then((result) => {
    api(selectedCategories === 0 ? 'products' : `products/?categoryId=${selectedCategories}`).then((result) => {
      setWrapProduct(result);
    });
  }, [selectedCategories]);

  const element = wrapProduct.map((product) => {
    return (
      <>
        <Card sx={{
          maxWidth: 300,
          height: 'fit-content',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0px 0px 10px 0.1px #eee',
          margin: '20px auto',
        }
        }>

          {product.images.length <= 0 ? '' : <SimpleSlider> {imgProduct(product.images)}</SimpleSlider>}
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{
                margin: '5px 0 ',
                color: '#333'
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                height: 100,
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Typography>
          </CardContent>
          <CardContent
          >
            <Typography noWrap sx={{ fontSize: '22px' }}>
              {product.price} $
            </Typography>
          </CardContent >
          <CardContent
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Button variant="contained" onClick={() =>
              navigate(`/${product.id}`)
            } sx={{
              padding: '5px',
              marginRight: '10px',
              height: '80%',
              minWidth: 'auto',
              background: '#17aabf',
            }}>
              <OpenInNewIcon sx={{
                fontSize: '1.3em'
              }} />
            </Button>

            {
              shoppingCart.some(e => e.id === product.id) ?
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',


                }} >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      statusCart(shoppingCart.filter(e => e.id === product.id)[0].id, 1)
                    }}
                    sx={{
                      width: '30px',
                      margin: '10px',
                      minWidth: 'auto'
                    }}

                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Typography variant="h6" gutterBottom>
                    {shoppingCart.filter(e => e.id === product.id)[0].quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      statusCart(shoppingCart.filter(e => e.id === product.id)[0].id)
                    }}
                    sx={{
                      width: '30px',
                      margin: '10px',
                      minWidth: 'auto'
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button></Box>
                :
                <Button
                  size="medium"
                  variant="contained"
                  onClick={() => {
                    statusCart(product.id)
                  }}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '10px',
                    backgroundColor: '#1871c2',
                    '&:hover': {
                      backgroundColor: '#185EA5',
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon sx={{
                    fontSize: '1em',
                    marginRight: '5px'
                  }} />
                  Add to cart
                </Button>
            }



          </CardContent >

        </ Card >
      </ >
    );
  });

  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
    }}>
      {element}
    </Box>
  )


}

const Store = ({ statusCart, shoppingCart }) => {
  const [selectedCategories, setSelectedCategories] = useState<number>(0);
  return (
    <Box sx={
      {
        display: 'flex',
        width: '100%',
        margin: '10px'
      }
    }>
      <Box sx={{
        width: '20%'
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
          <Typography variant='h5'>

            Categories
          </Typography>

        </Box>
        <AllCategories setSelectedCategories={setSelectedCategories} />
      </Box>
      <Box sx={{
        width: '80%',

      }} >
        <Products shoppingCart={shoppingCart} selectedCategories={selectedCategories} statusCart={statusCart} />
      </Box>
    </Box>

  );
};

export default Store;


// {
//   <Typography variant='subtitle1'
//   sx={{
//     width: 'fit-content',
//     marginTop: '2px',
//     padding: '5px',
//     borderLeft: ' 1px solid #ccc',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     '&:hover': {
//       background: '#eee',


//     }
//   }}>
//   {category.name}
// </Typography >
// }