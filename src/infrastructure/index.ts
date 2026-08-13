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
app.get("/author", (req: Request, res: Response) => {
  res.send("Petición GET a /author");
});
app.get("/author/:id", (req: Request, res: Response) => {
  res.send(`Petición GET a /author con id ${req.params.id}`);
});


app.listen(port, () => {
  // Mandatory to use in order to recieve requests. Without app.listen() it's like the backend is not running, even if the code is being executed.
  console.log("Express backend in Vercel is running");
});

export default app; // Necessary to export by default without a name, but also to be able to use this project in Vercel. If you don't export it by default, Vercel won't be able to find it and the Serverless function won't be created, throwing an error on logs.
