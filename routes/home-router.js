import express from "express";
import {GetHome, GetDetails} from "../controllers/HomeController.js";


const router =   express.Router();


// Home route

router.get("/", GetHome)
router.get("/home", GetHome)
router.get("/details/:serieId", GetDetails)

export default  router;

