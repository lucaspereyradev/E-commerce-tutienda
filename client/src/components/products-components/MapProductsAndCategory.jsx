import React, { useEffect } from 'react';

import axios from 'axios';
import { useState } from 'react';
import CardDesing from './CardDesing';

function MapProductsAndCategory(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function productosDB() {
            const res = await axios.get('http://localhost:5050/v0/product/');
            setProducts(res.data.data);
        }
        productosDB();
    }, []);

    return (
        <>
            {products.map((product, key) => {
                if (props.category != '0') {
                    if (product.Category == props.category) {
                        return (
                            <CardDesing
                                id={product.id}
                                key={key}
                                item={product}
                                image={product.image}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                            />
                        );
                    }
                } else {
                    return (
                        <CardDesing
                            id={product.id}
                            item={product}
                            key={key}
                            image={product.image}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    );
                }
            })}
        </>
    );
}

export default MapProductsAndCategory;
