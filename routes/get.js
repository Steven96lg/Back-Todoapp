
import { GET_TASK_QUERY } from "./queries.js"

//OBTENEMOS LAS TAREAS  

import { connection } from  "../connection.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()
// OBTENCION DE LAS TAREAS
export const getTask = (req, res) => {
    
    const userId = req.params.id;
    console.log(userId)

    connection.query(GET_TASK_QUERY, [userId], (err, resp) => {
        if(err){
            console.log(err)
            return res.send({
                status: "Error",
                message: "Error al obtener las tareas",
                response: resp
            })
        }

        res.send({
            status: "Succes",
            message: "Tareas obtenidas",
            response: resp
        })

    })
}

//METODO DE AUTENTiCACION CON TOKEN
export const authentication = (req, res) => {

    const token = req.headers['authorization']
    console.log(token)
    if (token) {
    // Verificar el token
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        res.send({
            status: false,
            error: err
        });
      } else {
        res.send({
            status: true,
        });
      }
    });
    return 
  } 
    // Si no se proporciona ningún token, enviar false
  res.send(false);
}