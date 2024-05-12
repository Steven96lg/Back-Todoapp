
//OBTENEMOS LAS TAREAS  

import { connection } from  "../connection.js"

export const getTask = (req, res) => {
    
    const userId = req.params.id;
    console.log(userId)

    connection.query(`SELECT * FROM tasks WHERE created_by = ${userId}`, (err, resp) => {
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
            message: "Tares obtenidas",
            response: resp
        })

    })
}