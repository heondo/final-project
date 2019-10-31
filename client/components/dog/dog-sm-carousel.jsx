import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const DogSmCarousel = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const items = props.items.map((item, i) => {
    return (
      {
        src: item,
        altText: `Slide ${i}`
      }
    );
  });

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const prev = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    let imgSize = {
      minHeight: '250px',
      backgroundImage: `url("${item.src}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <Link to={`/dog/${props.dogID}`}>
          <div style={imgSize}></div>
        </Link>
      </CarouselItem>
    );
    // let imgSize = {
    //   width: '100%',
    //   margin: '.25rem 0px'
    // };
    // return (
    //   <CarouselItem
    //     onExiting={() => setAnimating(true)}
    //     onExited={() => setAnimating(false)}
    //     slide={false}
    //     key={item.src}
    //   >
    //     <img src={item.src} style={imgSize} />
    //   </CarouselItem>
    // );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={e => {
        e.stopPropagation();
        next();
      }}
      previous={e => {
        e.stopPropagation();
        prev();
      }}
      interval={false}
      keyboard={false}
      slide={true}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} className="mb-0"/>
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={prev} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
};

export default DogSmCarousel;
