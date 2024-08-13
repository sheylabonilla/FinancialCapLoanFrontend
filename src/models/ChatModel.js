// src/models/ChatModel.js
import axiosInstance from './AxiosModel';
import SocketManager from '../controllers/SocketManager';

export const initializeSocket = () => {
    SocketManager.connect('http://localhost:8000');
};


export const onUserList = (callback) => {
    SocketManager.on('user_list', callback);
};

export const onMessageReceived = (callback) => {
    SocketManager.on('mensaje_recibido', callback);
};

export const onMessageSent = (callback) => {
    SocketManager.on('mensaje_enviado', callback);
};

export const sendMessage = (messageData) => {
    SocketManager.emit('mensaje_privado', messageData);
};


export const fetchAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users/getUsers');
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        } 
        return [];
    } catch (error) {
        if (error.response && error.response.status === 401 && error.response.data.message === 'Token inválido o ha expirado') {
            alert('Problemas con el token, por favor inicia sesión nuevamente.'); // Mensaje de alerta
        }
        throw error; 
    }
};


export const getUserInfo = async () => {
    try {
        const { data } = await axiosInstance.post('/users/getUserInfo');
        return data.json();
    } catch (error) {
        throw error; 
    }
};

export const disconnectUser = () => {
    SocketManager.disconnect();
};