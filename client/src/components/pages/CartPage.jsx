import React from 'react';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CartPage() {
    const {
        items,
        isEmpty,
        totalItems,
        totalUniqueItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    if (isEmpty)
        return (
            <div className="h-[60vh] flex justify-center items-center">
                <h1 className="text-[#A3A3A3] text-3xl"> EL CARRITO ESTA VACIO </h1>
            </div>
        );

    const MySwal = withReactContent(Swal);
    function showAlert() {
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada',
            showConfirmButton: false,
            timer: 1500,
        });
    }
    return (
        <>
            <div className="w-[90%] m-auto mt-20 lg:w-[70%]">
                <div className="container">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-md text-center text-gray-500 ">
                            <thead className="text-md text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="py-3 px-6"></th>
                                    <th scope="col" className="py-3 px-6">
                                        Producto
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Precio
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <button
                                            className="button-primary bg-red-400/90 hover:bg-red-400 whitespace-nowrap"
                                            onClick={emptyCart}
                                        >
                                            Limpiar carrito
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="lg:text-lg">
                                {items.map((elemento, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <tr className="bg-white border-b">
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    <img
                                                        className="min-h-40 max-h-44"
                                                        src={elemento.image}
                                                        alt={elemento.name}
                                                    />
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {elemento.name}
                                                </td>
                                                <td className="py-4 px-6">
                                                    USD$
                                                    <span className="text-neutral-800/90 font-bold">
                                                        {elemento.price}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <button
                                                        className="p-1 rounded-full hover:bg-neutral-900/10"
                                                        onClick={() =>
                                                            updateItemQuantity(
                                                                elemento.id,
                                                                elemento.quantity - 1
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <span className="mx-4">
                                                        {elemento.quantity}
                                                    </span>
                                                    <button
                                                        className="p-1 rounded-full hover:bg-neutral-900/10"
                                                        onClick={() =>
                                                            updateItemQuantity(
                                                                elemento.id,
                                                                elemento.quantity + 1
                                                            )
                                                        }
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="button-primary bg-red-600/80 hover:bg-red-600/90 px-7 lg:px-10 py-1"
                                                        onClick={() => removeItem(elemento.id)}
                                                    >
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <div className="m-6 text-center w-64">
                                <span className="text-2xl flex justify-center gap-3">
                                    USD$
                                    <span className="text-neutral-800/90 font-bold">
                                        {cartTotal}
                                    </span>
                                </span>
                                <hr />
                                <div className="mt-3">
                                    <button
                                        className="button-primary bg-indigo-500/90 hover:bg-indigo-500 px-7 lg:px-10"
                                        onClick={showAlert}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
