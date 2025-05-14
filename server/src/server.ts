import http from 'http';
import { Server } from 'socket.io';
import app from './index';
import dotenv from 'dotenv';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import documentService from './services/document.service';
import SocketEvent from './types/enums/socket-events-enum';

dotenv.config();

const server = http.createServer(app);
const ACCESS_SECRET: string = process.env.ACCESS_SECRET || '';

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
});

server.listen(process.env.PORT, () => {
  console.log("Server listening on port: ", process.env.PORT);
});

io.on("connection", (socket) => {
  const accessToken = socket.handshake.query.accessToken as string | undefined;
  const documentId = socket.handshake.query.documentId as string | undefined;

  if (!accessToken || !documentId) return socket.disconnect();
  else {
    jwt.verify(
      accessToken,
      ACCESS_SECRET,
      (err: VerifyErrors | null, decoded: unknown) => {
        const { id, email } = decoded as RequestUser;
        (socket as any).username = email;

        documentService
          .findDocumentById(parseInt(documentId), parseInt(id))
          .then(async (document) => {
            if (document === null) return socket.disconnect();

            socket.join(documentId);

            io.in(documentId)
              .fetchSockets()
              .then((clients) => {
                io.sockets.in(documentId).emit(
                  SocketEvent.CURRENT_USERS_UPDATE,
                  clients.map((client) => (client as any).username)
                );
              });

            socket.on(SocketEvent.SEND_CHANGES, (rawDraftContentState) => {
              // console.log("triggeting receive change");
              socket.to(documentId).emit(SocketEvent.RECEIVE_CHANGES, rawDraftContentState);
            });

            socket.on("disconnect", async () => {
              socket.leave(documentId);
              socket.disconnect();
              io.in(documentId)
                .fetchSockets()
                .then((clients) => {
                  io.sockets.in(documentId).emit(
                    SocketEvent.CURRENT_USERS_UPDATE,
                    clients.map((client) => (client as any).username)
                  );
                });
            });
          })
          .catch((error) => {
            console.log(error);
            return socket.disconnect();
          });
      }
    );
  }
});