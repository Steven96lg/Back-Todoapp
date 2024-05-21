
import { connection } from "../connection.js"

import { UPDATE_STATUS_TASK_QUERY } from "./queries.js";

export const updateStatusTask = (req, res) => {

    const taskId = req.params.id;
   
    const statusTask = req.body.status

    connection.query(UPDATE_STATUS_TASK_QUERY, [statusTask, taskId] ,(err, resp) => {
        if(err){
            res.send({
                status: "Error",
                message: "Error al actualizar registro",
                error: err
            })
            return 
        }
        res.send({
            status: "Success",
            message: "Registro actualizado correctamente",
            response: resp
        })
    })
}