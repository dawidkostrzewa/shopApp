import { useAppContext } from '../../../Context/AppContext'
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { Box } from '@mui/joy'
import { Product } from '../Home/Home'
import { useState, useEffect } from 'react';
import { api } from '../../API/API';
import CartItemControls from '../../UpdateCart/CartItemControls';






type CardItemProduct = Product & { quantity: number }

const Cart = () => {

  const { cartItem } = useAppContext()



  const [wrapProduct, setWrapProduct] = useState<CardItemProduct[]>([]);




  const getProductData = async () => {
    const productsPromises: Promise<Product>[] = cartItem.map((productBasket) => api(`products/${productBasket.id}`))
    const productsData = await Promise.all(productsPromises)

    const producutsWithQuantity = productsData.map(p => {
      return {
        ...p,
        quantity: cartItem.find(sC => sC.id === p.id)?.quantity || 0
      }
    })


    setWrapProduct(producutsWithQuantity)


  }



  const basketObject = () => {
    return (
      wrapProduct.map((product) => {
        return (
          <CardContent sx={{
            display: 'flex'

          }}>
            <Box>
              <CardMedia
                component="img"
                height='100px'
                width='100px'
                image={product.images?.[0]}
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
            <CartItemControls id={product.id} />
          </CardContent >
        )
      }
      )
    )
  }

  useEffect(() => {
    getProductData()
  }, [cartItem]);




  const totalSum = wrapProduct.map((e) => e.price * e.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)


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
        {cartItem.length == 0 ?
          <Typography variant="h6" gutterBottom>
            Your cart is empty.
          </Typography>
          : <>{basketObject()}<Typography variant="body1" gutterBottom>
            ${totalSum}
          </Typography></>}
      </Card>

    </Container>
  )
}

export default Cart