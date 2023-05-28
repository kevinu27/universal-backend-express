// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

// import { nanoid } from "nanoid"
// import { bodyLinkValidator } from "../middlewares/validatorManager.js"
import { Link } from "../models/Link.js"
import { Task } from "../models/Task.js"
import { Subtask } from "../models/Subtask.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"

export const getSubtasks = async (req, res) => {
    console.log('req.uid--------........--------', req.headers.authorization)
    let token = req.headers.authorization
    token = token.split(" ")[1]
    const {uid} = jwt.verify(token, process.env.JWT_SECRET)
    console.log('uid despues de toda la historia', uid)

    const taskIds  = req.headers.taskids.split(',')
    
    

    try{
       const subtasks = await Subtask.find({ tid: { $in: taskIds  } })

        return res.json({subtasks})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'error servidor'})
    }
}

export const getTask = async (req, res) => {

        try{
            const { id } = req.params
            const link = await Link.findById(id)

            if(!link) return res.status(404).json({error: "error no existe el link "})
            // para que un usuario no pueda ver ningun link de otro usuarios
            if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

            return res.json({link})
    

        } catch (error) {
            console.log(error)
            if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
                return res.status(403).json({error: 'formato id incorrecto'})
            }
            return res.status(500).json({error: 'error servidor'})
        }

}

export const createSubtask = async (req, res) => {
    try{
       

        const {subtaskDescription} = req.body
        const {tid} = req.body
        const subtaskStatus = 0
        console.log('-------------req.body-------------', req.body)

        const subtaskData = { subtaskDescription, subtaskStatus, tid}
        console.log('-----taskData-------', subtaskData)
        const subtask = new Subtask(subtaskData)

        const newSubtask = await subtask.save()

        return res.status(201).json({newSubtask})

    } catch (error) {
        console.log('--------ERROR---------', error)
        return res.status(500).json({error: 'error servidor'})
    }
}

export const removeSubtask = async (req, res) => {

    try{
        const { id } = req.params
        const subtask = await Subtask.findById(id)
        console.log('subtask----', subtask)
4
        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        await subtask.deleteOne()

        return res.json({subtask})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}


    export const updateSubtask = async (req, res) => {

        try{
            const { id } = req.params
            const { subtaskDescription} = req.body
            const { subtaskStatus} = req.body


            const subtask = await Subtask.findById(id)
    
            // if(!link) return res.status(404).json({error: "error no existe el link "})
            // // para que un usuario no pueda ver ningun link de otro usuarios
            // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})
            subtask.subtaskDescription = subtaskDescription
            subtask.subtaskStatus = subtaskStatus
    
            await subtask.save()
    
            return res.json({subtask})
    
    
        } catch (error) {
            console.log(error)
            if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
                return res.status(403).json({error: 'formato id incorrecto'})
            }
            return res.status(500).json({error: 'error servidor'})
        }
    
    }