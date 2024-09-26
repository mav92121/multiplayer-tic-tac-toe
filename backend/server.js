import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const allUsers = {};
io.on("connection", (socket) => {
  allUsers[socket.id] = {
    socket,
    online: true,
    isPlaying: false,
  };

  socket.on("join_room", (data) => {
    const currUser = allUsers[socket.id];
    currUser.name = data;

    let opponentPlayer = null;
    for (let id in allUsers) {
      const user = allUsers[id];
      if (
        user.online &&
        id !== currUser.id &&
        !user.isPlaying &&
        user.name &&
        currUser.name !== user.name
      ) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      currUser.socket.emit("opponent_found", opponentPlayer.name);
      opponentPlayer.socket.emit("opponent_found", currUser.name);
      console.log("opponentPlayer found -> ", opponentPlayer);
    } else {
      console.log("opponenet not found");
    }
  });

  socket.on("disconnect", () => {
    allUsers[socket.id].online = false;
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
