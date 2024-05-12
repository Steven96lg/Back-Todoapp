
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config()

export const connection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: "Steven96",
    database: "Todoapp" 
})
 
connection.connect((err) => { 
    if(err){
        console.log("error de conexion: ", err)
        return 
    }
    console.log("Connecion establecida")
})