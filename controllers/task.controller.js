// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

// import { nanoid } from "nanoid"
// import { bodyLinkValidator } from "../middlewares/validatorManager.js"
import { Link } from "../models/Link.js"
import { Task } from "../models/Task.js"

export const getTasks = async (req, res) => {
    console.log('req.uid--------........--------', req.uid)
    try{
       const tasks = await Task.find({uid: req.uid})

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
        console.log('-------------req.body-------------', req.body)

        const taskData = {taskName, deathline, priority, taskDescription, uid: req.uid}
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
        const link = await Link.findById(id)
        console.log('link----', link)

        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        await link.deleteOne()

        return res.json({link})


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
        const { longLink} = req.body
        const link = await Link.findById(id)
        console.log('Link----', link)

        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        link.longLink = longLink
        await link.save()

        return res.json({link})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}