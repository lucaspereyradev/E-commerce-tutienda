import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';

function CardDesing(props) {
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

    const { addItem } = useCart();

    return (
        <div className="card">
            <div className="w-full h-[16rem] ">
                <img className="w-full h-full object-cover" src={props.image} alt={props.name} />
            </div>

            <div className="p-5 flex-col gap-3">
                {/* product title */}
                <h2 className="product-title" title={props.name}>
                    {props.name}
                </h2>

                {/* product price */}
                <div>
                    <span className="text-lg">$ {props.price}</span>
                </div>

                {/* product action */}
                <div className="mt-5 flex gap-1.5">
                    <button
                        className="button-primary"
                        onClick={() => {
                            addItem(props.item);
                            showAlert();
                        }}
                    >
                        Añadir al carrito
                    </button>

                    <Link to={`/products/${props.id}`} className="button-icon opacity-50">
                        <i className="fa-solid fa-eye" title="Ver detalles"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CardDesing;
