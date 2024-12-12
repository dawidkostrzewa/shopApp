import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { ShoppingCart } from '../../../App'
import { Box } from '@mui/joy'
import { Product } from '../Home/Home'
import { useState, useEffect } from 'react';
import { api } from '../../Nav/API/API';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';




const Cart = ({ shoppingCart, statusCart }: ShoppingCart) => {



  const ProductList = () => shoppingCart.length == 0 ?
    <Typography variant="h6" gutterBottom>
      Your cart is empty.
    </Typography>
    : shoppingCart.map((productBasket) => {
      const [wrapProduct, setWrapProduct] = useState<Product[]>([]);
      useEffect(() => {
        api(`products/${productBasket.id}`).then((result) => {
          setWrapProduct(result);
        });
      }, []);
      if (wrapProduct.length == 0) return
      return (
        <CardContent sx={{
          display: 'flex'

        }}>
          <Box>
            <CardMedia
              component="img"
              height='100px'
              width='100px'
              image={wrapProduct.images[0]}
              alt=''
              sx={{
                display: 'block'
              }}
            />
          </Box>

          <Box sx={
            {
              flex: 1,
              margin: '0 3%',
              color: '#333'
            }
          }>
            <Typography variant="h6" gutterBottom>
              {wrapProduct.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              ${wrapProduct.price}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }} >
            <Button size="small" variant="contained" sx={{
              textTransform: 'none',
            }}
              onClick={() => {
                statusCart(productBasket.id, 0)
              }}
            >Remove</Button>

            <Button
              aria-label="reduce"
              onClick={() => {
                statusCart(productBasket.id, 1)
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Typography variant="h6" gutterBottom>
              {productBasket.quantity}
            </Typography>
            <Button
              aria-label="increase"
              onClick={() => {
                statusCart(productBasket.id)
              }}
            >
              <AddIcon fontSize="small" />
            </Button></Box>

        </CardContent>
      )
    })




  return (
    <Container sx={{
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: "translateX(-50%)",
      width: "70vw",

    }}>
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>
      <Card>
        <ProductList />
      </Card>
    </Container>
  )
}

export default Cart