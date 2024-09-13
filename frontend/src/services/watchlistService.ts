import { config } from "../config/config";
import { Prices, WatchlistItems } from "../types/types";

export const fetchPrices = async (userId: number): Promise<Prices> => {
  try {
    const response = await fetch(`${config.apiBaseUri}/users/${userId}/prices`);
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};

export const addStockToWatchlist = async (
  userId: number,
  stockSymbol: string,
): Promise<WatchlistItems> => {
  try {
    const response = await fetch(
      `${config.apiBaseUri}/users/${userId}/watchlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockSymbol }),
      },
    );
    if (!response.ok) {
      const errorResponseData = await response.json();
      throw new Error(
        `Failed to add stock to watchlist: ${errorResponseData.error.message}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding stock to watchlist:", error);
    throw error;
  }
};
