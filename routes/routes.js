
import express from "express";
export const router = express.Router();

import { getTask } from "./get.js";
import { registerUser, sesionStart,  createTask} from "./post.js";
import { deleteTask } from "./delete.js";

//Rutas GET
router.get("/get-task/:id", getTask);

//Rutas POST
router.post("/register", registerUser);
router.post("/login", sesionStart);
router.post("/create-task/:id", createTask);

//Rutas DELETE
router.delete("/delete-task/:id", deleteTask);

//Rutas UPDATE