import { useState, useEffect } from "react";
import { Stock } from "../types/types";

interface WebSocketData {
  prices: Stock[];
}

const useWebSocket = (url: string) => {
  const [data, setData] = useState<WebSocketData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event: MessageEvent) => {
      const parsedData: WebSocketData = JSON.parse(event.data);
      setData(parsedData);
      setError(undefined);
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      setError(
        "Failed to connect to real-time updates. Please try again later.",
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  return { realtimeData: data, error };
};

export default useWebSocket;
