import React from "react";
import { Paper, Title, Table } from "@mantine/core";
import { Stock } from "../types/types";

interface StockPricesProps {
  prices: Stock[];
}

const StockPrices: React.FC<StockPricesProps> = ({ prices }) => {
  return (
    <Paper>
      <Title order={2}>Real-time Prices</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {prices.map((stock) => (
            <Table.Tr key={stock.symbol}>
              <Table.Td>{stock.symbol}</Table.Td>
              <Table.Td>${stock.price.toFixed(2)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default StockPrices;
