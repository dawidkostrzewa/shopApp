import { useAppContext } from '../../../Context/AppContext'
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { Box } from '@mui/joy'

import CartItemControls from '../../UpdateCart/CartItemControls';







const Cart = () => {

  const { cartItem } = useAppContext()

  const BasketObject = () => {
    return (
      cartItem.map((product) => {
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


  const totalSum = cartItem.map((e) => (e.price ?? 0) * e.quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)


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
          : <><BasketObject /><Typography variant="body1" gutterBottom>
            ${totalSum}
          </Typography></>}
      </Card>

    </Container>
  )
}

export default Cart