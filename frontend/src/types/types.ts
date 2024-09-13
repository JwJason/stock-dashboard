export interface Stock {
  symbol: string;
  price: number;
}

export interface User {
  id: number;
}

export interface WatchlistItems {
  watchlistItems: string[];
}

export interface Prices {
  prices: Stock[];
}
