import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import process from "process"; // Needed if TypeScript version is above 6.0.3

// External Node.js dependencies
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

export const app = express();
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000; // This line needs the field "types" in tsconfig.json, probably because the TypeScript version is above 6.0.3

// bodyParser is needed to access the body of the request from a controller. It can parse several formats, but we only need these two.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure CORS
app.use(cors()); // needs npm i --save-dev @types/cors

app.get("/", (req: Request, res: Response) => {
  res.send("Express 5.2.1 + TypeScript 5.5.6 backend in Vercel is running");
});

app.listen(port, () => { // Mandatory to use in order to recieve requests. Without app.listen() it's like the backend is not running, even if the code is being executed.
  console.log("Express backend in Vercel is running");
});
