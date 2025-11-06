import express from "express";
import {GetIndex, GetDetails, GetNewSerie, PostNewSerie, Delete, Edit, PostEdit} from "../controllers/SeriesController.js";

const router = express.Router();

// Series routes
router.get("/", GetIndex);
router.get("/:serieId/detail", GetDetails);
router.get("/nuevo", GetNewSerie);
router.post("/nuevo", PostNewSerie);
router.post("/delete", Delete);
router.get("/edit/:serieId", Edit);
router.post("/edit", PostEdit);

export default router;