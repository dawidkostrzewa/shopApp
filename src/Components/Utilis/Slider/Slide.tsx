import Style from './Slide.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function CenterMode({ numberViews = 1, children }: { numberViews: number, children: React.ReactNode }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: numberViews,
    centerMode: numberViews == 1 ? true : false,
    centerPadding: '25%',
    slidesToScroll: numberViews,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2,


        }
      },
      {
        breakpoint: 720,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,


        }
      },

    ]

  };
  return (
    <div className="slider-container">
      <Slider {...settings} className={Style.wrapBtn}>
        {children}
      </Slider>
    </div>
  );
}

// focusOnSelect responsive  variableWidth

export function SimpleSlider({ children }: { children: React.ReactNode }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '10px',
    swipeToSlide: false,
    swipe: false

  };
  return (

    <Slider {...settings} className={Style.wrapImg}>
      {children}
    </Slider>

  );
}

