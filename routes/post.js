
import { REGISTER_USER_QUERY, LOGIN_QUERY, CREATE_TASK_QUERY } from "./queries.js"

import { connection } from "../connection.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

// REGISTRO DE USUARIOS
export const registerUser = async (req, res) => {
    const { name, last_name, username, email, password } = req.body;
    const saltRounds = 10;

    try {
        // Genera el salt y hashea la contraseña
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        // Ahora realiza la consulta SQL
        connection.query(REGISTER_USER_QUERY, [name, last_name, username, email, passwordHash], (err, response) => {
            if (err) {
                console.log("Error al guardar el Usuario: " + err);
                return res.status(500).send({
                    status: "Error",
                    message: "Error al guardar el usuario",
                    error: err
                });
            }

            res.send({
                status: "success",
                message: "Usuario guardado correctamente",
                response: response
            });
        });
    } catch (err) {
        console.log("Error al hashear la contraseña: " + err);
        res.status(500).send({
            status: "Error",
            message: "Error al procesar la solicitud",
            error: err
        });
    }
};

//INICIO DE SESSION
// CREACION DE TOKEN
const generateToken = (user) => {
    return jwt.sign({user: user}, process.env.SECRETKEY, {expiresIn: "1h"})
}

export const sesionStart = (req, res) => {
    const {username, password} = req.body

    connection.query(LOGIN_QUERY, [username] ,(err, response) => {
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
            response: response[0],
            token: token
        })
    })
}

//CRACION DE TAREAS
export const createTask = (req, res) => {
    const created_by = req.params.id
    const {name, description, assigned_to, status} = req.body;

    connection.query(CREATE_TASK_QUERY, [name, description, created_by, assigned_to, status], (err, response) => {
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