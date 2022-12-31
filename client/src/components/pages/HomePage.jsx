import React from 'react';
import QuestionAndAnswer from '../essential-components/QuestionAndAnswer';
import CarrouselHome from './home-components/CarrouselHome';
import CarrouselProductos from './home-components/CarrouselProducts';

function HomePage() {
    return (
        <>
            <CarrouselHome />
            <CarrouselProductos />
            <QuestionAndAnswer />
        </>
    );
}

export default HomePage;
