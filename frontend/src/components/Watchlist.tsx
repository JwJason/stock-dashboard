import React, { useState } from "react";
import { Paper, Title, TextInput, Button, Group, Alert } from "@mantine/core";
import { addStockToWatchlist } from "../services/watchlistService";
import { WatchlistItems } from "../types/types";

interface WatchlistProps {
  userId: number;
  onAddStock: (stock: string, updatedWatchlist: WatchlistItems) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ userId, onAddStock }) => {
  const [newStock, setNewStock] = useState<string>("");
  const [updatedWatchlist, setUpdatedWatchlist] = useState<
    WatchlistItems | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleAddStock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedWatchlist = await addStockToWatchlist(userId, newStock);
      setNewStock("");
      setUpdatedWatchlist(updatedWatchlist);
      onAddStock(newStock, updatedWatchlist);
    } catch (error) {
      console.error("Error adding stock:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    }
  };

  return (
    <Paper>
      {error && (
        <Alert title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}
      <Title order={2}>Update Watchlist</Title>
      <form onSubmit={handleAddStock}>
        <Group>
          <TextInput
            value={newStock}
            onChange={(e) => setNewStock(e.currentTarget.value)}
            placeholder="Add new stock symbol"
            style={{ flex: 1 }}
          />
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Watchlist;
