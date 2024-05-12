import { response } from "express"
import { connection } from "../connection.js"

//ELIMINAR TAREA
export const deleteTask = (req, res) => {
    const taskId = req.params.id
    console.log(taskId)
    connection.query(`DELETE FROM tasks WHERE id = ${taskId}`, (err, reponse) => {
        if(err){
            console.log("Error al eliminar la tarea")
            return res.send({
                status: "Error",
                message: "Error al eliminar la tarea",
                error: err
            })
        }
        res.send({
            status: "Success",
            mesaage: "Tarea Eliminada correctamente",
            response: response
        })
    })
}