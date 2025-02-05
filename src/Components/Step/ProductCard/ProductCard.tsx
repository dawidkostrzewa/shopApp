import { DescriptionStyle, Product, TitleStyle, useAppContext } from '../../../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Container, SxProps, Typography } from '@mui/material';
import { Box } from '@mui/joy';
import { SimpleSlider } from '../../Utils/Slider/Slide'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import CartItemControls from '../../UpdateCart/CartItemControls';
import CartItemAdd from '../../UpdateCart/CartItemAdd';





const boxStyle: SxProps = {
    height: '370px',
    width: '550px',
    border: '1px #ccc solid',
    borderRadius: '10px',
    overflow: "hidden",
    padding: "40px 25px",
    aspectRatio: "16/9",
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
    const { cartItem, wrapProduct } = useAppContext();
    const params = useParams();
    const navigate = useNavigate();
    const product: Product | undefined = wrapProduct.find(e => e.id === Number(params.id))
    if (!product) return
    return (
        <>
            <Container sx={{
                height: '70vh',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>

                <Box sx={boxStyle} >
                    {product.images.length <= 0 ? '' : <SimpleSlider> {imgProduct(product.images)}</SimpleSlider>}
                </Box>
                <Box display={'flex'} flexDirection={'column'} sx={boxStyle}>
                    <Typography variant="body1" gutterBottom sx={TitleStyle}>
                        {product.title}
                    </Typography>

                    <Typography variant="body1" sx={{
                        ...TitleStyle,
                        fontSize: 16,
                        marginBottom: '5px'
                    }} >
                        {product.category.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={DescriptionStyle}>
                        {product.description}
                    </Typography>
                    <Box width={'100%'} display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h5" component={"p"} display={'block'} gutterBottom>
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

            </Container >
            <Button variant="outlined" startIcon={<ArrowBackIosOutlinedIcon />} onClick={() => {
                navigate(-1);
            }}
            >Back</Button></>


    )
}

export default ProductCard
