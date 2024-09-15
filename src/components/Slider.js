import React, { useEffect, useState } from 'react';

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    "https://s3-rocket-ott.s3.ap-northeast-2.amazonaws.com/111.jpg",
    "https://s3-rocket-ott.s3.ap-northeast-2.amazonaws.com/222.jpg",
    "https://s3-rocket-ott.s3.ap-northeast-2.amazonaws.com/333.jpg",
    "https://s3-rocket-ott.s3.ap-northeast-2.amazonaws.com/444.jpg"
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
