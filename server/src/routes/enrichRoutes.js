import express from "express";
import { enrichCompany } from "../controllers/enrich.controller.js";

const router = express.Router();

router.post("/", enrichCompany);

export default router;
