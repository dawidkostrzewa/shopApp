
import { api } from '../../Nav/API/API';
import Style from '../Home/Home.module.scss';
import { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import { CenterMode, SimpleSlider } from '../../Utilis/Slider/Slide'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

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

  const imgProduct = (photo: string[]) => {
    const aaa = photo.map((element) => {
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
    return aaa
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
          {product.images.length <= 0 ? '' : <SimpleSlider> {imgProduct(product.images)}</SimpleSlider>}
          <CardContent>
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
    <>
      <CenterMode>
        {element}
      </CenterMode>
    </>
  );
};

const Category = () => {
  const [categories, setCategories] = useState<Product['category'][]>([]);


  useEffect(() => {
    api('categories').then((result) => {
      setCategories(result);
    });
  }, []);

  const element = categories.map((category) => {

    return (
      <>  <Card sx={{

        width: '85%',
        height: '60vh',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0px 0px 10px 0.1px #eee',
        margin: '20px auto',
        backgroundImage: `url(${category.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',


      }
      }>




        <CardContent
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            size="medium"
            variant="contained"
            sx={{
              borderRadius: '10px',
              backgroundColor: '#1871c2',
              '&:hover': {
                backgroundColor: '#185EA5',
              },
            }}
          >
            Go to store
          </Button>
        </CardContent >

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

// {
//   const element = (step: number) => {
//     if (categories.length == 0) return;
//     const product = categories[step];

//     return (
//       <>
//         <div
//           className={`${Style.wrapProduct}`}
//           key={product.id}
//           style={{ backgroundImage: `url(${product.image})` }}
//         >
//           <p className={Style.category}>CATEGORY:</p>
//           <p className={Style.categoryTitle}>{product.name}</p>
//           <button
//             className={Style.btnCategoryGo}
//             onClick={() => console.log('ok')}
//           >
//             GO to store
//           </button>
//         </div>
//       </>
//     );
//   };
//   return (
//     <>
//       <div className={Style.wrapSlider}>
//         {element(step == 0 ? categories.length - 1 : step - 1)}
//         {element(step)}
//         {element(step == categories.length - 1 ? 0 : step + 1)}
//       </div>

//       <button
//         className={Style.btnArrow}
//         onClick={() => {
//           setStep(step == 0 ? categories.length - 1 : step - 1);
//         }}
//       >
//         <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//       <button
//         className={`${Style.btnArrow} ${Style.btnLeft}`}
//         onClick={() => {
//           setStep(step == categories.length - 1 ? 0 : step + 1);
//         }}
//       >
//         <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//     </>
//   );
// }