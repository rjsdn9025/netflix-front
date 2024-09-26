import React, { useEffect, useState } from 'react';

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "https://df5vvgenn2hzh.cloudfront.net/image/111.jpg",
    "https://df5vvgenn2hzh.cloudfront.net/image/222.jpg",
    "https://df5vvgenn2hzh.cloudfront.net/image/333.jpg",
    "https://df5vvgenn2hzh.cloudfront.net/image/444.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      <img src={slides[slideIndex]} alt="슬라이드 이미지" className="slider-image" />
    </div>
  );
}

export default Slider;
