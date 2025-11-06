import express from "express";
import {GetIndex} from "../controllers/SeriesController.js";

const router = express.Router();

// Series route
router.get("/", GetIndex);

export default router;