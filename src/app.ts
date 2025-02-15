/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from "express";
import router from "./app/routes";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";

const app: Application = express();


// getting data as json
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// use cors
app.use( cors({
  credentials: true,
  origin: ["http://localhost:3000", "https://tradehub.devjunayed.xyz"],
}));

app.use(cookieParser())

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send({
    message: "Hallo, Server is working",
  });
});




app.use(globalErrorHandler);
app.use(notFound);

export default app;
