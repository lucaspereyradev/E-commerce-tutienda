import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function LoginPage() {
    const url = 'http://localhost:5050/v0/users/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInApp');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
        }
    }, []);

    const submitLoginUser = async (e) => {
        e.preventDefault();
        try {
            var bodyFormData = {
                email: email,
                password: password,
            };

            const resp = await axios.post(url, bodyFormData);

            setEmail('');
            setPassword('');

            window.localStorage.setItem('loggedInApp', JSON.stringify(resp.data));
            window.location.href = '/';
        } catch (error) {
            setErrorMessage('Credenciales incorrectas');
            setTimeout(() => {
                setErrorMessage(null);
            }, 7000);
        }
    };

    return (
        <div className="w-[50%] m-auto">
            <div className="flex justify-center items-center">
                <form onSubmit={submitLoginUser}>
                    <div className="flex flex-col mt-24 gap-3 shadow-lg py-16 px-12 rounded-lg">
                        <h3 className="text-center font-bold text-lg">Iniciar sesión</h3>
                        {errorMessage && (
                            <h3 className="text-center py-2 rounded-lg text-white w-full bg-red-500">
                                {errorMessage}
                            </h3>
                        )}
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

                        <div className="flex items-center gap-2.5">
                            <input
                                className="rounded-md"
                                type="checkbox"
                                name="recordar"
                                id="recordar"
                            />
                            <label htmlFor="recordar">Recordar</label>
                        </div>

                        <button
                            className="button-primary bg-indigo-600 hover:bg-indigo-600/80"
                            type="submit"
                        >
                            Ingresar
                        </button>

                        <h3 className="text-md">
                            ¿No tenes una cuenta? registrate <Link to="/register">aquí</Link>
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
