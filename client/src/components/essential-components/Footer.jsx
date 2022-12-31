import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="p-4 bg-slate-100/50 mt-20 rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to="/">
                    <img src="/logo-with-text-png-color.png" width={200} alt="logo" />
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">
                            Sobre nosotros
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Politica de privacidad
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">
                            Licencias
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">
                            Contacto
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2022{' '}
                <a href="https://www.linkedin.com/in/lucaspereyradev/" className="hover:underline">
                    lucaspereyradev&reg;
                </a>
            </span>
        </footer>
    );
}

export default Footer;
