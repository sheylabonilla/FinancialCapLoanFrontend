export const verificarToken = (navigate) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        navigate('/');
    }
};