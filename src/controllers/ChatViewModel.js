import { useState, useEffect } from 'react';
import { fetchAllUsers, onMessageReceived, sendMessage } from '../models/ChatModel';
import { useNavigate } from 'react-router-dom'; // Agregar esta línea
import axiosInstance from '../models/AxiosModel';

const useChatViewModel = () => {
    const navigate = useNavigate(); // Definir navigate aquí
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            const users = await fetchAllUsers();
            console.log(users); // Verifica qué datos se están obteniendo
            setAllUsers(users);
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get('/users/getUserInfo');
                setCurrentUser(response.data.username); 
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                navigate('/');
            }
        };

        fetchUserInfo();
        loadUsers();
        onMessageReceived(handleMessageReceived);
    }, [navigate]);

    const handleMessageReceived = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setInput('');
    };

    const handleSendMessage = () => {
        if (input && selectedUser) {
            if (currentUser === selectedUser) {
                alert('No puedes enviar un mensaje a ti mismo');
                return;
            }

            if (selectedUser === null) {
                alert('Debes seleccionar un usuario');
                return;
            }
            if (input.trim() === '') {
                alert('El mensaje no puede estar vacío');
                return;
            }
            if(currentUser === null){
                alert('Debes iniciar sesión');
                navigate('/');
                return;
            }
            const messageData = { sender: currentUser, text: input, receptor: selectedUser };
            sendMessage(messageData);
            setMessages((prev) => [...prev, messageData]);
            setInput('');
        }
    };

    return {
        messages,
        input,
        allUsers,
        selectedUser,
        currentUser,
        setInput,
        handleUserSelect,
        handleSendMessage,
        setCurrentUser,
    };
};

export default useChatViewModel;