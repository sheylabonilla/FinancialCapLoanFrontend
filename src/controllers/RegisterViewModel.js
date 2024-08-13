import { useState } from 'react';
import { registerUser } from '../models/RegisterModel';

const useRegisterViewModel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (navigate) => {
        // Establecer valores de prueba (puedes eliminarlos en producción)
        setUsername("mdariel663");
        setEmail("mdariel@gmail.com");
        setPassword("pwd");

        if (!username || !password) {
            setErrorMessage('Por favor, completa todos los campos.');
            return;
        }

        try {
            const data = await registerUser(username, password);
            if (!data.token) {
                setErrorMessage('Error al registrar usuario. Vuelva a intentarlo');
                return;
            }
            localStorage.setItem('authToken', data.token);
            console.log(data);
        } catch (error) {
            if (!error.response) return;

            const errorMessages = {
                400: 'Este usuario o correo ya existe.',
                500: 'Error al crear la cuenta.',
            };
            setErrorMessage(errorMessages[error.response.status] || '');
        }
    };

    return {
        username,
        password,
        errorMessage,
        email,
        setUsername,
        setEmail,
        setPassword,
        setErrorMessage,
        handleRegister,
    };
};

export default useRegisterViewModel;