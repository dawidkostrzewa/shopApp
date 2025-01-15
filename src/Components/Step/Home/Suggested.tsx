
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { CardContent } from '@mui/material';

import { api } from '../../API/API';
import { CenterMode, SimpleSlider } from '../../Utils/Slider/Slide'
import { CartStyle, Product } from '../../../Context/AppContext';
import WrapImg from '../../Utils/Img/WrapImg';
import { mapImgToComponents } from '../../Utils/Img/MapImgToComponents';


const Suggested = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();



    useEffect(() => {
        api('products').then((result) => {
            setProducts(result.slice(0, 8));
        });
    }, []);

    const element = products.map((product) => {
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
                            sx={{
                                margin: '5px 0 ',
                                color: '#333'
                            }}
                        >
                            {product.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                height: 100,
                                overflow: 'hidden',
                            }}
                        >
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardContent
                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        <Typography noWrap sx={{ fontSize: '22px' }}>
                            {product.price} $
                        </Typography>
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={() =>
                                navigate(`/${product.id}`)
                            }
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: '#1871c2',
                                '&:hover': {
                                    backgroundColor: '#185EA5',
                                },
                            }}
                        >
                            Learn More Now!
                        </Button>
                    </CardContent >
                </ Card >


            </ >
        );
    });
    return (

        <CenterMode numberViews={1}>
            {element}
        </CenterMode>


    );
}

export default Suggested

