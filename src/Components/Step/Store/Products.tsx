
import { CartStyle, DescriptionStyle, TitleStyle, useAppContext } from '../../../Context/AppContext';
import { Box } from '@mui/joy';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { SimpleSlider } from '../../Utils/Slider/Slide'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

import CartItemControls from '../../UpdateCart/CartItemControls';
import CartItemAdd from '../../UpdateCart/CartItemAdd';
import WrapImg from '../../Utils/Img/WrapImg';
import { mapImgToComponents } from '../../Utils/Img/MapImgToComponents';

const Products = () => {
    const { cartItem, wrapProduct, } = useAppContext()
    const navigate = useNavigate();

    const element = wrapProduct.map((product) => {
        return (
            <>
                <Card sx={CartStyle}>
                    <WrapImg>
                        {product.images.length &&
                            <SimpleSlider>
                                {mapImgToComponents(product.images)}
                            </SimpleSlider>
                        }
                    </WrapImg>
                    <CardContent>
                        <Typography
                            variant="subtitle1"
                            sx={TitleStyle}
                        >
                            {product.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={DescriptionStyle}
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
                            minWidth: 'auto',
                            background: '#17aabf',
                        }}>
                            <OpenInNewIcon sx={{
                                fontSize: '1.3em'
                            }} />
                        </Button>
                        {
                            cartItem.some(e => e.id === product.id) ?
                                <CartItemControls id={product.id} />
                                :
                                <CartItemAdd product={product} />

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
            {wrapProduct.length !== 0 ? element : <Typography
                variant="h5"
                sx={{
                    color: '#333'
                }}
            >
                No products in this category
            </Typography>}
        </Box>
    )

}

export default Products