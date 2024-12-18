import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../Home/Home';
import { api } from '../../API/API';
import { Button, Card, Container, Typography } from '@mui/material';
import { Box } from '@mui/joy';
import { SimpleSlider } from '../../Utils/Slider/Slide'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { ShoppingCart } from '../../../App';


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


const ProductCard = ({ shoppingCart, updateCart }: { shoppingCart: ShoppingCart[], updateCart: (id: number, updateAction: "PLUS" | "MINUS" | "DELETE") => void }) => {
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
                    padding: "4% 2%"
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
                    <Box sx={{
                        width: '100%',
                        display: "flex",
                        justifyContent: 'space-between',
                    }
                    }>
                        <Typography variant="h5" gutterBottom sx={{ display: 'block' }}>
                            {product.price}$
                        </Typography>

                        {
                            shoppingCart.some(e => e.id === product.id) ?
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',


                                }} >
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            updateCart(product.id, 'MINUS')
                                        }}
                                        sx={{
                                            width: '30px',
                                            margin: '10px',
                                            minWidth: 'auto'
                                        }}

                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Typography variant="h6" gutterBottom>
                                        {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                                        {shoppingCart.filter(e => e.id === product.id)[0].quantity}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => {
                                            updateCart(product.id, 'PLUS')
                                        }}
                                        sx={{
                                            width: '30px',
                                            margin: '10px',
                                            minWidth: 'auto'
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button></Box>
                                :
                                <Button
                                    size="medium"
                                    variant="contained"
                                    onClick={() => {
                                        updateCart(product.id, 'PLUS')
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

// startIcon={<ArrowLeftOutlinedIcon />}