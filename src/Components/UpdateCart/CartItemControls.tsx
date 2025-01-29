
import { Box } from '@mui/joy'

import { Button, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppContext } from '../../Context/AppContext';
import { useUpdateCart } from './useUpdateCart';


const CartItemControls = ({ id }: { id: number }) => {
    const { cartItem } = useAppContext()
    const updateCart = useUpdateCart()
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }} >
            <Button size="small" variant="contained" sx={{
                textTransform: 'none',
            }}
                onClick={() => {
                    updateCart({
                        id: id,
                        updateAction: "DELETE",
                    })
                }}
            >Remove</Button>

            <Button
                aria-label="reduce"
                onClick={() => {
                    updateCart({
                        id: id,
                        updateAction: "MINUS",
                    })
                }}
            >
                <RemoveIcon fontSize="small" />
            </Button>
            <Typography variant="h6" component={'p'} gutterBottom>
                {cartItem.filter(e => e.id === id)[0].quantity}
            </Typography>
            <Button
                aria-label="increase"
                onClick={() => {

                    updateCart({
                        id: id,
                        updateAction: "PLUS",
                    })
                }}
            >
                <AddIcon fontSize="small" />
            </Button>
        </Box>
    )
}

export default CartItemControls