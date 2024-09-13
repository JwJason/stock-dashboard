import React, { useEffect, useState } from "react";
import { MantineProvider, Container, Title, Alert } from "@mantine/core";
import Watchlist from "./components/Watchlist";
import StockPrices from "./components/StockPrices";
import useWebSocket from "./hooks/useWebSocket";
import { Prices, User } from "./types/types";
import "@mantine/core/styles.css";
import { config } from "./config/config";
import * as watchlistService from "./services/watchlistService";

const App: React.FC = () => {
  // TODO - Hardcoded user ID. Replace with actual user authentication.
  const userId = 1;
  const [user] = useState<User>({ id: userId });
  const [priceData, setPriceData] = useState<Prices | undefined>(undefined);
  const { realtimeData, error } = useWebSocket(
    `${config.websocketBaseUri}/?userId=${userId}`,
  );

  const handleAddStock = (newStock: string) => {
    watchlistService.fetchPrices(userId).then((fetchedPriceData: Prices) => {
      setPriceData(fetchedPriceData);
    });
  };

  // Initial fetch of price data
  useEffect(() => {
    watchlistService.fetchPrices(userId).then((fetchedPriceData: Prices) => {
      setPriceData(fetchedPriceData);
    });
  }, [userId]);

  // Reset priceData when realtimeData updates
  useEffect(() => {
    if (realtimeData) {
      setPriceData(undefined);
    }
  }, [realtimeData]);

  return (
    <MantineProvider>
      <Container>
        <Title order={1} mb="md">
          Stock Watchlist App
        </Title>
        {error && (
          <Alert title="Error" color="red" mb="md">
            {error}
          </Alert>
        )}
        <Watchlist userId={user.id} onAddStock={handleAddStock} />
        <StockPrices prices={priceData?.prices || realtimeData?.prices || []} />
      </Container>
    </MantineProvider>
  );
};

export default App;
