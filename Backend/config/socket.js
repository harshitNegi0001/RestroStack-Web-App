import { Server } from 'socket.io';

let io;
const resEmpMap = new Map();


export const configSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["https://restro-stack.vercel.app", "http://localhost:5173"],
            credentials: true
        }
    });

    io.on('connection', async (socket) => {
        const { userId, resId } = socket.handshake.auth;

        if (!userId || !resId ) {
            socket.disconnect();
            return;
        }
        if (!resEmpMap.has(resId)) {
            resEmpMap.set(resId, new Set());
        }
        resEmpMap.get(resId).add(socket.id);


        socket.on('table-status-change', ({ tableId, newStatus }) => {
            // const receiverSockets = userSocketMap.get(receiverId);

            // if (!receiverSockets) return;

            // receiverSockets.forEach((socketId) => {
            //     io.to(socketId).emit('typing', { userId });
            // });

        });
    })
    return io;
}



export { io, resEmpMap }