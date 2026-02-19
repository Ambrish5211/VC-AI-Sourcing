import express from "express";
import cors from "cors";
import enrichRoutes from "./routes/enrichRoutes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes Import

app.use("/api/v1/enrich", enrichRoutes)



export { app };