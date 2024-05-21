
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

    connection.query(LOGIN_QUERY, [username], async (err, response) => {

        const responseToSend = {
            name: response[0].name,
            last_name: response[0].last_name,
            username: response[0].name,
            email: response[0].email
        }


        if(err){
            console.log("Usuario no encontrado");
            return res.send({
                status: "Error",
                message: "Usuario no encontrado",
                error: err
            })
        }

        // Comparamos los hash de las contraseñas
        const passwordHashed = response[0].password
        const comparePass = await bcrypt.compare(password, passwordHashed)

        if(!comparePass){
            return res.send({
                status: "error",
                message: "Usuario o contraseña incorrectos",
            })
        }

        if(comparePass){
            const token = generateToken(username)
            res.send({
                status: "success",
                message: "Usuario encontrado",
                response: responseToSend,
                token: token
            })
            return 
        }
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