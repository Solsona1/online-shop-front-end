import { FC, useEffect, useState } from "react";
import "./Carousel.css";

interface IPropsCarousel {
  images: string[];
}

export const Carousel: FC<IPropsCarousel> = ({ images }) => {
  const [currImg, setCurrImg] = useState<number>(0);

  const carouselInfiniteSlide = () => {
    if (currImg === images.length - 1) {
      return setCurrImg(0);
    }
    return setCurrImg(currImg => currImg + 1);
  };

  useEffect(() => {
    console.log("useEffect fired");
    const interval = setInterval(() => {
      carouselInfiniteSlide();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="carousel-container">
      {images.length > 0 &&
        images.map((image: string, index: number) => (
          <div
            key={index}
            className="carousel-item"
            style={{ transform: `translate(-${currImg * 100}%)` }}
          >
            <img src={image} />
          </div>
        ))}
    </div>
  );
};
