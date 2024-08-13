import React, { useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useLoginViewModel from '../controllers/LoginViewModel';
import socketManagerInstance from '../controllers/SocketManager';
const Login = () => {
    const navigate = useNavigate();
    const { username, password, errorMessage, setUsername, setPassword, handleLogin } = useLoginViewModel();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/chat');
        }
    }, [navigate]);

    const handleChange = useCallback((setter) => (e) => setter(e.target.value), []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const success = await handleLogin();
        if (!success) {
            return;
        }
        socketManagerInstance.on('connect', () => {
                socketManagerInstance.login();
            });
            navigate('/chat');
    }, [handleLogin, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <img src="/logo512.png" alt="Logo" className="h-12 mb-4" />
                    <input
                        type="text"
                        value={username}
                        onChange={handleChange(setUsername)}
                        placeholder="Nombre de usuario o correo electrónico"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                        placeholder="Contraseña"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                    <button
                        type="submit"
                        className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500">o</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <div className="mt-4 text-center">
                    <span className="text-gray-500">¿No tienes una cuenta? </span>
                    <Link to="/register" className="text-blue-600 font-semibold">Regístrate</Link>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Login);