import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper';

export default function CarrouselHome() {
    return (
        <>
            <Swiper
                loop="true"
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper shadow-lg"
            >
                <SwiperSlide>
                    <img
                        className="image-1"
                        src="https://img.freepik.com/fotos-premium/computadora-portatil-escritorio-post-it-planta-renderizado-3d-vista-superior-superficie-blanca_626958-157.jpg?w=2000"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="image-1"
                        src="https://1.cms.s81c.com/sites/default/files/2020-03-27/004_1.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="container-image">
                    <img
                        className="image-1"
                        src="https://ofertaweb.net/imagenes/imgs-pase-inicio/imgs_2000x600_Q50/4.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
