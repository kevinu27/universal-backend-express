// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

// import { nanoid } from "nanoid"
// import { bodyLinkValidator } from "../middlewares/validatorManager.js"
import { Link } from "../models/Link.js"
import { Task } from "../models/Task.js"
import jwt from 'jsonwebtoken'

export const getTasks = async (req, res) => {
    console.log('req.uid--------........--------', req.headers.authorization)
    let token = req.headers.authorization
    token = token.split(" ")[1]
    const {uid} = jwt.verify(token, process.env.JWT_SECRET)
    console.log('uid despues de toda la historia', uid)
    try{
       const tasks = await Task.find({uid: uid})

        return res.json({tasks})

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

export const createTask = async (req, res) => {
    try{
       
        const {taskName} = req.body
        const {deathline} = req.body
        const {priority} = req.body
        const {taskDescription} = req.body
        const {category} = req.body
        const taskStatus = 0
        const taskcompleted = false
        console.log('-------------req.body-------------', req.body)

        const taskData = {taskName, deathline, priority, taskDescription, taskStatus, category, taskcompleted, uid: req.uid}
        console.log('-----taskData-------', taskData)
        const task = new Task(taskData)

        const newTask = await task.save()

        return res.status(201).json({newTask})

    } catch (error) {
        console.log('--------ERROR---------', error)
        return res.status(500).json({error: 'error servidor'})
    }
}

export const removeTask = async (req, res) => {

    try{
        const { id } = req.params
        const task = await Task.findById(id)
        console.log('task----', task)
4
        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        await task.deleteOne()

        return res.json({task})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}


export const updateTask = async (req, res) => {

    try{
        const { id } = req.params
        const { taskName} = req.body
        const { deathline} = req.body
        const { priority} = req.body
        const { taskDescription} = req.body
        const { taskStatus} = req.body
        const { category} = req.body
        const { taskcompleted} = req.body

        console.log('req.params', req.params)

        console.log('id----', id)
        const task = await Task.findById(id)

        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})
        task.taskName = taskName
        task.deathline = deathline
        task.priority = priority
        task.taskDescription = taskDescription
        task.taskStatus = taskStatus
        task.category = category
        task.taskcompleted = taskcompleted
        await task.save()

        return res.json({task})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}