import React from 'react';
import PropTypes from 'prop-types';

const UserMessage = ({ messages, currentUser, selectedUser }) => {
    if (!Array.isArray(messages) || messages.length === 0) {
        return <div>No hay mensajes para mostrar.</div>;
    }

    return (
        <div>
            {messages.map((message, index) => {
                const isCurrentUser = message.sender === currentUser;
                const isFromSelectedUser = message.sender === selectedUser;

                return (
                    <div className="mb-2" key={index}>
                        {!isCurrentUser && !isFromSelectedUser && (
                            <div className="font-semibold">{message.sender}</div>
                        )}
                        <div className={`flex justify-${isCurrentUser ? 'end' : 'start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs break-words ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

UserMessage.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        sender: PropTypes.string.isRequired,
        text: PropTypes.string,
    })).isRequired,
    currentUser: PropTypes.string.isRequired,
    selectedUser: PropTypes.string,
};

export default UserMessage;