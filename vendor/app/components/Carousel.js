// Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: '10px', zIndex: 1, color: 'black' }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: '10px', zIndex: 1, color: 'black' }}
      onClick={onClick}
    />
  );
};


const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src="car1.png" alt="Slide 1" />
        </div>
        <div>
          <img src="car2.png" alt="Slide 2" />
        </div>
        <div>
          <img src="car3.png" alt="Slide 3" />
        </div>
        <div>
          <img src="car4.png" alt="Slide 4" />
        </div>
        <div>
          <img src="car5.png" alt="Slide 5" />
        </div>
        <div>
          <img src="car6.png" alt="Slide 6" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

