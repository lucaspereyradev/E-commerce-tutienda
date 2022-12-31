import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddProductsPage() {
    const url = 'http://localhost:5050/v0/product';
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const [products, setProducts] = useState([]);

    const [userToken, setUserToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
            console.log(resp.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 7000);
        }
    };
    console.log(errorMessage);

    useEffect(() => {
        async function productosDB() {
            const res = await axios.get('http://localhost:5050/v0/product/');
            setProducts(res.data.data);
        }
        productosDB();
    }, []);

    return (
        <div className="container grid grid-cols-2 m-auto gap-20 mt-12">
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
                                    <span className="sr-only">Editar</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        key={product.id}
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
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                href="#"
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
                        <h3 className="text-center py-2 rounded-lg text-white w-full bg-red-500">
                            {errorMessage}
                        </h3>
                    )}
                    <div className="w-[50%] m-auto flex flex-col gap-y-3">
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
