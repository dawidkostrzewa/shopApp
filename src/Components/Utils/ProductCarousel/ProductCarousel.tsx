// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Style from './ProductCarousel.module.scss';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ImageSlider = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      <div className="h-96 w-full relative overflow-hidden rounded-lg">
        {/* <img
          src={images[currentIndex]}
          // alt={images[currentIndex].alt}
          className="w-full h-full object-cover transition-transform duration-500"
        /> */}
        <img className={Style.img} src={images[currentIndex]} alt="" />

        {/* Przyciski nawigacyjne */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
          {/* <ChevronLeft className="w-6 h-6 text-white" /> */}
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {/* <ChevronRight className="w-6 h-6 text-white" /> */}
          <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
        </button>
      </div>

      {/* Wskaźniki slajdów */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === slideIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// export const ProductCarousel = ({ step, setStep }) => {
//   return (
//     <>
//       {/* {children} */}
//       <button className={Style.btn} onClick={() => setStep(step - 1)}>
//         <ArrowBackIosNewIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//       <button
//         className={`${Style.btn} ${Style.btnLeft}`}
//         onClick={() => setStep(step + 1)}
//       >
//         <ArrowForwardIosIcon className={Style.arrow} sx={{ fontSize: 30 }} />
//       </button>
//     </>
//   );
// };
