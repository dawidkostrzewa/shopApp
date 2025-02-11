import { useAppContext } from '../../../Context/AppContext'
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import { Box } from '@mui/joy'
import CartItemControls from '../../UpdateCart/CartItemControls';







const Cart = () => {

  const { cartItem } = useAppContext()

  const BasketObject = () => {
    return (
      cartItem.map((product) => {
        console.log(product)
        return (
          <CardContent sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            // borderBottom: '.5px solid #ccc '
            boxShadow: '0px 0px 1px 0px',

          }}>
            <Box>
              <CardMedia
                component="img"
                height='100px'
                width='100px'
                image={product.images?.[0]}
                alt='Product thumbnail'
                sx={{
                  display: 'block'
                }}
              />
            </Box>
            <Box sx={
              {
                flex: 1,
                margin: '0 15px',
              }
            }>
              <Typography variant="h6" component={'p'} gutterBottom>
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
      width: { xs: '95vw', sm: '70vw' },

    }}>
      <Typography variant="h6" component={'p'} gutterBottom>
        Shopping Cart
      </Typography>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {cartItem.length == 0 ?
          <Typography variant="h6" component={'p'} gutterBottom>
            Your cart is empty.
          </Typography >
          : <><BasketObject /><Typography variant="body1" gutterBottom sx={{
            padding: '10px',
            order: { xs: -1, sm: 0 },
            textAlign: { xs: 'center', sm: 'left' },

          }}>
            Total:  ${totalSum}
          </Typography></>}
      </Card>

    </Container >
  )
}

export default Cart