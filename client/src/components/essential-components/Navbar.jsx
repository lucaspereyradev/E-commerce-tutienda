import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Navbar() {
    const [user, setUser] = useState(null);

    const { totalItems } = useCart();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInApp');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user.user);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInApp');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <>
            <div className="py-1 w-full bg-slate-900/95 text-sm text-white flex justify-end items-center shadow-md">
                {user && (
                    <div className="flex gap-2 mr-8 items-center">
                        <h2 className="mr-8">{user.first_name}</h2>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )}
                {!user && (
                    <div className="flex gap-10 mr-8 items-center">
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/register">Registrarse</Link>
                    </div>
                )}
            </div>
            <nav className="sticky w-full px-4 py-4 lg:py-5 bg-indigo-600 text-white overflow-hidden shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <Link to="/">
                            <img src="/logo-with-text-png.png" width={200} alt="logo" />
                        </Link>
                    </div>
                    <div>
                        <ul className="hidden justify-end lg:flex lg:m-auto lg:items-center lg:space-x-6">
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                            <li className="text-indigo-100"> | </li>
                            <li>
                                <Link to="/products">Productos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden w-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                        <Link to="/cart" className="text-xl">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {totalItems > 0 && (
                                <div className="absolute top-[49%] translate-x-4 bg-white text-neutral-900 rounded-md w-5 h-5 flex justify-center items-center text-sm">
                                    {totalItems}
                                </div>
                            )}
                        </Link>
                    </div>
                    <div className="w-auto flex items-center lg:hidden gap-x-4">
                        <Link to="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        <button>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
