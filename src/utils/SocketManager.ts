import { io } from "socket.io-client";

// initializing the socket connection
let socket = io("https://gfc-be-7a05iea80-ruhul-amins-projects-750c43e0.vercel.app/");

export default socket;
