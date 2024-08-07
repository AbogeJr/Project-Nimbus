import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { setupWebSocketServer } from './server/websocket';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '/', true);
    console.log(`[${new Date().toISOString()}] ${req.method} ${parsedUrl.pathname}`);
    handle(req, res, parsedUrl);
  });

  setupWebSocketServer(server);

  server.listen(3000, () => {
    console.log(`[${new Date().toISOString()}] Server is ready on http://localhost:3000`);
    console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV}`);
  });

  server.on('error', (error) => {
    console.error(`[${new Date().toISOString()}] Server error:`, error);
  });
});

process.on('uncaughtException', (error) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});