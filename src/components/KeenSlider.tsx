import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react';
import useWindowDimensions from '../hook/windowDimensions';
import { Arrow } from './Arrow';

interface Props {
  children: React.ReactNode
  arrayInUse: any[] 
  maxSlidePerView: number
}

export function KeenSlider({ children, arrayInUse, maxSlidePerView }: Props) {
  const { width } = useWindowDimensions();
  const slidesPerView = width < 510 ? 1 : width < 640 ? 2 : width < 1024 ? maxSlidePerView - 2 : maxSlidePerView
  const[currentSlide, setCurrentSlide] = useState(0);
  const[slideLoaded, setSlideLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: {
        min: 0,
        max: arrayInUse.length - 1,
      },
      range: {
        align: true,
        min: 0,
        max: arrayInUse.length - 1,
      },
      mode: "free-snap",
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setSlideLoaded(true)
      },
      slides: {
        perView: slidesPerView,
        spacing: 24,
      }
    }
  )

  return (
    <div className="relative flex justify-between items-center mt-16 w-full">
      {slideLoaded && instanceRef.current 
        &&
        <Arrow 
          disabled={currentSlide === 0} 
          left={true} 
          onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} 
        />
      }
      <div ref={sliderRef} className="keen-slider">
        { children }
      </div>
      {slideLoaded && instanceRef.current 
        && 
        <Arrow 
          disabled={currentSlide === arrayInUse.length - slidesPerView}  
          onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()} 
        />
      }
    </div>
  )
}