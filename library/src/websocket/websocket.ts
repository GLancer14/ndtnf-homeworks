import { Server, Socket, type DefaultEventsMap } from "socket.io";
import http from "http";
import Books from "../booksApi/booksApi.model.js";

type SocketServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
type IOSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

function createSocketIO(server: SocketServer) {
  const io = new Server(server);
  io.on("connection", (socket: IOSocket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { roomname } = socket.handshake.query;
    console.log(`Socket room name: ${roomname}`);

    socket.join(roomname);
    socket.on("message-to-room", async (msg) => {
      try {
        await Books.findByIdAndUpdate(roomname, {
          $push: {
            comments: {
              username: msg.username,
              message: msg.message,
            },
          }
        });

        socket.to(roomname).emit("message-to-room", msg);
        socket.emit("message-to-room", msg);
      } catch(e) {
        console.log(e);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });

  return io;
}

export default createSocketIO;