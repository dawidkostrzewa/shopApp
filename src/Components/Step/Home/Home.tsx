
import { api } from '../../API/API';
import { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import { CenterMode, SimpleSlider } from '../../Utils/Slider/Slide'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../Context/AppContext';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}


const Suggested = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const imgProduct = (photo: string[]) => {
    const photoCarousel = photo.map((element) => {
      return (
        <CardMedia
          component="img"
          height='200px'
          width='80%'
          image={element}
          alt=''
        />
      )
    })
    return photoCarousel
  }

  useEffect(() => {
    api('products').then((result) => {
      setProducts(result.slice(0, 8));
    });
  }, []);

  const element = products.map((product) => {

    return (
      <>
        <Card sx={{
          width: '80%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0px 0px 10px 0.1px #eee',
          margin: '5px auto',
        }
        }>
          {product.images.length ? <SimpleSlider>{imgProduct(product.images)}</SimpleSlider> : undefined}
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
        </ Card>


      </ >
    );
  });
  return (

    <CenterMode numberViews={1}>
      {element}
    </CenterMode>


  );
};


const Category = () => {
  const { setSelectedCategories } = useAppContext()
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Product['category'][]>([]);


  useEffect(() => {
    api('categories').then((result) => {
      setCategories(result);
    });
  }, []);

  const element = categories.map((category) => {

    return (
      <>  <Card sx={{

        width: '80%',
        height: '60vh',
        borderRadius: 3,
        padding: '10% 5%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: '0px 0px 10px 0.1px #eee',
        margin: '20px auto',
        backgroundImage: `url(${category.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',

      }
      }>
        <Typography variant="body1" sx={{
          color: '#eee',
          textShadow: ' 0 0 1px #bbb'
        }} >
          CATEGORY:
        </Typography>
        <Typography variant="h3" sx={{
          color: '#eee',
          flex: '1',
          textShadow: ' 0 0 5px #777'
        }} >
          {category.name}
        </Typography>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            navigate('/Store');
            setSelectedCategories(category.id)

          }}
          sx={{
            borderRadius: '10px',
            backgroundColor: '#1871c2',
            width: '40%',
            minWidth: '150px',
            '&:hover': {
              backgroundColor: '#185EA5',

            },
          }}
        >
          Go to store
        </Button>
      </ Card >
      </ >
    );
  });




  return (
    <>
      <CenterMode numberViews={3}>
        {element}
      </CenterMode>
    </>

  )


};

const Home = () => {
  return (
    <>
      <Box
        sx={{
          margin: '5% auto',
          padding: ' 0 5%',
        }}
      >
        <Suggested />
      </Box>
      <Box
        sx={{
          margin: '5% auto',
          padding: ' 0 5%',
        }}
      >
        <Category />
      </Box>

    </>

  );
};

export default Home;

