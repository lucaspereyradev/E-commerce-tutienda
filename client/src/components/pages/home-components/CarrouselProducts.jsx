import axios from 'axios';
import { useEffect, useState } from 'react';

import CardDesing from '../../products-components/CardDesing';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

export default function CarrouselProductos() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function productosDB() {
            const res = await axios.get('http://localhost:5050/v0/product/');
            setProducts(res.data.data);
        }
        productosDB();
    }, []);

    return (
        <div className="container my-16 mx-auto">
            <h1 className="text-center text-3xl mb-8 underline decoration-solid decoration-indigo-600">
                Productos
            </h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={0}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode]}
                className="mySwiper w-[65%] h-[27rem] "
            >
                {products.map((product, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <CardDesing
                                id={product.id}
                                item={product}
                                image={product.image}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
