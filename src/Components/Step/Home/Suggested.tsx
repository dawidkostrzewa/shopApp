
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import { CenterMode, SimpleSlider } from '../../Utils/Slider/Slide'
import { CartStyle, useAppContext, StyleColors } from '../../../Context/AppContext';
import WrapImg from '../../Utils/Img/WrapImg';
import { mapImgToComponents } from '../../Utils/Img/MapImgToComponents';
import Btn from '../../Utils/Btn/Btn';


const Suggested = () => {
    const { wrapProduct } = useAppContext()

    const element = wrapProduct.slice(0, 8).map((product) => {
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
                            variant="body1"
                            sx={{
                                margin: '5px 0 ',
                                color: StyleColors.colorSubtitle

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
                        <Btn web={`/${product.id}`} >Learn More Now!</Btn>
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

