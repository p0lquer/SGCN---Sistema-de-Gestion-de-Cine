import express from "express";
import {GetHome} from "../controllers/HomeController.js";


const router =   express.Router();


// Home route

router.get("/", GetHome)

export default  router;

