import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatViewModel from '../controllers/ChatViewModel';
import UserMessage from '../components/UserMessages';
import { verificarToken } from '../controllers/TokenManager';
const Chat = () => {
    const navigate = useNavigate();

    useEffect(() => {
        verificarToken(navigate);
    }, [navigate]);


    const {
        messages,
        input,
        allUsers,
        selectedUser,
        currentUser,
        setInput,
        handleUserSelect,
        handleSendMessage,
    } = useChatViewModel();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Barra lateral de usuarios */}
            <div className="w-1/4 bg-white border-r border-gray-300 flex flex-col">
                <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold">Chats</h2>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cerrar sesión
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {Array.isArray(allUsers) && allUsers.length > 0 ? (
                        allUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                className={`flex items-center p-3 border-b border-gray-200 cursor-pointer ${
                                    selectedUser && user.id === selectedUser.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                                }`}
                            >
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-semibold">{user.username}</p>
                                    <p className="text-sm text-gray-500">Último mensaje...</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-4">No hay usuarios disponibles</p>
                    )}
                </div>
            </div>

            {/* Área de chat */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="bg-white p-4 border-b border-gray-300 flex items-center">
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                            <h1 className="text-xl font-bold">{selectedUser.username}</h1>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
                            <UserMessage messages={messages} currentUser={currentUser} selectedUser={selectedUser.username} />
                        </div>
                        <div className="bg-white p-4 flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                            >
                                Enviar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-100">
                        <p className="text-xl text-gray-500">Selecciona un chat para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;