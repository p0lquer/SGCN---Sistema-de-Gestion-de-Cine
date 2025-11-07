import express from "express";
import {GetIndex, GetNewGenre, PostNewGenre, Delete, Edit, PostEdit} from "../controllers/GenresController.js";

const router = express.Router();

            // Genres routes
router.get("/", GetIndex);
router.get("/nuevo", GetNewGenre);
router.post("/nuevo", PostNewGenre);
router.post("/delete", Delete);
router.get("/edit/:genreId", Edit);
router.post("/edit", PostEdit);

export default router;