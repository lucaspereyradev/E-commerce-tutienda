import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function RegisterPage() {
    const url = 'http://localhost:5050/v0/users/';
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var bodyFormData = {
                first_name: name,
                last_name: surname,
                email: email,
                password: password,
            };

            const resp = await axios.post(url, bodyFormData);

            setMessage(resp.data.message);

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (error) {
            setErrorMessage('Por favor revisa los datos ingresados.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 7000);
        }
    };

    const MySwal = withReactContent(Swal);
    function showAlertRegisted() {
        MySwal.fire({
            position: 'center',
            icon: 'success',
            title: `Bienvenido ${name}!`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    function showAlertError() {
        MySwal.fire({
            position: 'center',
            icon: 'error',
            title: `Hay algun error`,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    return (
        <div className="w-[50%] m-auto">
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-col mt-24 gap-3 shadow-lg py-16 px-12 rounded-lg">
                        <h3 className="text-center font-bold text-lg">Registrarse</h3>
                        {errorMessage && (
                            <h3 className="text-center py-2 rounded-lg text-white w-full bg-red-500">
                                {errorMessage}
                            </h3>
                        )}
                        {message && showAlertRegisted()}
                        <input
                            className="w-full rounded-lg"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg"
                            type="text"
                            placeholder="Apellido"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full rounded-lg"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="button-primary bg-indigo-600 hover:bg-indigo-600/80"
                            type="submit"
                        >
                            Crear cuenta
                        </button>

                        <h3 className="text-md">
                            ¿Ya tenes una cuenta? inicia sesión <Link to="/register">aquí</Link>
                        </h3>

                        <div className="w-full flex justify-center gap-6 mt-4">
                            <Link
                                href="/"
                                className="w-[3rem] h-[3rem] rounded-[50%] bg-slate-200 hover:bg-slate-300/80 flex items-center justify-center text-xl"
                            >
                                <i className="fa-brands fa-google"></i>
                            </Link>
                            <Link
                                href="/"
                                className="w-[3rem] h-[3rem] rounded-[50%] bg-slate-200 hover:bg-slate-300/80 flex items-center justify-center text-xl"
                            >
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link
                                href="/"
                                className="w-[3rem] h-[3rem] rounded-[50%] bg-slate-200 hover:bg-slate-300/80 flex items-center justify-center text-xl"
                            >
                                <i className="fa-brands fa-apple"></i>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
