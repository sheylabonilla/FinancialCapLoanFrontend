// src/viewmodels/LoginViewModel.js
import { useState } from 'react';
import { loginUser } from '../models/AuthenticationModel';
import socketManagerInstance from './SocketManager';
const useLoginViewModel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage('Por favor, completa todos los campos.');
            return false;
        }

        try {
            const data = await loginUser(username, password);
            if (!data.token) {
                setErrorMessage("Error Desconocido...Vuelva a intentar");
                return false;
            } else {
                localStorage.setItem('authToken', data.token);
                socketManagerInstance.login(data.token);
                return true;
            }
        } catch (error) {
            const message = error.response?.status === 401 
                ? 'Credenciales incorrectas. Intenta nuevamente.' 
                : 'Error en la conexión.';
            setErrorMessage(message);
            return false;
        }
    };

    return {
        username,
        password,
        errorMessage,
        setUsername,
        setPassword,
        handleLogin,
    };
};

export default useLoginViewModel;