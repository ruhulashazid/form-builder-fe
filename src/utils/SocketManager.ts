import { io } from "socket.io-client";

// initializing the socket connection
let socket = io("https://form-builder-be.onrender.com");

export default socket;
