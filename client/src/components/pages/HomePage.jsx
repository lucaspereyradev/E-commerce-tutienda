import React from 'react';
import QuestionAndAnswer from '../essential-components/QuestionAndAnswer';
import CarrouselHome from './home-components/CarrouselHome';
import CarrouselProductos from './home-components/CarrouselProducts';
import HerosHome from './home-components/HerosHome';

function HomePage() {
    return (
        <>
            <CarrouselHome />
            {/* <CarrouselProductos /> */}
            <HerosHome />
            {/* <QuestionAndAnswer /> */}
        </>
    );
}

export default HomePage;
