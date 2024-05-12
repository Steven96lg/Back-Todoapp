
import { connection } from "../connection.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// REGISTRO DE USUARIOS
export const registerUser = (req, res) => {
    const {name, last_name, username, email, password} = req.body

    connection.query(`INSERT INTO users (name, last_name, username, email, password) VALUES ('${name}', '${last_name}', '${username}', '${email}', '${password}')`, (err, response) => {
        if(err){
            console.log("Error al guardar el Usuario" + err)
            return res.send({
                status: "Error",
                message: "Error al guardar el usuario"
            })
        }
        res.send({
            status: "success",
            message: "Usuario guardado correctamente",
            response: response
        })
    })
}

//INICIO DE SESSION
// CREACION DE TOKEN
const generateToken = (user) => {
    return jwt.sign({user: user}, process.env.SECRETKEY, {expiresIn: "1h"})
}

export const sesionStart = (req, res) => {
    const {username, password} = req.body

    connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, response) => {
        if(err){
            console.log("Usuario no encontrado");
            return res.send({
                status: "Error",
                message: "Usuario no encontrado",
                error: err
            })
        }

        if(response.length === 0){
            return res.send({
                status: "error",
                message: "Usuario o contraseña incorrectos",
                response: response,
            })
        }

        const token = generateToken(username)
        res.send({
            status: "success",
            message: "Usuario encontrado",
            response: response,
            token: token
        })
    })
}

//CRACION DE TAREAS
export const createTask = (req, res) => {
    const created_by = req.params.id
    const {name, description, assigned_to, status} = req.body;

    connection.query(`INSERT INTO tasks (name, description, created_by, assigned_to, status) VALUES ('${name}', '${description}', ${created_by}, '${assigned_to}', '${status}')`, (err, response) => {
        if(err){
            console.log(err)
            return res.send({
                status: "Error",
                message: "Error al guardar la tarea",
                error: err
            })
        }
        res.send({
            status: "success",
            message: "Tarea guardada correctamente",
            response: response
        })
    })
}