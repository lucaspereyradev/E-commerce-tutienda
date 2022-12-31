import React from 'react';
import QuestionAndAnswer from '../essential-components/QuestionAndAnswer';
import FilterProductsAndSearch from '../products-components/FilterProductsAndSearch';

function ProductsPage() {
    return (
        <div className="mt-16">
            <FilterProductsAndSearch />
            <QuestionAndAnswer />
        </div>
    );
}

export default ProductsPage;
