
import express from "express";
export const router = express.Router();

import { getTask, authentication } from "./get.js";
import { registerUser, sesionStart,  createTask} from "./post.js";
import { deleteTask } from "./delete.js";
import { updateStatusTask } from "./put.js";

//Rutas GET
router.get("/get-task/:id", getTask);
router.get("/authentication", authentication)

//Rutas POST
router.post("/register", registerUser);
router.post("/login", sesionStart);
router.post("/create-task/:id", createTask);

//Rutas DELETE
router.delete("/delete-task/:id", deleteTask);

//Rutas UPDATE
router.put("/update-status-task/:id", updateStatusTask);