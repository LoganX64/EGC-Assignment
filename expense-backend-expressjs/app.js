import express from "express";
import morgan from "morgan";
import cors from "cors";
import transactionsRouter from "./src/routes/transactionsRoute.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/transactions", transactionsRouter);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.use(errorHandler);

export default app;
