import { DataSource } from "typeorm";
import { DevDataSource } from "./datasources";

const connectDB = async (dataSource: DataSource) => {
  try {
    await dataSource.initialize();
    console.debug(`Database connected successfully`);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error connecting to database:", err.message);
    } else {
      console.error("Unknown error connecting to database");
    }
    process.exit(1);
  }
};

export const getDataSource = () => {
  // TODO: Replace DevDataSource with a method for instantiating based on the environment
  return DevDataSource;
};

export const initDB = async () => {
  await connectDB(getDataSource());
};
