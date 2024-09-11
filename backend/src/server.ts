import http from 'http';
import config from './config/config';

import app from './app';
import { initDB } from './config/db/db';
import {WebSocket} from "ws";
import {configureWebSocket} from "./config/websocket/websocket";
import {periodicTasks} from "./config/websocket/websocketTasks";

const startServers = async () => {
  await initDB();
  await Promise.all([
      startHttpServer(),
      startWebSocketServer()
  ]);
}

const startHttpServer = async () => {
  const server = http.createServer(app);
  server.listen(config.http.port, () => {
    console.log(`Server is running on port ${config.http.port}`);
  });
};

const startWebSocketServer = async () => {
  const wss = new WebSocket.Server({ port: config.websocket.port as number });
  configureWebSocket(wss, periodicTasks);
}

startServers();
