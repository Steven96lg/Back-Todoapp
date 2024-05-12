
import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import "./connection.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.listen(port,() => {
    console.log(`Puerto ${port} ready`);
});

app.use("/", router);
