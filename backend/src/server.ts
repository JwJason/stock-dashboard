import http from 'http';
import config from './config/config';

import app from './app';
import { initDB } from './config/db/db';
import {WebSocket} from "ws";
import {configureWebSocket} from "./config/websocket/websocket";
import {periodicTasks} from "./config/websocket/websocketTasks";

const init = async () => {
  await initDB();
  await startServers();
}

const startServers = async () => {
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ noServer: true });
  configureWebSocket(wss, periodicTasks);

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
      wss.emit('connection', ws, request);
    });
  });

  server.listen(config.http.port, () => {
    console.log(`Server is running on port ${config.http.port}`);
  });
};

init();
