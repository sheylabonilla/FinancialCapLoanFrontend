// src/models/AuthenticationModel.js
import axiosInstance from './AxiosModel'

export const loginUser = async (username, password) => {
    try {
        const { data } = await axiosInstance.post('/users/login', { username, password });
        return data;
    } catch (error) {   throw error;  }
};
