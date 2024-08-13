import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../models/AxiosModel';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        const { username, email, password } = formData;
        if (username && email && password) {
            try {
                const response = await axiosInstance.post('/users/register', formData);
                console.log(response.data);
                navigate('/login');
            } catch (error) {
                setErrorMessage(error.response?.status === 400 
                    ? 'Este usuario o correo ya existe.' 
                    : 'Error al crear la cuenta.');
            }
        } else {
            setErrorMessage('Por favor, completa todos los campos.');
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <img src="/logo512.png" alt="Logo" className="h-12" />
                </div>
                {['username', 'email', 'password'].map((field, index) => (
                    <input
                        key={index}
                        type={field === 'password' ? 'password' : field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === 'username' ? 'Nombre de usuario' : field === 'email' ? 'Correo electrónico' : 'Contraseña'}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ))}
                {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                <button
                    onClick={handleRegister}
                    className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Registrarse
                </button>
                <div className="flex items-center justify-between my-4 w-full">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500">o</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <div className="mt-4 text-center">
                    <span className="text-gray-500">¿Ya tienes una cuenta? </span>
                    <a href="/login" className="text-blue-600 font-semibold">Iniciar sesión</a>
                </div>
            </div>
        </div>
    );
};

export default Register;