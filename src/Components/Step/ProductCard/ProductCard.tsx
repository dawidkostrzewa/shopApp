import { useAppContext } from '../../../Context/AppContext';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../Home/Home';
import { api } from '../../API/API';
import { Button, Card, Container, SxProps, Typography } from '@mui/material';
import { Box } from '@mui/joy';
import { SimpleSlider } from '../../Utils/Slider/Slide'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import CartItemControls from '../../UpdateCart/CartItemControls';
import CartItemAdd from '../../UpdateCart/CartItemAdd';





const boxStyle: SxProps = {
    width: '30px',
    margin: '10px',
    minWidth: 'auto'
}


const imgProduct = (photo: string[]) => {
    const photoCarousel = photo.map((element) => {
        return (
            <Card sx={{
                backgroundImage: `url(${element})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
        )
    })
    return photoCarousel
}
const ProductCard = () => {
    const { cartItem } = useAppContext();
    const [product, setProduct] = useState<Product>();;
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api(`products/${params.id}`).then((result) => {
            setProduct(result);
        });
    }, [params.id]);

    if (!product) return

    return (
        <>
            <Container sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: "translate(-50%, -50%)",
                height: '70vh',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>

                <Box width={'45%'} height={'70%'} sx={{
                    border: '1px #ccc solid',
                    borderRadius: '10px',
                    overflow: "hidden",
                    padding: "4% 2%",
                    aspectRatio: "16/9"

                }}>
                    {product.images.length <= 0 ? '' : <SimpleSlider> {imgProduct(product.images)}</SimpleSlider>}
                </Box>
                <Box width={'45%'} height={'70%'} sx={{
                    border: '1px #ccc solid',
                    borderRadius: '10px',
                    overflow: "hidden",
                    padding: "4% 2%",
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography variant="h6" gutterBottom>
                        {product.title}
                    </Typography>

                    <Typography variant="subtitle1" sx={{
                        color: '#333',
                        marginBottom: '5px'
                    }} >
                        {product.category.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{
                        flex: 1,
                        color: '#333',

                    }}>
                        {product.description}
                    </Typography>
                    <Box display={"flex"} justifyContent={"space-between"} sx={{
                        width: '100%',
                        display: "flex",
                        justifyContent: 'space-between',
                    }
                    }>
                        <Typography variant="h5" component={"div"} gutterBottom sx={{ display: 'block' }}>
                            {product.price}$
                        </Typography>

                        {
                            cartItem.some(e => e.id === product.id) ?
                                <CartItemControls id={product.id} />
                                :
                                <CartItemAdd product={product} />
                        }
                    </Box>

                </Box>

            </Container>
            <Button variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />} onClick={() => {
                navigate(-1);
            }}
            >Back</Button></>


    )
}

export default ProductCard
