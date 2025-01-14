import Style from './Img.module.scss';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Img {
  img: string[];
}

// export const Img = (img: Img) => {
//   const [stepImg, setStepImg] = useState(0);
//   const arrayImg = img.img;

//   return (
//     <div
//       style={{ backgroundImage: `url(${arrayImg[stepImg]})` }}
//       className={Style.wrapImg}
//     >
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
