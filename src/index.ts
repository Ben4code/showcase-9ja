import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { registerHandlers } from './socket/handlers.js';
import { initDb, purgeExpiredEntries } from './db.js';

const PORT = Number(process.env.PORT ?? 3001);
const PURGE_INTERVAL_MS = 24 * 60 * 60 * 1000;
const app = createApp();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log(`[ws] connected: ${socket.id}`);
  registerHandlers(io, socket);
  socket.on('disconnect', () => console.log(`[ws] disconnected: ${socket.id}`));
});

initDb()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🟢 Showcase Nigeria server running on http://localhost:${PORT}`);
    });
    purgeExpiredEntries();
    setInterval(purgeExpiredEntries, PURGE_INTERVAL_MS);
  })
  .catch(err => {
    console.error('❌ Failed to initialise database:', err);
    process.exit(1);
  });
