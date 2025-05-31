import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import 'swiper/css/effect-fade';
// import 'swiper/css/effect-flip';
import { register } from 'swiper/element/bundle';

import '../../css/styles.css';



register();

// eslint-disable-next-line
export default () => {

    return(
        <Swiper
            // effect="fade"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
          >
            <SwiperSlide>
              <img className='fotos' src= '/poison.png' alt='foto 1'></img>
            </SwiperSlide>
            <SwiperSlide>
              <img className='fotos' src= '/grass.png' alt='foto 1'></img>
            </SwiperSlide>
            
        </Swiper>
    )
}
