import { handlePriceUpdateInterval } from "../../handlers/websocketHandler";
import { PeriodicTask } from "./websocket";

export const periodicTasks: PeriodicTask[] = [
  {
    handler: handlePriceUpdateInterval,
    interval: 5000,
  },
];
