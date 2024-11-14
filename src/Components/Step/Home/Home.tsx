// import { dividerClasses } from '@mui/material';
import { api } from '../../Nav/API/API';
// import { Img } from '../../Utilis/Img/Img';

import Style from '../Home/Home.module.scss';
import { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CardItem } from '../../Utilis/CardItem/CardItem';

{
  // import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
  /* <LocalGroceryStoreOutlinedIcon
            aria-label="cart"
            sx={{
              fontSize: '14px',
              // padding: '0 5px',
              boxSizing: 'content-box',
            }}
          /> */
}

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

// interface Img {
//   img: string[];
// }

// export const Img = (img: Img) => {
//   const [stepImg, setStepImg] = useState(0);
//   const arrayImg = img.img;

//   return (
//     <div
//       style={{ backgroundImage: `url(${arrayImg[stepImg]})` }}
//       className={Style.wrapImg}
//     >
//       {/* <img className={Style.img} src={`${arrayImg[stepImg]}`} alt="" /> */}
//       <button
//         className={Style.btnArrow}
//         onClick={() => {
//           setStepImg(stepImg == 0 ? arrayImg.length - 1 : stepImg - 1);
//         }}
//       >
//         <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//       <button
//         className={`${Style.btnArrow} ${Style.btnLeft}`}
//         onClick={() => {
//           setStepImg(stepImg == arrayImg.length - 1 ? 0 : stepImg + 1);
//         }}
//       >
//         <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//     </div>
//   );
// };

const Suggested = () => {
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api('products').then((result) => {
      setProducts(result.slice(0, 8));
    });
  }, []);

  const element = products.map((product) => {
    return (
      <>
        <CardItem data={product} />
      </>
    );
  });

  return (
    <>
      <>
        {element}
        {/* {products.length > 0 && <CardItem data={products[step]} />} */}
        {/* {products.length > 0 && <CardItem product={products[step]} />} */}
        {/* {element(step == 0 ? products.length - 1 : step - 1)} */}
        {/* {element(step)} */}
        {/* {element(step == products.length - 1 ? 0 : step + 1)} */}
      </>
      <button
        className={Style.btnArrow}
        onClick={() => {
          setStep(step == 0 ? products.length - 1 : step - 1);
        }}
      >
        <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
      </button>
      <button
        className={`${Style.btnArrow} ${Style.btnLeft}`}
        onClick={() => {
          setStep(step == products.length - 1 ? 0 : step + 1);
        }}
      >
        <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
      </button>
    </>
  );
};

const Category = () => {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<Product['category'][]>([]);

  useEffect(() => {
    api('categories').then((result) => {
      setCategories(result);
    });
  }, []);

  const element = (step: number) => {
    if (categories.length == 0) return;
    const product = categories[step];

    return (
      <>
        <div
          className={`${Style.wrapProduct}`}
          key={product.id}
          style={{ backgroundImage: `url(${product.image})` }}
        >
          <p className={Style.category}>CATEGORY:</p>
          <p className={Style.categoryTitle}>{product.name}</p>
          <button
            className={Style.btnCategoryGo}
            onClick={() => console.log('ok')}
          >
            GO to store
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      <div className={Style.wrapSlider}>
        {element(step == 0 ? categories.length - 1 : step - 1)}
        {element(step)}
        {element(step == categories.length - 1 ? 0 : step + 1)}
      </div>

      <button
        className={Style.btnArrow}
        onClick={() => {
          setStep(step == 0 ? categories.length - 1 : step - 1);
        }}
      >
        <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
      </button>
      <button
        className={`${Style.btnArrow} ${Style.btnLeft}`}
        onClick={() => {
          setStep(step == categories.length - 1 ? 0 : step + 1);
        }}
      >
        <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
      </button>
    </>
  );
};

// const Tile = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   useEffect(() => {
//     api('products').then((result) => {
//       setProducts(result);
//     });
//   }, []);
//   const element = products.map((product) => {
//     return (
//       <>
//         <CardItem data={product} />
//       </>
//     );
//   });
//   return <div className={Style.wrapTile}>{element}</div>;
// };

const Home = () => {
  return (
    <div className={Style.wrap}>
      <div className={Style.suggestions}>
        <Suggested />
      </div>

      <div className={Style}>
        <Category />
      </div>
    </div>
  );
};

export default Home;
