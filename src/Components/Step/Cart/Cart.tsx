import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { ShoppingCart } from '../../../App'
import { Box } from '@mui/joy'
import { Product } from '../Home/Home'
import { useState, useEffect } from 'react';
import { api } from '../../API/API';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



const Cart = ({ shoppingCart, statusCart }: { shoppingCart: ShoppingCart, statusCart: number, }) => {

  const [total, setTotal] = useState(0);
  const [wrapProduct, setWrapProduct] = useState<Product[]>([]);







  useEffect(() => {
    shoppingCart.map((productBasket) => {
      api(`products/${productBasket.id}`).then((result) => {
        const productWithQuantity = { ...result, stanBasket: { quantity: productBasket.quantity, id: productBasket.id } };

        setWrapProduct((prevProducts) => {
          if (prevProducts.some((product) => product.stanBasket.id === productBasket.id)) return prevProducts
          else {
            return [...prevProducts, productWithQuantity]
          }
        }
        );
      });

    })


  }, [shoppingCart,]);

  const basketObject = () => {
    return (
      wrapProduct.map((product) => {
        console.log(product.id, shoppingCart)
        return (
          <CardContent sx={{
            display: 'flex'

          }}>
            <Box>
              <CardMedia
                component="img"
                height='100px'
                width='100px'
                image={product.images[0]}
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
                {product.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                ${product.price}
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
                  statusCart(product.stanBasket.id, 0)
                }}
              >Remove</Button>

              <Button
                aria-label="reduce"
                onClick={() => {
                  statusCart(product.stanBasket.id, 1)
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Typography variant="h6" gutterBottom>
                {shoppingCart.map(id => {
                  if (id.id === product.id) return id.quantity
                  else return ''
                })}

              </Typography>
              <Button
                aria-label="increase"
                onClick={() => {
                  statusCart(product.stanBasket.id)
                }}
              >
                <AddIcon fontSize="small" />
              </Button></Box>
          </CardContent >
        )
      }
      )
    )
  }



  useEffect(() => {
    const totalSum = wrapProduct.map((e) => e.price * e.stanBasket.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    setTotal(totalSum);
  }, [wrapProduct])




  const ProductList = () => shoppingCart.length == 0 ?
    <Typography variant="h6" gutterBottom>
      Your cart is empty.
    </Typography>
    : <>{basketObject()}<Typography variant="body1" gutterBottom>
      ${total}
    </Typography></>


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