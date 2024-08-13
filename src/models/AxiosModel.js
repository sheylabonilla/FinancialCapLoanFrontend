// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Cambia esto a tu base URL
});

// Interceptor para agregar el token en cada solicitud
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token inválido o ha expirado') {
            localStorage.removeItem('authToken'); // Eliminar el token
            alert('Problemas con el token, por favor inicia sesión nuevamente.'); // Mensaje de alerta
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;