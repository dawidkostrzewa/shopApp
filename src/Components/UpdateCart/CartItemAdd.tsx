import { Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useUpdateCart } from './useUpdateCart';
import { CartProductBase } from '../../Context/AppContext';



const CartItemAdd = ({ product }: { product: CartProductBase }) => {
    const updateCart = useUpdateCart()



    return (
        <Button
            size="medium"
            variant="contained"
            onClick={() => {


                updateCart({
                    id: product.id,
                    updateAction: "PLUS",
                    title: product.title,
                    price: product.price,
                    images: product.images
                });

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
    )
}

export default CartItemAdd