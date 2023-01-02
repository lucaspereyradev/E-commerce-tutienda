import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AddProductsPage() {
    const url = 'https://api-ecommerce-tutienda.up.railway.app/v0/product';
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const [products, setProducts] = useState([]);

    const [userToken, setUserToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);

    const MySwal = withReactContent(Swal);
    function showDeleteAlert() {
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: 'Borrado correctamente',
            showConfirmButton: false,
            timer: 1500,
        });
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInApp');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUserToken(user.tokenAccess);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('description', description);
            formData.append('image', image[0]);
            formData.append('Category', category);
            const resp = await axios.post(url, formData, config);

            setMessage('Creado correctamente');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 7000);
        }
    };

    useEffect(() => {
        async function productosDB() {
            const res = await axios.get(
                'https://api-ecommerce-tutienda.up.railway.app/v0/product/'
            );
            setProducts(res.data.data);
        }
        productosDB();
    }, [products]);

    const deleteProduct = async (e) => {
        const id = e.target.parentNode.parentNode.id;
        try {
            const resp = await axios.delete(
                `https://api-ecommerce-tutienda.up.railway.app/v0/product/${id}`
            );
        } catch {
            console.log('elemento no borrado');
        }
    };

    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 max-md:px-8 m-auto gap-20 mt-12">
            <div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Nombre del producto"
                                </th>

                                <th scope="col" className="py-3 px-6">
                                    Precio
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    <span className="sr-only"></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={product.id}
                                        id={product.id}
                                    >
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {product.name}
                                        </th>

                                        <td className="py-4 px-6">$ {product.price}</td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={(e) => {
                                                    deleteProduct(e), showDeleteAlert();
                                                }}
                                                className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full">
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h3 className="text-center font-bold mb-4 text-lg">Publicar producto</h3>
                    {errorMessage && (
                        <h3 className="text-center py-2 rounded-lg text-white w-full bg-red-500 mb-2">
                            {errorMessage}
                        </h3>
                    )}
                    {message && (
                        <h3 className="text-center py-2 rounded-lg text-white w-full bg-green-500 mb-2">
                            {message}
                        </h3>
                    )}
                    <div className="w-[100%] m-auto flex flex-col gap-y-3">
                        <input
                            name="name"
                            className="w-full rounded-lg"
                            type="text"
                            value={name}
                            placeholder="Nombre del producto"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            name="price"
                            className="w-full rounded-lg"
                            type="number"
                            value={price}
                            placeholder="$ Precio"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <input
                            name="stock"
                            className="w-full rounded-lg"
                            type="number"
                            value={stock}
                            placeholder="Stock"
                            onChange={(e) => parseInt(setStock(e.target.value))}
                        />
                        <textarea
                            name="description"
                            className="w-full rounded-lg resize-none"
                            type="text"
                            value={description}
                            placeholder="Descripcion del producto"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            name="image"
                            className="w-full rounded-lg"
                            type="file"
                            title="Añadir imagen"
                            onChange={(e) => setImage(e.target.files)}
                        />

                        <select
                            className="w-full rounded-lg"
                            value={category}
                            label="category"
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Ninguna</option>
                            <option value="1">Celular</option>
                            <option value="2">Tablet</option>
                            <option value="3">Computadora</option>
                        </select>

                        <button
                            className="button-primary bg-indigo-600 hover:bg-indigo-600/80"
                            type="submit"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
