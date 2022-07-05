import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/Job.js";
import Data from "./models/Data.js";
import newDataPrices from "./Mockdata/data.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // await Job.deleteMany();
    // const jsonProducts = JSON.parse(
    //   await readFile(new URL("./mock-data.json", import.meta.url))
    // );
    // await Job.create(jsonProducts);
    await Data.deleteMany();
    await Data.create(newDataPrices);

    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
