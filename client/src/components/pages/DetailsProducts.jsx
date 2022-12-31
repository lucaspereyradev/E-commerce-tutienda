/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';
import axios from 'axios';
import QuestionAndAnswer from '../essential-components/QuestionAndAnswer';

function DetailsProducts() {
    const [product, setProduct] = useState([]);
    let params = useParams();
    let elemento = params.id;
    const { addItem } = useCart();

    useEffect(() => {
        async function productosDB() {
            const res = await axios.get(`http://localhost:5050/v0/product/${elemento}`);
            setProduct(res.data.data[0]);
        }
        productosDB();
    }, [elemento]);

    let image = {
        height: '100%',
    };
    let verticalLane = {
        borderRight: '1px solid rgba(20, 20, 20, 0.2)',
        margin: '0',
        padding: '0',
    };

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
    });
    function showAlert() {
        Toast.fire({
            icon: 'success',
            title: 'Producto añadido al carrito',
        });
    }

    return (
        <>
            <div className="w-[80vw] m-auto mt-12">
                <div className="flex justify-around">
                    <div className="h-96 p-2 border border-slate-200 shadow-lg flex justify-center items-center">
                        <img
                            className="object-cover w-full h-full"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                    <div style={verticalLane}></div>
                    <div>
                        <div className="flex flex-col gap-4">
                            <h1 className="font-bold text-3xl">{product.name}</h1>
                            <p className="text-lg">{product.description}</p>
                            <h4 className="text-lg mt-8">USD$ {product.price}</h4>
                        </div>
                        <div className="mt-8">
                            <button
                                className="button-primary"
                                onClick={() => {
                                    addItem(product);
                                    showAlert();
                                }}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-20 " />
            <QuestionAndAnswer />
        </>
    );
}

export default DetailsProducts;
