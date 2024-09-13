export interface IStockPrice {
  price: number;
  symbol: string;
}

/**
 * Service for interacting with stock price data.
 */
export class StockPriceService {
  // TODO - Using mocked data for now; should replace with actual API call
  public async getStockPrices(stockSymbols: string[]): Promise<IStockPrice[]> {
    return stockSymbols.map((stockSymbol) => {
      return {
        symbol: stockSymbol,
        price: Math.floor(Math.random() * 100),
      };
    });
  }
}

export const stockPriceService = new StockPriceService();
