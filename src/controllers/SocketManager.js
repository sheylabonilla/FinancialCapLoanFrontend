import { io } from 'socket.io-client';

class SocketManager {
    constructor() {
        this.socket = null;
        this.listeners = {};
        this.url = "http://localhost:8000"
        this.auth = { token: String(localStorage.getItem("authToken"))};

        this.connect(this.url)
    }

    connect(url) {
        this.socket = io(url);
        this.socket.on('connect', () => {
            console.log('Conectado al servidor de sockets');
        });
        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor de sockets');
        });
    }
    login() {
        if (this.socket) {
            this.auth = { token: String(localStorage.getItem("authToken"))};
            this.socket = io(this.url, this.auth)
            this.socket.emit('login', this.auth);
            console.log("x", this.socket.auth)

        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
            this.listeners[event] = callback;
        }
    }

    off(event) {
        if (this.socket && this.listeners[event]) {
            this.socket.off(event, this.listeners[event]);
            delete this.listeners[event];
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const socketManagerInstance = new SocketManager();
export default socketManagerInstance;